import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";

function movieUrl(id) {
  return apiEndPoint + "/" + id;
}

//get all movies
export function getMovies() {
  return http.get(apiEndPoint);
}

//get single movie
export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

//use post in order to add the movie to the database
export function saveMovie(movie) {
  //check if the id exist and delete the id
  if (movie.id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie.id), body);
  }
  //otherwise we are making a new movie
  return http.post(apiEndPoint, movie);
}
