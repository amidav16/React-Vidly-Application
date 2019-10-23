import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "./../services/fakeMovieService";

class NewMovieForm extends Form {
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
    genre: Joi.string()
      .required()
      .label("Genre")
      .allow("Action", "Comedy", "Thriller"),
    numberInStock: Joi.number()
      .required()

      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .integer()
      .label("Rate")
      .min(0)
      .max(10)
  };

  doSubmit = () => {
    //call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("numberInStock", "Number in stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save", () => saveMovie(this.data))}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
