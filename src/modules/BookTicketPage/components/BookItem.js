import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class BookItem extends Component {
    choseTicket = async (index, value) => {
        this.props.actions.handleTickets({ index, value })
    }
    choseCombo = async (index,value)=>{
        this.props.actions.handleCombo({ index, value })
    }
    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <div className="col-lg-8 col-11 table-book-item" >
                    <p style={{ fontSize: "2.5rem", color: "white", marginTop: "2rem", fontWeight:"400" }}>Chọn vé / Combo</p>
                    <Paper style={{ width: "100%" }}>
                        <Table className="table-item">
                            <TableHead>
                                <TableRow style={{ background: "black", fontSize: "1.5rem" }}>
                                    <TableCell className="book-item-title" align="left" >Loại vé</TableCell>
                                    <TableCell className="book-item-title" align="center">Số lượng</TableCell>
                                    <TableCell className="book-item-title" align="center">Giá(VND)</TableCell>
                                    <TableCell className="book-item-title" align="center">Tổng(VND)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!this.props.dataTickets ? "" : this.props.dataTickets.map((row, index) => (
                                    <TableRow key={row.name}>
                                        <TableCell className="book-item-content" style={{color:"black",fontWeight:"bold"}}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center" style={{padding:"0px"}} className="cell-count">
                                            <i className="fas fa-minus-circle" style={{ fontSize: "2rem", cursor: "pointer" }} onClick={() => this.choseTicket(index, -1)}></i><input value={row.count} style={{ textAlign: "center", width: "20%", margin: "0px 1rem", marginBottom: "1rem", height: "3rem" }} /> <i className="fas fa-plus-circle icon-cell" style={{ fontSize: "2rem", cursor: "pointer" }} onClick={() => this.choseTicket(index, 1)}></i>
                                        </TableCell>
                                        <TableCell className="book-item-content" align="center">{row.price}</TableCell>
                                        <TableCell className="book-item-content" align="center">{row.total}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>

                    <Paper style={{ marginBottom: "2rem" }}>
                        <Table >
                            <TableHead>
                                <TableRow style={{ background: "black", fontSize: "1.5rem" }} className="row">
                                    <TableCell className="book-item-title" align="left" >Combo</TableCell>
                                    <TableCell className="book-item-title" align="center">Số lượng</TableCell>
                                    <TableCell className="book-item-title" align="center">Giá(VND)</TableCell>
                                    <TableCell className="book-item-title" align="center">Tổng(VND)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!this.props.dataCombo ? "" : this.props.dataCombo.map((row, index) => (
                                    <TableRow key={row.name}>
                                        <TableCell className="book-item-content" style={{maxWidth:"10rem"}}>
                                            <p style={{color:"black",fontWeight:"bold"}}>{row.name}</p>
                                            <p style={{color:"black"}}>{row.detail}</p>
                                        </TableCell>
                                        <TableCell align="center" style={{padding:"0px"}} className="cell-count">
                                            <i className="fas fa-minus-circle btn-book-item-table"  onClick={() => this.choseCombo(index, -1)}></i>
                                            <input value={row.count} style={{ textAlign: "center", width: "20%", margin: "0px 1rem", marginBottom: "1rem", height: "3rem" }} /> 
                                            <i className="fas fa-plus-circle icon-cell btn-book-item-table"  onClick={() => this.choseCombo(index, 1)}></i>
                                        </TableCell>
                                        <TableCell className="book-item-content" align="center">{row.price}</TableCell>
                                        <TableCell className="book-item-content" align="center">{row.total}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default BookItem;