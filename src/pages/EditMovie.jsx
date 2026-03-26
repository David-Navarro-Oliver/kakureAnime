import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById, updateMovie } from "../services/moviesApi";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    year: "",
    duration: "",
    genre: "Fantasia",
    studio: "",
    rating: "8.0",
    poster: "",
    synopsis: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const movie = await getMovieById(id);

        if (!isMounted) return;

        if (!movie || typeof movie !== "object") {
          setErrorMsg("No se encontro la pelicula solicitada.");
          return;
        }

        setForm({
          title: movie.title ?? "",
          year: movie.year ?? "",
          duration: movie.duration ?? "",
          genre: movie.genre ?? "Fantasia",
          studio: movie.studio ?? "",
          rating: movie.rating ?? "8.0",
          poster: movie.poster ?? "",
          synopsis: movie.synopsis ?? "",
        });
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        setErrorMsg("No se pudo cargar la pelicula desde el backend.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    if (!form.title.trim()) return setErrorMsg("El titulo es obligatorio.");
    if (!form.poster.trim()) return setErrorMsg("El poster (URL) es obligatorio.");
    if (!form.year) return setErrorMsg("El anio es obligatorio.");
    if (Number(form.year) <= 0) return setErrorMsg("El anio debe ser mayor que 0.");
    if (Number(form.rating) < 0 || Number(form.rating) > 10) {
      return setErrorMsg("El rating debe estar entre 0 y 10.");
    }

    const payload = {
      title: form.title.trim(),
      year: Number(form.year),
      duration: Number(form.duration || 0),
      genre: form.genre.trim(),
      studio: form.studio.trim(),
      rating: Number(form.rating || 0),
      poster: form.poster.trim(),
      synopsis: form.synopsis.trim(),
    };

    try {
      setSaving(true);
      await updateMovie(id, payload);
      navigate("/movies");
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo guardar la pelicula en el backend.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-zinc-400">Cargando...</p>;

  return (
    <section className="max-w-3xl">
      <h2 className="mb-6 text-2xl font-semibold">Editar pelicula</h2>

      {errorMsg && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Titulo" name="title" value={form.title} onChange={handleChange} />
          <Field label="Estudio" name="studio" value={form.studio} onChange={handleChange} />
          <Field
            label="Anio"
            name="year"
            type="number"
            min="1"
            value={form.year}
            onChange={handleChange}
          />
          <Field
            label="Duracion (min)"
            name="duration"
            type="number"
            min="0"
            value={form.duration}
            onChange={handleChange}
          />

          <div className="space-y-1">
            <label className="text-sm text-zinc-300">Genero</label>
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 outline-none focus:border-fuchsia-500/40"
            >
              <option>Accion</option>
              <option>Aventura</option>
              <option>Comedia</option>
              <option>Drama</option>
              <option>Fantasia</option>
              <option>Romance</option>
              <option>Thriller</option>
              <option>Terror</option>
              <option>Ciencia ficcion</option>
            </select>
          </div>

          <Field
            label="Rating (0-10)"
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={form.rating}
            onChange={handleChange}
          />
        </div>

        <Field
          label="Poster (URL)"
          name="poster"
          value={form.poster}
          onChange={handleChange}
          placeholder="https://..."
        />

        <div className="space-y-1">
          <label className="text-sm text-zinc-300">Sinopsis</label>
          <textarea
            name="synopsis"
            value={form.synopsis}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 outline-none focus:border-fuchsia-500/40"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-fuchsia-500 px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/movies")}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  step,
  min,
  max,
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-zinc-300">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 outline-none focus:border-fuchsia-500/40"
      />
    </div>
  );
}
