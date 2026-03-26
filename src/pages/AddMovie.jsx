import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../services/moviesApi";

export default function AddMovie() {
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

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    if (!form.title.trim()) return setErrorMsg("El titulo es obligatorio.");
    if (!form.poster.trim()) return setErrorMsg("El poster (URL) es obligatorio.");
    if (!form.year) return setErrorMsg("El año es obligatorio.");
    if (Number(form.year) <= 0) return setErrorMsg("El año debe ser mayor que 0.");
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
      await createMovie(payload);
      navigate("/movies");
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo guardar la pelicula en el backend.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-3xl">
      {errorMsg && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-white/10 bg-blue-400 p-6"
      >
        <h2 className="mb-4 text-3xl font-bold text-lime-300">Agregar pelicula</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Titulo" name="title" value={form.title} onChange={handleChange} />
          <Field label="Estudio" name="studio" value={form.studio} onChange={handleChange} />
          <Field
            label="Año"
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
              className="w-full rounded-xl bg-blue-500 px-3 py-2 outline-none focus:border-fuchsia-500/40"
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
            className="w-full rounded-xl border border-white/10 bg-blue-500 px-3 py-2 outline-none focus:border-lime-300"
            placeholder="Escribe una sinopsis breve..."
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-lime-300 px-4 py-2 text-sm font-semibold text-black hover:bg-lime-400 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/movies")}
            className="rounded-xl border-2 border-lime-400 px-4 py-2 text-sm font-semibold hover:bg-white/5"
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
        className="w-full rounded-xl border border-white/10 bg-blue-500 px-3 py-2 outline-none focus:border-lime-300"
      />
    </div>
  );
}
