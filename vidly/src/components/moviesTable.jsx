import React, { Component } from "react";
import Table from "./common/table";
import LikeButton from "./common/likeButton";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
  //this would not change and doesnt have to be a state
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    //need unique identifer
    {
      key: "like",
      content: movie => (
        <LikeButton
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        />
      )
    }
  ];
  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
