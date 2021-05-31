
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Skeleton from '@material-ui/lab/Skeleton';
import api from '../../../services/api'

class dialogDetailTicket extends Component {
    constructor(props){
        super(props)
        this.state = {
            open : this.props.dialogStatus,
            loaded : false
        }
    }
    render(){
        console.log(this.props)

        const handleClose=() => {
            this.props.handleDialog(false)
        }
        const {ticket} = this.props

        return JSON.stringify(ticket) !== JSON.stringify({}) ? (
            <Dialog
                open={this.props.dialogStatus}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xl"
            >
                <DialogContent
                className="row dialog-detail-ticket">
                    {!this.state.loaded ? 
                    <Skeleton variant="rect" className="col-sm-3 col-md-3 img-dialog-detail-ticket" style={{position:"absolute"}} /> : null}
                    <img src={api.urlImg + ticket.img} className="col-sm-3 col-md-3 img-dialog-detail-ticket" onLoad={e=> this.setState({loaded : true})} />
                    <div className="col-12 col-md-6" style={{color:"black"}}>
                        <p style={{fontSize:"2rem",color:"black",fontWeight:"bold"}}>{ticket.filmName}</p>
                        <p style={{color:"black",fontSize:"1.5rem"}}>Rạp : <span style={{fontWeight:"bold"}}>{ticket.cinemaName}</span></p>
                        <p style={{color:"black",fontSize:"1.5rem"}}>Ngày chiếu : <span style={{fontWeight:"bold"}}>{ticket !== {} ? (ticket.timeShow + " "+ticket.dayShow.split("/").reverse().join("/")) : ""}</span></p>
                        <p style={{color:"black",fontSize:"1.5rem"}}>Chỗ ngồi : <span style={{fontWeight:"bold"}}>{ticket.seatName}</span></p>
                        <p style={{color:"black",fontSize:"1.5rem"}}>Chi tiết vé : </p>
                        {ticket.seatsDetail.map(e =>{
                        return( <p style={{color:"black",fontSize:"1.5rem",fontWeight:"bold"}}>{e.name} ({e.count}) : {e.total}</p>) }) }
                        <p style={{color:"black",fontSize:"1.5rem"}}>Chi tiết combo : </p>
                        {ticket.foodsDetail.length === 0 ? <p style={{color:"red",fontSize:"1.5rem"}}> Quý khách không sử dụng combo</p> : ticket.foodsDetail.map(e =>{
                        return( <p style={{color:"black",fontSize:"1.5rem",fontWeight:"bold"}}>{e.name} ({e.count}) : {e.total}</p>) }) }
                        <p style={{color:"black",fontSize:"1.5rem"}}>Tổng tiền : <span style={{fontWeight:"bold"}}>{ticket.price} đ</span></p>
                        <p style={{color:"black",fontSize:"1.5rem"}}>Tổng điểm : <span style={{fontWeight:"bold"}}>{ticket.price/1000}</span></p>
                    </div>
                </DialogContent>
            </Dialog>
        ) : "";
        
    }

}
export default dialogDetailTicket