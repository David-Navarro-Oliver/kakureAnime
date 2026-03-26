import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const dbPath = path.join(projectRoot, 'db.json');
const backendBaseUrl = process.env.MOVIES_API_BASE_URL ?? 'http://localhost:8080';
const moviesUrl = `${backendBaseUrl.replace(/\/$/, '')}/movies`;
const allowedFields = [
  'title',
  'year',
  'duration',
  'genre',
  'studio',
  'rating',
  'poster',
  'synopsis',
];

function getErrorDetails(error) {
  const status = error.response?.status;
  const data = error.response?.data;

  if (status || data) {
    return JSON.stringify(
      {
        status: status ?? null,
        data: data ?? null,
      },
      null,
      2,
    );
  }

  return error.message;
}

function countMovies(payload) {
  if (Array.isArray(payload)) {
    return payload.length;
  }

  if (Array.isArray(payload?.content)) {
    return payload.content.length;
  }

  if (typeof payload?.totalElements === 'number') {
    return payload.totalElements;
  }

  if (typeof payload?.count === 'number') {
    return payload.count;
  }

  return null;
}

async function loadMoviesFromDb() {
  const rawDb = await fs.readFile(dbPath, 'utf8');
  const parsedDb = JSON.parse(rawDb);

  if (!Array.isArray(parsedDb.movies)) {
    throw new Error('La coleccion "movies" no existe o no es un array en db.json.');
  }

  return parsedDb.movies;
}

async function fetchCurrentMovies() {
  const response = await axios.get(moviesUrl, {
    timeout: 10000,
    validateStatus: () => true,
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `GET ${moviesUrl} devolvio ${response.status}: ${JSON.stringify(response.data)}`,
    );
  }

  return response.data;
}

function buildPayload(movie) {
  return Object.fromEntries(allowedFields.map((field) => [field, movie[field]]));
}

async function migrateMovies() {
  const movies = await loadMoviesFromDb();
  const beforePayload = await fetchCurrentMovies();
  const beforeCount = countMovies(beforePayload);

  console.log(`Backend disponible en ${moviesUrl}`);
  console.log(`Peliculas detectadas en db.json: ${movies.length}`);
  console.log(
    `Peliculas accesibles antes de migrar: ${beforeCount ?? 'no se pudo calcular con precision'}`,
  );

  let inserted = 0;
  const failures = [];

  for (const movie of movies) {
    const payload = buildPayload(movie);

    try {
      const response = await axios.post(moviesUrl, payload, {
        timeout: 10000,
        validateStatus: () => true,
      });

      if (response.status >= 200 && response.status < 300) {
        inserted += 1;
        console.log(`[OK] ${movie.title}`);
        continue;
      }

      const failure = {
        legacyId: movie.id,
        title: movie.title,
        error: `POST ${moviesUrl} devolvio ${response.status}`,
        response: response.data ?? null,
      };

      failures.push(failure);
      console.error(`[FAIL] ${movie.title} (${movie.id}) -> ${failure.error}`);
    } catch (error) {
      failures.push({
        legacyId: movie.id,
        title: movie.title,
        error: getErrorDetails(error),
      });
      console.error(`[FAIL] ${movie.title} (${movie.id}) -> ${error.message}`);
    }
  }

  const afterPayload = await fetchCurrentMovies();
  const afterCount = countMovies(afterPayload);

  console.log('');
  console.log('Resumen de migracion');
  console.log(`- Total en db.json: ${movies.length}`);
  console.log(`- Insertadas correctamente: ${inserted}`);
  console.log(`- Fallidas: ${failures.length}`);
  console.log(
    `- Total accesible via GET /movies despues de migrar: ${afterCount ?? 'no se pudo calcular con precision'}`,
  );

  if (failures.length > 0) {
    console.log('');
    console.log('Peliculas fallidas');
    for (const failure of failures) {
      console.log(
        `- ${failure.title} (${failure.legacyId}) -> ${typeof failure.error === 'string' ? failure.error : JSON.stringify(failure.error)}`,
      );
    }
    process.exitCode = 1;
  }
}

migrateMovies().catch((error) => {
  console.error('La migracion no pudo completarse.');
  console.error(error.message);
  process.exitCode = 1;
});
