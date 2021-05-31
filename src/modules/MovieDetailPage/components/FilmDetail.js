import 'date-fns';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DialogTrailer from "../../common/dialogTrailerComponent"
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll"
import { duration } from '@material-ui/core/styles';

class FilmDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cinema: "",
      date: "2019/10/30"
    }
    scroll.scrollToTop({ duration: 0 })
  }
  componentDidMount() {
    console.log(this.props.movie)
    if (this.props.cinema)
      this.props.actions.getShowtimes({ idCinema: this.props.cinema._id, idFilm: this.props.movie._id, dayShow: this.state.date })
  }
  render() {
    const { img1, img2, name, type, director, dayShow, content, time, country, _id } = this.props.movie ? this.props.movie : {}
    const { cinema } = this.props.cinema ? this.props : []
    const { showtimes } = this.props ? this.props : []
    const { movies } = this.props ? this.props : []
    console.log(this.props)

    const choseCinema = (name, idCinema, idFilm) => {
      this.setState({
        idCinema
      })
      this.props.actions.getShowtimes({ idCinema, idFilm: idFilm })
    }

    const moveToFilm = (id) => {
      choseCinema(id, this.state.cinema)
      this.props.history.push("/film-detail/" + id)
    }

    const displayCinema = () => {
      if (cinema === undefined)
        return ""
      else
        return cinema.map((item, index) => {
          return (
            <div key={item._id}>
              <Button variant="contained" className={this.state.idCinema === item._id ? "btn-cinema-active" : "btn-cinema"} onClick={() => choseCinema(item.name, item._id, _id)}>
                {item.name}
              </Button>
              <br />
            </div>
          )
        })
    }

    const displayShowtimes = () => {
      if (showtimes === undefined)
        return ""
      else if (JSON.stringify(showtimes) === JSON.stringify([]))
        return <h2 style={{ color: "red", marginLeft: "1.5rem" }}>Không có suất chiếu</h2>
      else
        return showtimes.map((items, index) => {
          console.log(items)
          return (
            <div className="col-12 row" key={index}>
              <h2 className="col-12" style={{ color: "red" }}>Ngày {items[0].dayShow.split("/").reverse().join("/")}</h2>
              {items.map(item =>
                <div key={item._id} className="col-4 mb-5">
                  <Button variant="contained" className="btn-showtimes" onClick={() => gotoBuyTicket(item._id)}>
                    {item.timeShow}
                  </Button>
                </div>)}
            </div>
          )
        })
    }

    const gotoBuyTicket = (id) => {
      this.props.history.push("/book-ticket/" + id)
    }

    const dislayMovies = (movies) => {
      console.log(movies)
      return movies ? movies.map((movie, index) => (
        <div style={{ marginBottom: "5rem", textAlign: "center", position: "relative" }}>
          <img className="film-component" alt={movie.name + " img"} src={"http://long-cinema-app.herokuapp.com/api/h/film/img/" + movie.img1} />
          <Link onClick={() => { moveToFilm(movie._id) }} className="bg-film-detail-component" to={"/film-detail/" + movie._id}>
            <Button className="button-film-component" variant="contained" >
              Mua Vé
                    </Button>
          </Link>
          <p onClick={() => { moveToFilm(movie._id) }} className="title-film-component">{movie.name}</p>
        </div>
      ))
        : ""
    }

    return movies ? (
      <React.Fragment>
        <div className="bg-film" style={{ zIndex: "5" }}>'
          <div style={{ backgroundImage: "radial-gradient( #00000091, #000000)", left: "2px", top: "0px", width: "100%", height: "100%", position: "absolute", zIndex: "5" }}>
          </div>
          <img className="film-img1" alt={name + " img"} src={"http://long-cinema-app.herokuapp.com/api/h/film/img/" + img2} style={{}} />
        </div>
        <div className="container">
          <div className="content-film-container row">
            <div className="col-12 col-lg-3">
              <img alt={name + " img"} className="film-img2" style={{ width: "70rem" }} src={"http://long-cinema-app.herokuapp.com/api/h/film/img/" + img1} />
              <div className="play-trailer">
                <DialogTrailer {...this.props.movie} />
              </div>
            </div>
            <div className="col-12 col-lg-9">
              <p className="title-film" style={{ color: "white" }}>{name}</p>
              <p className="title-conent">Thể loại : <span className="content">{type}</span></p>
              <p className="title-conent">Đạo diễn : <span className="content">{director}</span></p>
              <p className="title-conent">Khởi chiếu : <span className="content">{dayShow}</span></p>
              <p className="title-conent">Thời lượng : <span className="content">{time} phút</span></p>
              <p className="title-conent">Quốc gia : <span className="content">{country}</span></p>
            </div>
            <div className="col-12 mt-5">
              <p className="title-conent" style={{ color: "black", fontSize: "2.5rem", position: "relative" }}>Nội dung phim :
              <span style={{ position: "absolute", height: "3px", width: "10rem", background: 'red', bottom: "0px", left: "0px" }}></span>
              </p>
              <p className="content-film mt-5" style={{ color: "black" }}>{content}</p>
            </div>
            <div className="row col-12 mt-5">
              <div className="col-12 col-md-4">
                <p className="title-conent" style={{ color: "black", fontSize: "2.5rem", position: "relative" }}>Tên rạp :
                <span style={{ position: "absolute", height: "3px", width: "5rem", background: 'red', bottom: "0px", left: "0px" }}></span>
                </p>
                {displayCinema()}
              </div>

              {/* show showtimes */}
              <div className="col-12 col-md-4" style={{ position: "relative" }}>
                <p className="title-conent" style={{ color: "black", fontSize: "2.5rem", position: "relative" }}>Suất chiếu :
                    <span style={{ position: "absolute", height: "3px", width: "5rem", background: 'red', bottom: "0px", left: "0px" }}></span>
                </p>
                <br />
                {this.state.idCinema ?
                  <div>
                    <div style={{ position: "relative" }} className="row">
                      {displayShowtimes()}
                    </div>
                  </div> :
                  ""
                }
              </div>

              <div className="col film-detail-display ml-5">

                <p className="title-conent" style={{ color: "black", fontSize: "2rem", position: "relative", width: "20rem", marginLeft: "20%", marginBottom: "3rem" }}>Phim đang chiếu :
              <span style={{ position: "absolute", height: "3px", width: "10rem", background: 'red', bottom: "0px", left: "0px" }}></span>
                </p>
                {dislayMovies(movies.slice(0, 3))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : "";
  }
}

export default FilmDetail;