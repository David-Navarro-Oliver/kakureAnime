# 🎬 Kakure Anime
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite 7](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Spring Boot API](https://img.shields.io/badge/API-Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)

Language: [🇪🇸 Español](./README.md) | [🇬🇧 English](./README.en.md)

Kakure Anime is a SPA focused on managing an anime movie catalog. The frontend consumes a Spring Boot REST API to list, create, edit, delete, and retrieve movies from a real database, without depending on `json-server`.

## ✨ Overview
![SPA Architecture](https://img.shields.io/badge/Architecture-SPA-0F172A?style=flat-square)
![CRUD](https://img.shields.io/badge/Flow-CRUD-2563EB?style=flat-square)
![REST API](https://img.shields.io/badge/Integration-REST_API-16A34A?style=flat-square)

This project works as a web client for a movie backend. The application allows users to browse the catalog, filter content, open detailed views, and manage records through forms connected to the API.

Main goals:

- Provide a visual anime movie catalog.
- Integrate a React frontend with a Spring Boot REST API.
- Offer a responsive experience with route-based navigation.
- Keep the codebase simple enough for team collaboration.

## 🖼️ Preview
![Responsive UI](https://img.shields.io/badge/UI-Responsive-F59E0B?style=flat-square)
![Team Project](https://img.shields.io/badge/Context-Team_Project-9333EA?style=flat-square)

![Kakure Anime preview](./src/assets/img/DemoKakureAnime.png)

## 🚀 Features
![Catalog](https://img.shields.io/badge/Catalog-Active-0284C7?style=flat-square)
![Filters](https://img.shields.io/badge/Filters-Genre_and_year-0EA5E9?style=flat-square)
![Detail views](https://img.shields.io/badge/Views-Detail_and_related-7C3AED?style=flat-square)
![Forms](https://img.shields.io/badge/Forms-Create_and_edit-22C55E?style=flat-square)

- Movie catalog consumed from the real backend.
- Detailed movie view with extended information.
- Related movies by genre on the detail page.
- Create form for new movies.
- Edit and delete flows for existing movies.
- Filters by genre, year, and free text.
- Local filter persistence through `localStorage`.
- Recommendation carousel on the home page.
- Contact and location page.
- Responsive navigation powered by `react-router-dom`.

## 🧰 Tech stack
![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/Routing-React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/HTTP-Axios-5A29E4?style=flat-square)
![ESLint](https://img.shields.io/badge/Quality-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)

| Layer | Tools |
| --- | --- |
| Frontend | React 19, React DOM 19 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| HTTP client | Axios |
| Quality | ESLint 9 |

## 🔌 Backend and API
![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Axios Client](https://img.shields.io/badge/HTTP_Client-Axios-5A29E4?style=flat-square)
![ENV](https://img.shields.io/badge/Config-VITE__API__URL-111827?style=flat-square)

The application consumes an external REST API. The base URL is configured through `VITE_API_URL` and falls back to:

```text
http://localhost:8080
```

Current HTTP client configuration:

```js
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() || "http://localhost:8080";
```

Endpoints used by the frontend:

- `GET /movies`
- `GET /movies/{id}`
- `POST /movies`
- `PUT /movies/{id}`
- `DELETE /movies/{id}`

Fields expected by the backend in the JSON payload:

| Field | Meaning |
| --- | --- |
| `title` | Title |
| `year` | Year |
| `duration` | Duration in minutes |
| `genre` | Genre |
| `studio` | Studio |
| `rating` | Score |
| `poster` | Poster URL |
| `synopsis` | Synopsis |

## 📂 Project structure
![Codebase](https://img.shields.io/badge/Codebase-src-1D4ED8?style=flat-square)
![Components](https://img.shields.io/badge/UI-components-0F766E?style=flat-square)
![Pages](https://img.shields.io/badge/Routes-pages-7C2D12?style=flat-square)
![Services](https://img.shields.io/badge/API-services-4C1D95?style=flat-square)

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
`-- README.en.md
```

## ⚙️ Getting started
![Node](https://img.shields.io/badge/Node-20.19%2B_or_22.12%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/Package_Manager-npm-CB3837?style=flat-square&logo=npm&logoColor=white)
![Local API](https://img.shields.io/badge/API-Localhost_8080-16A34A?style=flat-square)

Requirements:

- Node.js `^20.19.0 || >=22.12.0`
- npm
- Spring Boot backend running at `http://localhost:8080` or at the URL defined in `VITE_API_URL`

Repository clone:

```bash
git clone https://github.com/David-Navarro-Oliver/kakureAnime.git
cd kakureAnime
```

Install dependencies:

```bash
npm install
```

Start development mode:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Optional `.env` configuration:

```env
VITE_API_URL=http://localhost:8080
```

## 🧪 Available scripts
![Dev Server](https://img.shields.io/badge/dev-vite-646CFF?style=flat-square)
![Build](https://img.shields.io/badge/build-production-0F172A?style=flat-square)
![Lint](https://img.shields.io/badge/lint-eslint-4B32C3?style=flat-square)
![Preview](https://img.shields.io/badge/preview-local-334155?style=flat-square)

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Generates the production build |
| `npm run preview` | Serves the built app locally |
| `npm run lint` | Runs ESLint on the project |

## 🗃️ Legacy data migration
![Migration](https://img.shields.io/badge/Migration-Temporary_script-F97316?style=flat-square)
![Target](https://img.shields.io/badge/Target-POST_%2Fmovies-16A34A?style=flat-square)
![json-server retired](https://img.shields.io/badge/json--server-Retired-DC2626?style=flat-square)

The repository keeps `scripts/migrate-movies-from-db.mjs` as a temporary utility to explain or repeat a controlled legacy data load into the real backend.

Key notes:

- `json-server` is no longer part of the normal project workflow.
- The frontend works against the real database through the backend.
- The legacy `db.json` dump is no longer shipped in the repository.
- If the script needs to be reused, a compatible dataset must be provided manually.

## 📌 Current status
![Status](https://img.shields.io/badge/Status-Active-22C55E?style=flat-square)
![Backend integrated](https://img.shields.io/badge/Backend-Integrated-2563EB?style=flat-square)
![No json-server](https://img.shields.io/badge/json--server-Not_used-DC2626?style=flat-square)

Current project status:

- Frontend integrated with the Spring Boot backend.
- Working CRUD flow over the `movies` collection.
- Catalog and detail views connected to the REST API.
- Base documentation ready to be shared with the team.
