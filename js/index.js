"use strict";

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _preact = preact;
var h = _preact.h;
var render = _preact.render;
var Component = _preact.Component; // import { ... } from 'preact';
/** @jsx h */

var Form = function Form(props) {
  return h(
    "form",
    { onSubmit: props.this.search, action: "javascript:void(0)" },
    h("input", {
      type: "search",
      placeholder: "Search for a movie",
      value: props.value,
      onChange: props.this.setQuery
    })
  );
};
var changeBackdrop = function changeBackdrop(path) {
  var container = document.querySelector("main");
  var background = "";
  if (path != null) {
    background = "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/w1280" + path + ") no-repeat center center";
  } else {
    background = "rgb(16, 16, 16)";
  }

  container.style.background = background;
  container.style.backgroundSize = "cover";
};
var formatRuntime = function formatRuntime(runtime) {
  var minutes = runtime % 60;
  var hours = Math.floor(runtime / 60);
  return hours + " " + (hours > 1 ? "hours" : "hour") + " " + minutes + " minutes";
};
var formatReleaseDate = function formatReleaseDate(date) {
  var dateArray = date.split("-").reverse();
  var day = dateArray[0];
  var month = "";
  switch (parseInt(dateArray[1])) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December";
      break;
    default:
      month = "";
  }
  var year = dateArray[2];
  return day + " " + month + " " + year;
};
var formatTitleDate = function formatTitleDate(date) {
  return date.split("-")[0];
};
var getGenreNames = function getGenreNames(genres) {
  var genreArray = genres.map(function (genre) {
    return genre.name;
  });
  return genreArray.join(", ");
};
var getCompanyNames = function getCompanyNames(companies) {
  var companyArray = companies.map(function (company) {
    return company.name;
  });
  return companyArray.join(", ");
};
var getCountryNames = function getCountryNames(countries) {
  var productionCountries = countries.map(function (country) {
    return country.name;
  });
  return productionCountries.join(", ");
};
var getMovieIdAndRelated = function getMovieIdAndRelated(name) {
  return fetch("https://api.themoviedb.org/3/search/movie?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US&query=" + name + "&page=1&include_adult=false").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return {
      id: data.results[0].id,
      related: data.results.splice(1)
    };
  }).catch(function (err) {
    return console.error(err);
  });
};
var getMovieById = function getMovieById(id, related) {
  return fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return { movie: data, related: related };
  }).catch(function (err) {
    return console.error(err);
  });
};
var RelatedMovies = function RelatedMovies(props) {
  var related = props.related;
  var listItems = related.map(function (movie, i) {
    return h(
      "li",
      null,
      h(
        "span",
        null,
        movie.title
      ),
      " (",
      movie.release_date.split("-")[0],
      ")"
    );
  });
  return h(
    "ul",
    { id: "related" },
    listItems
  );
};
var Results = function Results(props) {
  var movie = props.movie;
  var related = props.related;
  return h(
    "div",
    { "class": "results" },
    h(
      "div",
      { "class": "movie" },
      h(
        "div",
        { "class": "movie-details" },
        h(
          "div",
          { "class": "movie-details-container" },
          h(
            "div",
            { "class": "column column-md" },
            h("img", {
              src: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
              id: "poster"
            })
          ),
          h(
            "div",
            { "class": "column column-md" },
            h(
              "h1",
              { id: "title" },
              movie.title,
              h(
                "span",
                { id: "date", style: "padding: 0 0.5rem;" },
                "(",
                formatTitleDate(movie.release_date),
                ")"
              )
            ),
            h(
              "div",
              { "class": "row" },
              h(
                "span",
                { "class": "badge" },
                h(
                  "span",
                  { id: "status" },
                  movie.status
                )
              )
            ),
            h(
              "div",
              { "class": "row" },
              formatRuntime(movie.runtime),
              " | ",
              getGenreNames(movie.genres),
              " |",
              formatReleaseDate(movie.release_date)
            ),
            h(
              "h3",
              { id: "tagline" },
              movie.tagline
            ),
            h(
              "div",
              { id: "overview" },
              h(
                "p",
                { id: "synopsis" },
                movie.overview
              )
            ),
            h(
              "div",
              { "class": "row" },
              h(
                "h2",
                null,
                "Company Credits"
              ),
              h(
                "div",
                { id: "companies" },
                getCompanyNames(movie.production_companies)
              )
            ),
            h(
              "div",
              { "class": "row" },
              h(
                "h2",
                null,
                "Countries"
              ),
              h(
                "div",
                { id: "countries" },
                getCountryNames(movie.production_countries)
              )
            ),
            h(
              "div",
              { "class": "row" },
              h(
                "h2",
                null,
                "Box Office"
              ),
              h(
                "div",
                { id: "budget" },
                h(
                  "strong",
                  null,
                  "Budget:"
                ),
                " $",
                movie.budget.toLocaleString()
              ),
              h(
                "div",
                { id: "revenue" },
                h(
                  "strong",
                  null,
                  "Revenue:"
                ),
                " $",
                movie.revenue.toLocaleString()
              )
            ),
            h(
              "div",
              { "class": "row" },
              h(
                "div",
                { "class": "column column-md" },
                h(
                  "div",
                  { "class": "ratings" },
                  h(
                    "h2",
                    null,
                    "Rating"
                  ),
                  h(
                    "span",
                    { id: "rating" },
                    movie.vote_average,
                    "/10"
                  )
                )
              ),
              h(
                "div",
                { "class": "column column-md" },
                h(
                  "h2",
                  null,
                  "Runtime"
                ),
                h(
                  "div",
                  null,
                  h(
                    "div",
                    { id: "runtime" },
                    movie.runtime || 0,
                    " minutes"
                  )
                )
              ),
              h(
                "div",
                { "class": "column column-lg" },
                h(
                  "h2",
                  null,
                  "Related"
                ),
                h(
                  "div",
                  { "class": "related" },
                  related ? h(RelatedMovies, { related: related }) : ""
                )
              )
            )
          )
        )
      )
    )
  );
};

var MovieCard = function (_Component) {
  _inherits(MovieCard, _Component);

  function MovieCard(props) {
    _classCallCheck(this, MovieCard);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      query: "",
      data: {
        movie: [],
        related: []
      }
    };
    _this.setQuery = _this.setQuery.bind(_this);
    _this.search = _this.search.bind(_this);
    return _this;
  }

  MovieCard.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var default_movie = "my neighbor totoro";
    getMovieIdAndRelated(default_movie).then(function (res) {
      getMovieById(res.id, res.related).then(function (data) {
        _this2.setState({
          data: {
            movie: data.movie,
            related: data.related
          }
        });
        changeBackdrop(data.movie.backdrop_path);
      });
    });
  };

  MovieCard.prototype.setQuery = function setQuery(e) {
    this.setState({
      query: e.target.value
    });
  };

  MovieCard.prototype.search = function search() {
    var _this3 = this;

    var name = this.state.query;
    getMovieIdAndRelated(name).then(function (res) {
      getMovieById(res.id, res.related).then(function (data) {
        _this3.setState({
          data: {
            movie: data.movie,
            related: data.related
          }
        });
        changeBackdrop(data.movie.backdrop_path);
      });
    });
  };

  MovieCard.prototype.render = function render(_ref, state) {
    _objectDestructuringEmpty(_ref);

    var movieLoaded = state.data.movie.id;
    return h(
      "div",
      { "class": "movie-card" },
      h(Form, { value: state.query, "this": this }),
      movieLoaded ? h(Results, { movie: state.data.movie, related: state.data.related }) : h(
        "p",
        null,
        "Loading..."
      )
    );
  };

  return MovieCard;
}(Component);

render(h(MovieCard, null), document.querySelector("main"));