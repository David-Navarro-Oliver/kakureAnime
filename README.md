# 🎬 Kakure Anime
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite 7](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Spring Boot API](https://img.shields.io/badge/API-Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)

Kakure Anime es una SPA orientada a la gestion de un catalogo de peliculas de anime. El frontend consume una API REST en Spring Boot para listar, crear, editar, borrar y consultar peliculas desde una base de datos real, sin depender ya de `json-server`.

## ✨ Descripción
![SPA](https://img.shields.io/badge/Arquitectura-SPA-0F172A?style=flat-square)
![CRUD](https://img.shields.io/badge/Flujo-CRUD-2563EB?style=flat-square)
![REST API](https://img.shields.io/badge/Integracion-REST_API-16A34A?style=flat-square)

Este proyecto funciona como cliente web para un backend de peliculas. La aplicacion permite navegar por el catalogo, filtrar contenido, consultar fichas individuales y gestionar registros mediante formularios conectados a la API.

Objetivos principales del proyecto:

- Mostrar un catalogo visual de peliculas de anime.
- Integrar un frontend React con una API REST en Spring Boot.
- Ofrecer una experiencia responsive con navegacion por rutas.
- Mantener una base de codigo sencilla para trabajo en equipo.

## 🖼️ Vista previa
![Responsive UI](https://img.shields.io/badge/UI-Responsive-F59E0B?style=flat-square)
![Team Project](https://img.shields.io/badge/Contexto-Proyecto_de_equipo-9333EA?style=flat-square)

![Vista previa de Kakure Anime](./src/assets/img/DemoKakureAnime.png)

## 🚀 Características
![Catalogo](https://img.shields.io/badge/Catalogo-Activo-0284C7?style=flat-square)
![Filtros](https://img.shields.io/badge/Filtros-Genero_y_anio-0EA5E9?style=flat-square)
![Detalle](https://img.shields.io/badge/Vistas-Detalle_y_relacionadas-7C3AED?style=flat-square)
![Formularios](https://img.shields.io/badge/Formularios-Alta_y_edicion-22C55E?style=flat-square)

- Catalogo de peliculas consumido desde backend real.
- Vista de detalle por pelicula con informacion ampliada.
- Peliculas relacionadas por genero en la ficha individual.
- Alta de nuevas peliculas mediante formulario.
- Edicion y borrado de peliculas existentes.
- Filtros por genero, anio y texto libre.
- Persistencia local de filtros con `localStorage`.
- Carrusel de recomendaciones en la home.
- Pagina de contacto y ubicacion.
- Navegacion responsive con `react-router-dom`.

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

La aplicacion consume una API REST externa. La URL base se configura desde `VITE_API_URL` y, si no existe esa variable, usa por defecto:

```text
http://localhost:8080
```

Configuracion actual del cliente HTTP:

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

Contrato esperado para una pelicula:

- `title`
- `year`
- `duration`
- `genre`
- `studio`
- `rating`
- `poster`
- `synopsis`

## 📂 Estructura del proyecto
![src](https://img.shields.io/badge/Codebase-src-1D4ED8?style=flat-square)
![components](https://img.shields.io/badge/UI-components-0F766E?style=flat-square)
![pages](https://img.shields.io/badge/Rutas-pages-7C2D12?style=flat-square)
![services](https://img.shields.io/badge/API-services-4C1D95?style=flat-square)

```text
kakureAnime/
├─ scripts/
│  └─ migrate-movies-from-db.mjs
├─ src/
│  ├─ assets/
│  │  └─ img/
│  ├─ components/
│  │  ├─ Carrousel.jsx
│  │  ├─ Layout.jsx
│  │  ├─ MovieCard.jsx
│  │  └─ Navbar.jsx
│  ├─ pages/
│  │  ├─ AddMovie.jsx
│  │  ├─ EditMovie.jsx
│  │  ├─ Home.jsx
│  │  ├─ Location.jsx
│  │  ├─ MovieDetail.jsx
│  │  └─ Movies.jsx
│  ├─ services/
│  │  ├─ apiClient.js
│  │  └─ moviesApi.js
│  ├─ App.jsx
│  └─ main.jsx
├─ .vscode/
├─ package.json
└─ README.md
```

## ⚙️ Puesta en marcha
![Node](https://img.shields.io/badge/Node-20.19%2B%20o%2022.12%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/Gestor-npm-CB3837?style=flat-square&logo=npm&logoColor=white)
![Local API](https://img.shields.io/badge/API_Localhost-8080-16A34A?style=flat-square)

Requisitos:

- Node.js `^20.19.0 || >=22.12.0`
- npm
- Backend Spring Boot ejecutandose en `http://localhost:8080` o en la URL indicada por `VITE_API_URL`

Clonado del repositorio:

```bash
git clone https://github.com/David-Navarro-Oliver/kakureAnime.git
cd kakureAnime
```

Instalacion:

```bash
npm install
```

Ejecucion en desarrollo:

```bash
npm run dev
```

Build de produccion:

```bash
npm run build
```

Configuracion opcional mediante `.env`:

```env
VITE_API_URL=http://localhost:8080
```

## 🧪 Scripts disponibles
![Dev Server](https://img.shields.io/badge/dev-vite-646CFF?style=flat-square)
![Build](https://img.shields.io/badge/build-produccion-0F172A?style=flat-square)
![Lint](https://img.shields.io/badge/lint-eslint-4B32C3?style=flat-square)
![Preview](https://img.shields.io/badge/preview-local-334155?style=flat-square)

| Comando | Descripcion |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite |
| `npm run build` | Genera la build de produccion |
| `npm run preview` | Sirve localmente la build generada |
| `npm run lint` | Ejecuta ESLint sobre el proyecto |

## 🗃️ Migración de datos legado
![Legacy Script](https://img.shields.io/badge/Migracion-Script_temporal-F97316?style=flat-square)
![Spring Boot POST](https://img.shields.io/badge/Target-POST_%2Fmovies-16A34A?style=flat-square)
![Legacy Removed](https://img.shields.io/badge/json--server-Retirado-DC2626?style=flat-square)

El repositorio conserva el script `scripts/migrate-movies-from-db.mjs` como utilidad temporal para explicar o repetir una carga controlada de datos legacy hacia el backend real.

Puntos importantes:

- `json-server` ya no forma parte del flujo normal del proyecto.
- El frontend trabaja contra la base de datos real a traves del backend.
- El volcado legacy `db.json` ya no se distribuye con el repositorio.
- Si se quiere reutilizar el script, hay que proporcionar un dataset compatible de forma manual.

## 📌 Estado actual
![Estado](https://img.shields.io/badge/Estado-Activo-22C55E?style=flat-square)
![Backend integrado](https://img.shields.io/badge/Backend-Integrado-2563EB?style=flat-square)
![Sin json-server](https://img.shields.io/badge/json--server-No_usado-DC2626?style=flat-square)

Estado funcional actual del proyecto:

- Frontend integrado con backend Spring Boot.
- CRUD operativo sobre la coleccion `movies`.
- Catalogo y detalle conectados a la API REST.
- Documentacion base lista para compartir con el equipo.
