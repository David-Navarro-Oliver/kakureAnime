# 🎬 Kakure Anime
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite 7](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Spring Boot API](https://img.shields.io/badge/API-Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)

Idioma: [🇪🇸 Español](./README.md) | [🇬🇧 English](./README.en.md)

Kakure Anime es una SPA orientada a la gestión de un catálogo de películas de anime. El frontend consume una API REST en Spring Boot para listar, crear, editar, borrar y consultar películas desde una base de datos real, sin depender ya de `json-server`.

## ✨ Descripción
![Arquitectura SPA](https://img.shields.io/badge/Arquitectura-SPA-0F172A?style=flat-square)
![CRUD](https://img.shields.io/badge/Flujo-CRUD-2563EB?style=flat-square)
![REST API](https://img.shields.io/badge/Integración-REST_API-16A34A?style=flat-square)

Este proyecto funciona como cliente web para un backend de películas. La aplicación permite navegar por el catálogo, filtrar contenido, consultar fichas individuales y gestionar registros mediante formularios conectados a la API.

Objetivos principales del proyecto:

- Mostrar un catálogo visual de películas de anime.
- Integrar un frontend React con una API REST en Spring Boot.
- Ofrecer una experiencia responsive con navegación por rutas.
- Mantener una base de código sencilla para trabajo en equipo.

## 🖼️ Vista previa
![Responsive UI](https://img.shields.io/badge/UI-Responsive-F59E0B?style=flat-square)
![Proyecto de equipo](https://img.shields.io/badge/Contexto-Proyecto_de_equipo-9333EA?style=flat-square)

![Vista previa de Kakure Anime](./src/assets/img/DemoKakureAnime.png)

## 🚀 Características
![Catálogo activo](https://img.shields.io/badge/Cat%C3%A1logo-Activo-0284C7?style=flat-square)
![Filtros](https://img.shields.io/badge/Filtros-G%C3%A9nero_y_a%C3%B1o-0EA5E9?style=flat-square)
![Detalle](https://img.shields.io/badge/Vistas-Detalle_y_relacionadas-7C3AED?style=flat-square)
![Formularios](https://img.shields.io/badge/Formularios-Alta_y_edici%C3%B3n-22C55E?style=flat-square)

- Catálogo de películas consumido desde backend real.
- Vista de detalle por película con información ampliada.
- Películas relacionadas por género en la ficha individual.
- Alta de nuevas películas mediante formulario.
- Edición y borrado de películas existentes.
- Filtros por género, año y texto libre.
- Persistencia local de filtros con `localStorage`.
- Carrusel de recomendaciones en la home.
- Página de contacto y ubicación.
- Navegación responsive con `react-router-dom`.

## 🧰 Stack técnico
![JavaScript](https://img.shields.io/badge/Lenguaje-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/Routing-React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/HTTP-Axios-5A29E4?style=flat-square)
![ESLint](https://img.shields.io/badge/Calidad-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)

| Capa | Herramientas |
| --- | --- |
| Frontend | React 19, React DOM 19 |
| Build | Vite 7 |
| Estilos | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| Cliente HTTP | Axios |
| Calidad | ESLint 9 |

## 🔌 Backend y API
![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Axios Client](https://img.shields.io/badge/Cliente_HTTP-Axios-5A29E4?style=flat-square)
![ENV](https://img.shields.io/badge/Config-VITE__API__URL-111827?style=flat-square)

La aplicación consume una API REST externa. La URL base se configura desde `VITE_API_URL` y, si no existe esa variable, usa por defecto:

```text
http://localhost:8080
```

Configuración actual del cliente HTTP:

```js
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() || "http://localhost:8080";
```

Endpoints utilizados por el frontend:

- `GET /movies`
- `GET /movies/{id}`
- `POST /movies`
- `PUT /movies/{id}`
- `DELETE /movies/{id}`

Campos esperados por el backend en el payload JSON:

| Campo | Significado |
| --- | --- |
| `title` | Título |
| `year` | Año |
| `duration` | Duración en minutos |
| `genre` | Género |
| `studio` | Estudio |
| `rating` | Puntuación |
| `poster` | URL del póster |
| `synopsis` | Sinopsis |

## 📂 Estructura del proyecto
![Codebase](https://img.shields.io/badge/Codebase-src-1D4ED8?style=flat-square)
![Componentes](https://img.shields.io/badge/UI-components-0F766E?style=flat-square)
![Páginas](https://img.shields.io/badge/Rutas-pages-7C2D12?style=flat-square)
![Servicios](https://img.shields.io/badge/API-services-4C1D95?style=flat-square)

```text
kakureAnime/
|-- scripts/
|   `-- migrate-movies-from-db.mjs
|-- src/
|   |-- assets/
|   |   `-- img/
|   |-- components/
|   |   |-- Carrousel.jsx
|   |   |-- Layout.jsx
|   |   |-- MovieCard.jsx
|   |   `-- Navbar.jsx
|   |-- pages/
|   |   |-- AddMovie.jsx
|   |   |-- EditMovie.jsx
|   |   |-- Home.jsx
|   |   |-- Location.jsx
|   |   |-- MovieDetail.jsx
|   |   `-- Movies.jsx
|   |-- services/
|   |   |-- apiClient.js
|   |   `-- moviesApi.js
|   |-- App.jsx
|   `-- main.jsx
|-- .vscode/
|-- package.json
`-- README.md
```

## ⚙️ Puesta en marcha
![Node](https://img.shields.io/badge/Node-20.19%2B_o_22.12%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/Gestor-npm-CB3837?style=flat-square&logo=npm&logoColor=white)
![API Local](https://img.shields.io/badge/API-Localhost_8080-16A34A?style=flat-square)

Requisitos:

- Node.js `^20.19.0 || >=22.12.0`
- npm
- Backend Spring Boot ejecutándose en `http://localhost:8080` o en la URL indicada por `VITE_API_URL`

Clonado del repositorio:

```bash
git clone https://github.com/David-Navarro-Oliver/kakureAnime.git
cd kakureAnime
```

Instalación:

```bash
npm install
```

Ejecución en desarrollo:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

Configuración opcional mediante `.env`:

```env
VITE_API_URL=http://localhost:8080
```

## 🧪 Scripts disponibles
![Dev Server](https://img.shields.io/badge/dev-vite-646CFF?style=flat-square)
![Build](https://img.shields.io/badge/build-producci%C3%B3n-0F172A?style=flat-square)
![Lint](https://img.shields.io/badge/lint-eslint-4B32C3?style=flat-square)
![Preview](https://img.shields.io/badge/preview-local-334155?style=flat-square)

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite |
| `npm run build` | Genera la build de producción |
| `npm run preview` | Sirve localmente la build generada |
| `npm run lint` | Ejecuta ESLint sobre el proyecto |

## 🗃️ Migración de datos legado
![Migración](https://img.shields.io/badge/Migraci%C3%B3n-Script_temporal-F97316?style=flat-square)
![Target](https://img.shields.io/badge/Target-POST_%2Fmovies-16A34A?style=flat-square)
![json-server retirado](https://img.shields.io/badge/json--server-Retirado-DC2626?style=flat-square)

El repositorio conserva el script `scripts/migrate-movies-from-db.mjs` como utilidad temporal para explicar o repetir una carga controlada de datos legacy hacia el backend real.

Puntos importantes:

- `json-server` ya no forma parte del flujo normal del proyecto.
- El frontend trabaja contra la base de datos real a través del backend.
- El volcado legacy `db.json` ya no se distribuye con el repositorio.
- Si se quiere reutilizar el script, hay que proporcionar un dataset compatible de forma manual.

## 📌 Estado actual
![Estado](https://img.shields.io/badge/Estado-Activo-22C55E?style=flat-square)
![Backend integrado](https://img.shields.io/badge/Backend-Integrado-2563EB?style=flat-square)
![Sin json-server](https://img.shields.io/badge/json--server-No_usado-DC2626?style=flat-square)

Estado funcional actual del proyecto:

- Frontend integrado con backend Spring Boot.
- CRUD operativo sobre la colección `movies`.
- Catálogo y detalle conectados a la API REST.
- Documentación base lista para compartir con el equipo.
