import React, { Component } from "react";
import Favorites from "../favorite/favorites";
import axios from "axios";

class MovieCard extends Component {
  state = {
    showOverview: false,
    comments: this.props.comment || ""
  };

  readMore() {
    this.setState({ showOverview: !this.state.showOverview });
  }

  componentWillReceiveProps(props) {
    this.setState({
      comments: props.comment || ""
    });
  }

  handleCommentsChange = event => {
    this.setState({
      comments: event.target.value
    });
  };

  postComments = () => {
    axios
      .put("http://localhost:3002/api/movies/" + this.props.movie.id + "/comments", {
        text: this.state.comments
      })
      .then(results => {
        this.setState({
          comments: results.data.text
        });
      });
  };

  render() {
    const movie = this.props.movie;
    return (
      <div className="infoCards">
        {this.props.liked.toString()}
        <table className="tableInfo">
          <tr>
            <th>Title:</th>
            <td>{movie.original_title}</td>
          </tr>

          <tr>
            <th>Original Language:</th>
            <td>
              <p>{movie.original_language}</p>
            </td>
          </tr>

          <tr>
            <th>Plot:</th>
            <td>
              <p>
                {movie.overview.length >= 200 && !this.state.showOverview
                  ? movie.overview.substring(0, 200) + "..."
                  : movie.overview}
              </p>
            </td>
          </tr>
        </table>

        <div className="buttons-container">
          <div className="read-more">
            {movie.overview.length >= 200 && (
              <button type="button" onClick={() => this.readMore()}>
                Read {!this.state.showOverview ? "More" : "Less"}
              </button>
            )}
          </div>

          <div className="like-button">
            <Favorites
              likeHandler={() => this.props.likeMovie(movie)}
              isFavorite={this.props.liked}
            />
          </div>

          <div className="comments-Box">
            <p>Comments: </p>
            <textarea
              className="commentsArea"
              placeholder="Comments..."
              value={this.state.comments}
              onChange={this.handleCommentsChange}
            />
            <button className="submit" onClick={this.postComments}>
              {" "}
              Post{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
