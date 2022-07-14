import axios from "axios";
import MovieModel from "../model/MovieModel";

// REACT_APP_API_BASE_URL ="http://localhost:3001"
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getMovies = async (moviesCategory: string) => {
  const response = await axios.get<MovieModel[]>(`${baseUrl}/${moviesCategory}`);
  return response.data;
};

const getMovieByTitle = async (moviesCategory: string, title: string) => {
  const response = await axios.get<MovieModel[]>(
    `${baseUrl}/${moviesCategory}/?title=${title}`
  );
  if (response.data === null || response.data.length === 0) {
    return null;
  }
  return response.data[0];
};

const addMovie = async (moviesCategory: string, movie: MovieModel) => {
  return axios
    .post<MovieModel[]>(`${baseUrl}/${moviesCategory}`, movie, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

const deleteMovieById = async (moviesCategory: string, id: string | number) => {
  const response = await axios.delete<MovieModel>(
    `${baseUrl}/${moviesCategory}/${id}`
  );
  return response.data;
};

const getHigestMovieId = async (moviesCategory: string) => {
  const response = await axios.get<MovieModel[]>(
    `${baseUrl}/${moviesCategory}?_sort=id&_order=desc`
  );

  if (response.data === null || response.data.length === 0) {
    return 0;
  }
  return response.data[0].id ?? 0;
};

export {
  getMovies,
  getMovieByTitle,
  addMovie,
  deleteMovieById,
  getHigestMovieId,
};
