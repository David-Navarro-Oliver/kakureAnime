import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { deleteMovie, getAllMovies } from "../services/moviesApi";

const LS_KEY = "kakure_movies_filters_v1";

export default function Movies() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "null");
    } catch {
      return null;
    }
  })();

  const initialGenre = searchParams.get("genre") || saved?.genre || "ALL";
  const initialQuery =
    searchParams.get("query") || searchParams.get("studio") || saved?.query || "";

  const [genre, setGenre] = useState(initialGenre);
  const [year, setYear] = useState(saved?.year ?? "ALL");
  const [query, setQuery] = useState(initialQuery);

  const loadMovies = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await getAllMovies();
      setMovies(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudieron cargar las peliculas desde el backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ genre, year, query }));
  }, [genre, year, query]);

  const handleDelete = async (id) => {
    const ok = confirm("Seguro que quieres borrar esta pelicula?");
    if (!ok) return;

    try {
      await deleteMovie(id);
      await loadMovies();
    } catch (err) {
      console.error(err);
      alert("No se pudo borrar la pelicula en el backend.");
    }
  };

  const genres = useMemo(() => {
    const values = new Set(movies.map((movie) => movie.genre).filter(Boolean));
    return ["ALL", ...Array.from(values).sort()];
  }, [movies]);

  const years = useMemo(() => {
    const values = new Set(
      movies.map((movie) => movie.year).filter((value) => value !== undefined && value !== null),
    );
    return ["ALL", ...Array.from(values).sort((a, b) => b - a)];
  }, [movies]);

  const filtered = useMemo(() => {
    return movies
      .filter((movie) => (genre === "ALL" ? true : movie.genre === genre))
      .filter((movie) => (year === "ALL" ? true : String(movie.year) === String(year)))
      .filter((movie) => {
        if (!query.trim()) return true;

        const normalizedQuery = query.toLowerCase();

        return (
          (movie.title || "").toLowerCase().includes(normalizedQuery) ||
          (movie.studio || "").toLowerCase().includes(normalizedQuery) ||
          (movie.synopsis || "").toLowerCase().includes(normalizedQuery)
        );
      });
  }, [movies, genre, year, query]);

  const resetFilters = () => {
    setGenre("ALL");
    setYear("ALL");
    setQuery("");
  };

  if (loading) return <p className="text-zinc-400">Cargando peliculas...</p>;

  if (errorMsg) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
        {errorMsg}
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6 rounded-2xl border border-lime-400/15 bg-blue-400 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-1 text-5xl font-bold text-lime-300">Peliculas</h2>
            <p className="text-sm text-slate-200/80">
              Filtra por genero/anio o busca por titulo, estudio o sinopsis.
            </p>

            <p className="mt-2 text-xs text-slate-300/60">
              Mostrando{" "}
              <span className="font-semibold text-amber-50">{filtered.length}</span> de{" "}
              <span className="font-semibold text-amber-50">{movies.length}</span> peliculas
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-4 md:w-auto">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs text-slate-300/90">Buscar</label>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ej: Kimetsu, Ghibli..."
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400/60 focus:border-amber-400/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300/90">Genero</label>
              <select
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-400/40"
              >
                {genres.map((value) => (
                  <option key={value} value={value}>
                    {value === "ALL" ? "Todos" : value}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300/90">Anio</label>
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="w-full rounded-xl border border-amber-200/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-400/40"
              >
                {years.map((value) => (
                  <option key={String(value)} value={value}>
                    {value === "ALL" ? "Todos" : value}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="sm:col-span-4 rounded-xl border-2 border-lime-400 px-4 py-2 text-sm font-semibold text-amber-50 hover:bg-lime-400/30"
            >
              Reset filtros
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-zinc-300">
          No hay resultados con los filtros actuales.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
          {filtered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} showControls />
          ))}
        </div>
      )}
    </section>
  );
}
