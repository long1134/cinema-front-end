import React, { Component } from 'react';
import io from "socket.io-client"
import * as coockie from "js-cookie"
import { ic_payment } from 'react-icons-kit/md/ic_payment'
import { Icon } from 'react-icons-kit'

class FilmDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusForm: false,
      statusFormOne: false
    }
  }

  componentDidMount() {
    // const socket = io("http://localhost:8080")
    // socket.emit("testSocket", "5d8f232dfff4880f7c2aa867")
    // socket.on("testSocket", (map) => {
    //   console.log(map)
    //   this.props.actions.handleRealTimeMap(map)
    // })
  }

  displayTickets = (tickets) => {
    return tickets.map(ticket =>
      <span key={ticket.name} style={{ marginRight: "1rem" }}>
        {ticket.name} ({ticket.count})
      </span>
    )
  }
  displayCombo = (detailCombo) => {
    return detailCombo.map(combo =>
      <span key={combo.name} style={{ marginRight: "1rem" }}>
        {combo.name} ({combo.count})
      </span>
    )
  }
  displaySeats = (detailSeat) => {
    return detailSeat.map(seat =>
      <span key={seat} style={{ marginRight: "1rem" }}>
        {seat}
      </span>
    )
  }

  render() {
    const { img1, name, type } = this.props.film ? this.props.film : {}
    const { dayShow, timeShow } = this.props.showtimes ? this.props.showtimes : {}
    const { detailTickets, detailCombo, total, detailSeats } = this.props
    const baseURL = "http://long-cinema-app.herokuapp.com/api/h/film/img/"

    const changeBookStep = () => {
      if (this.props.detailTickets.length === 0) {
        return this.setState({
          statusFormOne: true
        })
      }
      else {
        this.props.actions.handleBookStep(2)
        this.setState({
          statusFormOne: false
        })
      }
      if (this.props.bookStep === 2) {
        if (this.props.countTickets !== this.props.detailSeats.length) {
          return this.setState({
            statusForm: true
          })
        }
        handleCheckLogin()
        this.setState({
          statusFormOne: false
        })
      }
      if (this.props.bookStep === 2 && coockie.get("userInfo")) {
        this.props.actions.handleBookStep(3)
      }
    }

    const handleCheckLogin = () => {
      if (!coockie.get("userInfo")) {
        this.props.actions.handleDialog("2")
      }
    }

    const handlePreBookStep = (step) => {
      this.setState({
        statusForm: false
      })
      if (step === 1)
        this.props.actions.handlePreStep(step)
      else
        this.props.actions.handleBookStep(step)
    }

    const handlePay = () => {
      console.log(this.props)
      if (this.props.detailSeats.length > 0 && this.props.detailSeats.length === this.props.countTickets) {
        console.log(this.props.mapPay)
        this.props.actions.handlePay({
          showtimes: {
            map: this.props.mapPay,
            combo: this.props.dataCombo.filter(data => data.count > 0),
            detailTickets: this.props.dataTickets.filter(data => data.count > 0),
            revenue: this.props.total,
            revenueTickets: this.props.revenueTickets,
            revenueCombo: this.props.revenueCombo,
          },
          detailSeats: this.props.detailSeats,
          filmName: this.props.film.name,
          //id showtimes
          id: this.props.match.params.id
        })
        this.setState({ statusForm: true })
      }
      else {
        this.setState({ statusForm: true })
      }
    }

    return (
      <React.Fragment>
        <div className="col-11 col-lg-3 book-detail container" style={{ height: "auto", position: "fixed", right: "25rem" }}>
          <div className="container film-detail" style={{ width: "80%", background: "#F1F1F1", marginLeft: "20%" }}>
            <img src={baseURL + img1} alt={name + " img"} style={{ width: "50%", marginLeft: "25%", marginTop: "3rem" }} />
            <h2 style={{ color: "black", marginTop: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>{name}</h2>
            <p className="book-film-detail-title" >Thể loại : <span style={{ fontWeight: "400" }}>{type}</span></p>
            <p className="book-film-detail-title" >Suất chiếu : <span style={{ fontWeight: "400" }}>{timeShow} | {dayShow ? dayShow.split("/").reverse().join("/") : ""}</span></p>
            <p className="book-film-detail-title" >Vé : <span style={{ fontWeight: "400" }}>{this.displayTickets(detailTickets)}</span></p>
            <p className="book-film-detail-title" >Combo : <span style={{ fontWeight: "400" }}>{this.displayCombo(detailCombo)}</span></p>
            <p className="book-film-detail-title" >Ghế : <span style={{ fontWeight: "400" }}>{this.displaySeats(detailSeats)}</span></p>
            <p className="book-film-detail-title" >Tổng : <span style={{ fontWeight: "400", fontSize: "2rem", color: "red" }}>{total} VND</span></p>
            <div className="container row" style={{ margin: "0px", marginBottom: "2rem" }}>
              {this.props.bookStep > 1 && this.props.bookStep < 3 ?
                <button style={{ marginRight: "1rem" }} className="btn-book-film col" onClick={() => handlePreBookStep(this.props.bookStep - 1)}><i className="fas fa-long-arrow-alt-left"></i> Quay lại</button> : ""}
              {this.props.bookStep < 3 ?
                <button className="btn-book-film col" onClick={() => changeBookStep(2)}>Tiếp tục <i className="fas fa-long-arrow-alt-right"></i></button> : ""}
              {this.props.bookStep === 3 ?
                <button className="btn-book-film col" onClick={() => handlePay()}>Thanh toán <Icon icon={ic_payment} /></button> : ""}
            </div>
            {this.props.detailSeats.length === 0 && this.state.statusFormOne ? <h2 style={{ color: "red" }}>Vui lòng chọn số lượng ghế!!!</h2> : ""}
            {this.props.detailSeats.length !== this.props.countTickets && this.state.statusForm ? <h2 style={{ color: "red" }}>Vui lòng chọn đủ ghế!!!</h2> : ""}
            <div style={{ height: "2rem", width: "1rem" }}></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FilmDetail;