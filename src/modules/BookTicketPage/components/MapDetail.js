import React, { Component } from 'react';
import io from "socket.io-client"

class MapDetail extends Component {
    displaySeats = (alphabet,mapSeat) => {
        if (JSON.stringify(mapSeat) === JSON.stringify([]))
            return ""
        return mapSeat.map((seats,indexAlpha) => seats.map((seat, index) => {
            return <div style={{ width: "10%", height: "4rem" }} key={index}>
                <button onClick={()=>this.choseSeat(alphabet[indexAlpha] + (index % 10 + 1),[indexAlpha,index])} style={{ background: seat === 0 ? "#dbdee1" : seat === 1 ? "#28a745" : "red", color:seat === 0 ?  "black":"white" , border: "none", outline: "none", width: "80%", height: "3rem", cursor:"pointer" }} disabled={seat === 1}>{index % 10 + 1}</button>
            </div>
        }))
    }
    displayAlpha = (alphabet, mapSeat) => {
        if (JSON.stringify(mapSeat) === JSON.stringify([]))
            return ""
        return mapSeat.map((seats, index) =>
            <div style={{ width: "10%", height: "4rem" }} key={index}>
                <button style={{ background: "white", border: "1px solid black", outline: "none", width: "80%", height: "3rem" }}>{alphabet[index]}</button>
            </div>
        )
    }
    choseSeat=(seatName, seatNumber)=>{
        this.props.actions.handleSeat({seatName,seatNumber})
    }
    render() {
        console.log(this.props)
        const mapSeat = this.props.showtimes ? this.props.map : []
        const alpha = [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "Q", "Z", "Y", "Z"
        ]
        return (
            <React.Fragment>
                <div className="col-lg-8 col-11 table-book-item">
                    <h2 style={{ fontSize: "2.5rem", color: "white", marginTop: "2rem"}}><i onClick={()=>this.props.actions.handleBookStep(1)} style={{cursor:"pointer"}} className="fas fa-arrow-left"></i> Chọn ghế</h2>
                    <div style={{ background: "white", marginBottom:'1.5rem'}} className="col-12">
                        <div className="col-5" style={{position:"absolute",top:"12.2rem",left:"20%"}}>
                            {this.displayAlpha(alpha, mapSeat)}
                        </div>
                        <div className="container col-6">
                            <div style={{ width: "100%", height: "2rem" }}></div>
                            <div className="container">
                                <div style={{ height: "1rem", width: "100%", background: "#00000063", marginTop: "2rem" }}></div>
                                <p style={{ color: "black", textAlign: "center", fontSize: "1.5rem" }}>Màn hình</p>
                            </div>
                            <div className="row" style={{ width: "100%", textAlign: 'center', margin: "0px", marginTop: "5rem" }}>
                                {this.displaySeats(alpha,mapSeat)}
                            </div>
                            <div style={{ width: "100%", height: "2rem" }}></div>
                        </div>
                        <div className="col-10 container">
                            <div className="row">
                                <div className="col">
                                    <span style={{fontSize:"1.5rem"}}>Ghế trống : </span>
                                    <button style={{background:"#dbdee1",width:"2rem",height:"2rem",border:"none",outline:"none"}}></button>
                                </div>
                                <div className="col">
                                    <span style={{fontSize:"1.5rem"}}>Ghế đang chọn : </span>
                                    <button style={{background:"red",width:"2rem",height:"2rem",border:"none",outline:"none"}}></button>
                                </div>
                                <div className="col">
                                    <span style={{fontSize:"1.5rem"}}>Ghế đã chọn : </span>
                                    <button style={{background:"#28a745",width:"2rem",height:"2rem",border:"none",outline:"none"}}></button>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "100%", height: "2rem" }}></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MapDetail;