import { apiClient } from "./apiClient";

const MOVIES_PATH = "/movies";

export const getAllMovies = async () => {
  const response = await apiClient.get(MOVIES_PATH);
  return response.data;
};

export const getMovieById = async (id) => {
  const response = await apiClient.get(`${MOVIES_PATH}/${id}`);
  return response.data;
};

export const createMovie = async (movie) => {
  const response = await apiClient.post(MOVIES_PATH, movie);
  return response.data;
};

export const updateMovie = async (id, movie) => {
  const response = await apiClient.put(`${MOVIES_PATH}/${id}`, movie);
  return response.data;
};

export const deleteMovie = async (id) => {
  await apiClient.delete(`${MOVIES_PATH}/${id}`);
};
