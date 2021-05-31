import React, { Component } from 'react';

import DialogTrailer from "../../common/dialogTrailerComponent"

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { ic_keyboard_arrow_left } from 'react-icons-kit/md/ic_keyboard_arrow_left'
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right'
import { ic_fiber_manual_record } from 'react-icons-kit/md/ic_fiber_manual_record'
import Icon from 'react-icons-kit';
import DialogLoading from "../../common/loadingDialog"

class CarouselHomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slide: 0,
      movie: this.props.movie ? this.props.movies[0]._id : "",
      openLoading: false
    }
  }
  render() {
    const { movies } = this.props
    const moviesShow = movies ? movies.slice().sort((a, b) => b.rate - a.rate).slice(0, 4) : []

    const moveToFilm = (action, index, id, history) => {
      this.setState({ openLoading: true })
      history.push("/film-detail/" + id)
    }

    const dislayMovies = (movies, action, history) => {
      console.log(action)
      return movies.map((movie, index) => (
        <Slide key={movie._id}>
          <img onClick={e => moveToFilm(action, index, movie._id, history)} alt={movie.name + " img"} src={baseURL + movie.img2} style={{ width: "100%", height: "100%", cursor: "pointer" }} />
          <div className="play-homepage">
            <DialogTrailer {...movie} />
          </div>
        </Slide>
      ))
    }

    const dislayDots = (movies) => {
      return movies.map((moive, index) => (
        <Dot slide={index} key={index} style={{ border: "none", background: "none", color: "white" }}>
          <Icon size={20} icon={ic_fiber_manual_record} />
        </Dot>
      ))
    }
    const baseURL = "http://long-cinema-app.herokuapp.com/api/h/film/img/"
    return (
      <React.Fragment>
        <DialogLoading open={this.state.openLoading} />

        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={35}
          totalSlides={moviesShow.length}
          style={{ position: "relative", overflow: "hidden" }}
          playDirection="forward"
        >
          <Slider style={{ position: "relative", height: "100%" }}>
            {dislayMovies(moviesShow, this, this.props.history)}
          </Slider>

          <ButtonBack className="back-carousel">
            <Icon size={50} icon={ic_keyboard_arrow_left} />
          </ButtonBack>
          <ButtonNext className="next-carousel" >
            <Icon size={50} icon={ic_keyboard_arrow_right} />
          </ButtonNext>
          <div style={{ position: "relative", textAlign: "center", bottom: "2rem" }}>
            {dislayDots(moviesShow)}
          </div>

        </CarouselProvider>
      </React.Fragment>
    );
  }
}

export default CarouselHomePage;