import React, { Component } from 'react';
import FilmComponent from "../../common/filmComponent"

class MoviesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: true
    }
  }
  componentDidMount() {
    console.log(this.props.location)
    if(this.props.location.pathname.indexOf("coming") !== -1){
      this.setState({
        status : false
      })
    }
  }
  render() {
    const { movies, moviesComing } = this.props
    const changeStatusMovie = (status) => {
      if( status && status !== this.state.status){
        this.props.history.push("/film/showing")
      }
      else if( !status && status !== this.state.status){
        this.props.history.push("/film/coming")
      }
      this.setState({
        status: status
      })
    }
    const dislayMovies = (movies) => {

      return movies ? movies.map((movie, index) => (
        <FilmComponent history={this.props.history} key={index} {...movie} />
      ))
        : ""
    }
    return (
      <React.Fragment>
        <div style={{ marginTop: "10rem", width: "100%" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <span className="title-list" style={{ fontSize: "2rem", fontWeight: "bold", color: !this.state.status ? "black" : "red" }} onClick={() => changeStatusMovie(true)}>Phim đang chiếu
                    <div className={!this.state.status ? "line-title" : "line-title-active"}></div>
            </span>
            <span className="title-list" style={{ fontSize: "2rem", fontWeight: "bold", marginLeft: "2rem", position: "relative", color: this.state.status ? "black" : "red" }} onClick={() => changeStatusMovie(false)}>
              Phim sắp chiếu
                    <div className={this.state.status ? "line-title" : "line-title-active"} ></div>
            </span>
          </div>

          <div className="container" style={{ marginTop: "3rem", position: "relative", display: this.state.status ? "" : "none" }}>
            <div className="row" style={{ width: "100%" }}>
              {dislayMovies(movies)}
            </div>
          </div>
          <div className="container" style={{ marginTop: "3rem", position: "relative", display: !this.state.status ? "" : "none" }}>
            <div className="row" style={{ width: "100%" }}>
              {dislayMovies(moviesComing)}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MoviesPage;