import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "./../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    //controlled value cannot be null or unidentified...
    //therefore initiliaze it to an empty string or some value you find from the server
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .integer()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .label("Rate")
      .min(0)
      .max(10)
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    //we will return right away cause we dont have to populate existing data
    if (movieId === "new") return;
    const movie = getMovie(movieId);
    //use replace so pressing the go back button wont put them in a bad loop
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapPropertyToData(movie) });
  }

  mapPropertyToData(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>New Movie</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
