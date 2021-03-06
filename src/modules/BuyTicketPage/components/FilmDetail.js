import 'date-fns';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class FilmDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      film: "",
      cinema: "",
      date: "2019/10/30"
    }

  }
  render() {
    const { cinema } = this.props.cinema ? this.props : []
    const { showtimes } = this.props ? this.props : []
    const { movies } = this.props ? this.props : []
    const baseURL = "http://long-cinema-app.herokuapp.com/api/h/film/img/"
    console.log(this.props)
    const choseCinema = async (idCinema) => {
      await this.setState({
        cinema: idCinema
      })
      await this.props.actions.getShowtimes({ idCinema, idFilm: this.state.film })
    }

    const choseFilm = async (idFilm) => {
      await this.setState({
        film: idFilm
      })
      if (this.state.cinema !== "")
        this.props.actions.getShowtimes({ idCinema: this.state.cinema, idFilm: idFilm })
    }

    const displayMovies = () => {
      if (movies === undefined)
        return ""
      else
        return movies.map((item, index) => {
          return (
            <div className={this.state.film === item._id ? "row container btnFilm-active col-12 col-10 film-responsive" : "row container btnFilm col-12 col-10 film-responsive"} style={{ margin: "0px" }} onClick={() => choseFilm(item._id)} key={item._id}>
              <div className="mt-3">
                <img src={baseURL + item.img2} alt={item.name + " img"} className="film-img" style={{ width: "10rem", height: "50px" }} />
              </div>
              <div className="col mt-3 film-name" style={{ fontSize: "1.5rem" }}>{item.name}</div>
            </div>
          )
        })
    }

    const displayCinema = () => {
      if (cinema === undefined)
        return ""
      else
        return cinema.map((item, index) => {
          return (
            <div className={this.state.cinema === item._id ? "row container btnFilm-active col-10" : "row container btnFilm col-10"} style={{ margin: "0px", height: "70px" }} onClick={() => choseCinema(item._id)} key={item._id}>
              <div className="col-12 mt-4" style={{ fontSize: "1.7rem" }}>{item.name}</div>
            </div>
          )
        })
    }

    const gotoBuyTicket = (id) => {
      this.props.history.push("/book-ticket/" + id)
    }

    const displayShowtimes = () => {
      if (showtimes === undefined)
        return ""
      else if (JSON.stringify(showtimes) === JSON.stringify([]))
        return <h2 style={{ color: "red" }}>Kh??ng c?? su???t chi???u</h2>
      else
        return showtimes.map((items, index) => {
          return (
            <div className="col-12 row" key={index}>
              <h2 className="col-12" style={{ color: "red" }}>Ng??y {items[0].dayShow.split("/").reverse().join("/")}</h2>
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

    return this.props.movies ? (
      <React.Fragment>
        <div className="container">
          <div className="content-film-container row" style={{ top: "10rem" }}>
            <div className="row col-12">

              {/* show movie */}
              <div className="col-12 col-md-7 col-lg">
                <p className="title-conent" style={{ color: "black", fontSize: "2.5rem", position: "relative", marginBottom: "3rem" }}>Ch???n phim :
                  <span style={{ position: "absolute", height: "3px", width: "5rem", background: 'red', bottom: "0px", left: "0px" }}></span>
                </p>
                {displayMovies()}
              </div>

              {/* show cinema */}
              <div className="col-12 col-md-6 col-lg">
                <p className="title-conent" style={{ color: "black", fontSize: "2.5rem", position: "relative", marginBottom: "3rem" }}>Ch???n r???p :
                  <span style={{ position: "absolute", height: "3px", width: "5rem", background: 'red', bottom: "0px", left: "0px" }}></span>
                </p>
                {this.state.film !== "" ? displayCinema() : (<h2 style={{ color: "red" }}>Vui l??ng ch???n phim tr?????c</h2>)}
              </div>

              {/* show showtimes */}
              <div className="col-12 col-md" style={{ position: "relative" }}>
                <p className="title-conent" style={{ color: "black", fontSize: "2.5rem", position: "relative" }}>Ch???n Su???t :
                    <span style={{ position: "absolute", height: "3px", width: "5rem", background: 'red', bottom: "0px", left: "0px" }}></span>
                </p>
                <br />
                <div style={{ position: "relative", top: "1rem", left: "-1rem" }} className="row col-12">
                  {this.state.cinema !== "" ? displayShowtimes() : (<h2 style={{ color: "red" }}>Vui l??ng ch???n r???p tr?????c</h2>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : "";
  }
}

export default FilmDetail;