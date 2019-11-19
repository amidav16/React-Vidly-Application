import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import Pages from "./common/pages";
import Filter from "./common/filter";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import SearchBox from "./common/searchBar";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    filtered: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null
  };

  //this.handleSearchbarChange = this.handleSearchbarChange.bind(this);

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("this movie has already been deleted.");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    //Clone movies
    const movies = [...this.state.movies];
    //Find index of movie
    const index = movies.indexOf(movie);
    //Clone index of the movie (why is this needed?)
    movies[index] = { ...movies[index] };
    //if its true it becomes false otherwise it becomes true this is the toggle btw
    movies[index].liked = !movies[index].liked;
    //Set the state and pass the new movies array
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    //have to reset page or else the movies wont show if we switch from page 2 all genres to a genre with only 1 page!!
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearchbarChange = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  //if the path we are getting is the same we are getting in sort column we should reverse the order
  //otherwise make it asc, we can figure this out by cloning the state and comparing it to path
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies
    } = this.state;
    //First we filter then we sort then we paginate!!

    //if selected genre and id is trucy we get all movies and filter
    //them that the genre of each movie is equal to the selected genre, otherwise we will set the filter to all movies
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (moviesCount === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <Filter
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreChange}
            />
          </div>
          <div className="col">
            {user && (
              <Link className="btn btn-primary" to="/movies/new">
                New Movie
              </Link>
            )}

            <div className="m-3"></div>

            <p>Showing {totalCount} movies in the database.</p>

            <SearchBox
              onChange={this.handleSearchbarChange}
              value={searchQuery}
            ></SearchBox>

            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pages
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
