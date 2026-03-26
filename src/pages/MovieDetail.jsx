import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMovie, getAllMovies, getMovieById } from "../services/moviesApi";
import MovieCard from "../components/MovieCard";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMovie = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await getMovieById(id);

        if (!isMounted) return;

        if (!data || typeof data !== "object") {
          setMovie(null);
          return;
        }

        setMovie(data);
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        setErrorMessage("No se pudo cargar la película desde el backend.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMovie();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!movie?.genre) {
      setAllMovies([]);
      return;
    }

    let isMounted = true;

    const loadRelatedMovies = async () => {
      try {
        const movies = await getAllMovies();
        if (isMounted) {
          setAllMovies(Array.isArray(movies) ? movies : []);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setAllMovies([]);
        }
      }
    };

    loadRelatedMovies();

    return () => {
      isMounted = false;
    };
  }, [id, movie?.genre]);

  const relatedMovies = useMemo(() => {
    if (!movie) return [];

    return allMovies
      .filter((candidate) => candidate.id !== movie.id && candidate.genre === movie.genre)
      .slice(0, 6);
  }, [allMovies, movie]);

  const handleDelete = async () => {
    const isConfirmed = confirm("¿Seguro que quieres borrar esta película?");
    if (!isConfirmed) return;

    try {
      await deleteMovie(id);
      navigate("/movies");
    } catch (err) {
      console.error(err);
      alert("No se pudo borrar la película en el backend.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-lime-500 border-r-transparent" />
          <p className="mt-4 text-slate-300">Cargando película...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
        <p className="mb-2 font-semibold">Error</p>
        <p>{errorMessage}</p>
        <Link
          to="/movies"
          className="mt-4 inline-block text-sm text-red-300 underline hover:text-red-200"
        >
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-200">
        <p>Película no encontrada</p>
        <Link
          to="/movies"
          className="mt-4 inline-block text-sm text-amber-300 underline hover:text-amber-200"
        >
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-lime-500/15 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-lime-500/5 blur-3xl" />
        <div className="relative grid items-start gap-8 lg:grid-cols-[300px_1fr]">
          <div className="rounded-2xl overflow-hidden border border-cyan-200/20 bg-slate-900/40 p-3">
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-auto w-full rounded-xl object-cover shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/300x450/1e293b/94a3b8?text=Sin+Poster";
                }}
              />
            ) : (
              <div className="flex h-96 items-center justify-center rounded-xl bg-slate-800/50">
                <p className="text-slate-400">Sin poster</p>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-lime-400 sm:text-6xl lg:text-7xl">
              {movie.title}
            </h1>

            {movie.quote && (
              <blockquote className="border-l-4 border-amber-500 bg-amber-500/10 py-3 pl-6 text-lg italic text-amber-200/90">
                "{movie.quote}"
              </blockquote>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to={`/edit-movie/${movie.id}`}
                className="inline-flex items-center justify-center rounded-xl border border-lime-500/20 bg-lime-500/10 px-5 py-2.5 text-sm font-semibold text-lime-500 transition-colors hover:bg-lime-500/15"
              >
                Editar
              </Link>

              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center rounded-xl border border-pink-500/20 bg-pink-500/10 px-5 py-2.5 text-sm font-semibold text-pink-400 transition-colors hover:bg-pink-500/15"
              >
                Eliminar
              </button>

              <Link
                to="/movies"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200/10 bg-slate-900/20 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-900/30"
              >
                ← Catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-orange-500/15 bg-gradient-to-br from-orange-500/5 to-slate-800/30 p-8">
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-orange-400">
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-transparent" />
          Sinopsis
        </h2>
        <p className="text-lg leading-relaxed text-slate-200/80">
          {movie.synopsis || "No hay sinopsis disponible."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-amber-500/15 bg-slate-800/40 p-6">
          <h3 className="mb-4 text-xl font-bold text-amber-400">Detalles</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Año" value={movie.year || "N/A"} />
            <StatCard label="Duración" value={`${movie.duration || 0} min`} />
            <StatCard label="Estudio" value={movie.studio || "N/A"} />
            <StatCard label="Género" value={movie.genre || "N/A"} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-lime-500/15 bg-gradient-to-br from-lime-500/10 to-slate-800/40 p-6">
          <p className="mb-2 text-sm text-slate-300/70">RATING</p>
          <div className="text-7xl font-bold text-lime-400">{movie.rating || "—"}</div>
          <p className="mt-2 text-slate-300/60">
            {movie.rating ? "/ 10" : "Sin calificación"}
          </p>
        </div>
      </div>

      {movie.gallery?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-lime-400">Galería</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {movie.gallery.map((imgUrl, index) => (
              <div
                key={index}
                className="aspect-video overflow-hidden rounded-2xl border border-cyan-200/15 bg-slate-900/20"
              >
                <img
                  src={imgUrl}
                  alt={`${movie.title} - Imagen ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x250/1e293b/94a3b8?text=Imagen";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedMovies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-amber-400">Películas relacionadas</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {relatedMovies.map((relatedMovie) => (
              <MovieCard key={relatedMovie.id} movie={relatedMovie} showControls={false} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-cyan-200/15 bg-slate-900/40 p-4">
      <p className="mb-1 text-xs uppercase tracking-wide text-slate-300/70">{label}</p>
      <p className="text-base font-bold text-cyan-200">{value}</p>
    </div>
  );
}
