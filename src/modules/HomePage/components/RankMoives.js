import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import DialogTrailer from "../../common/dialogTrailerComponent"
import DialogLoading from "../../common/loadingDialog"

class CarouselHomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: this.props.movie ? this.props.movies[0]._id : 0,
      openLoading: false
    }
  }
  componentDidMount() {
    this.setState({
      movie: this.props.movie ? this.props.movies[0]._id : 0
    })
  }
  render() {
    const { movies } = this.props
    const moviesShow = movies ? movies.slice().sort((a, b) => b.rate - a.rate).slice(0, 4) : []
    const dislayMovies = (movies) => {
      return movies.map(movie => (
        <Slide key={movie._id}>
          <div style={{ backgroundImage: "radial-gradient( #4d3b3b00, #000000)", width: "100%", height: "100%", position: "absolute" }}>
          </div>
          <img alt={movie.name + " img"} src={baseURL + movie.img2} style={{ width: "100%", height: "100%" }} />
          <div className="play-homepage" style={{ zIndex: "20" }}>
            <DialogTrailer {...movie} />
          </div>
        </Slide>
      ))
    }

    const moveToFilm = (action, index, id, history) => {
      console.log(index)
      if (action.state.movie !== "" && (action.state.movie === id || index === action.state.movie)) {
        this.setState({ openLoading: true })
        history.push("/film-detail/" + id)
      }
      action.setState({
        movie: id
      })
    }

    const dislayDots = (movies, action, history) => {
      return movies.slice().sort((a, b) => b.rate - a.rate).map((movie, index) => {
        return (
          <Dot slide={index} key={index} onClick={e => moveToFilm(action, index, movie._id, history)} className="col-12 row film-rank" style={{ border: "none", background: "#00000073", color: "#ffffffad", textAlign: "left", outline: "none" }}>
            <img alt={movie.name + " img"} onClick={e => moveToFilm(action, index, movie._id, history)} style={{ width: "30%", height: "50%" }} src={baseURL + movie.img2} disabled={false} />
            <div className="col-9 row" onClick={e => moveToFilm(action, index, movie._id, history)} >
              <div className="col-0 col-lg-8 col-6" style={{ fontSize: "1.5rem" }}>
                <span>{movie.name.split(" ").slice(0, 7).join(" ") + (movie.name.split(" ").length > 7 ? "..." : "")}</span>
              </div>
              <div className="col col-md-4" >
                <div className="point-bg" style={{ marginTop: "0.3rem", fontSize: "1.5rem" }}>
                  <div className="point" style={{ paddingTop: "1.2rem", fontWeight: "bold" }}>
                    {movie.rate}
                  </div>
                </div>
              </div>
            </div>
          </Dot>
        )
      })
    }
    const baseURL = "http://long-cinema-app.herokuapp.com/api/h/film/img/"
    console.log(this.props)
    return (
      <React.Fragment>
        <DialogLoading open={this.state.openLoading} />

        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={35}
          totalSlides={moviesShow.length}
          orientation="vertical"
          style={{ position: "relative", overflow: "hidden" }}
          dragEnabled={false}
        >
          <Slider style={{ position: "relative", height: "100%" }}>
            {dislayMovies(moviesShow)}
          </Slider>
          <div style={{ position: "absolute", top: "2rem", left: "5rem", width: "40%" }}>
            <div className="row col-12 col-lg-10 list-film-rank">
              {dislayDots(moviesShow, this, this.props.history)}
            </div>
          </div>

        </CarouselProvider>
      </React.Fragment>
    );
  }
}

export default CarouselHomePage;