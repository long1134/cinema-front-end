import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import * as coockie from "js-cookie"

class CheckInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInfo : coockie.get("userInfo") ? JSON.parse(coockie.get("userInfo")) : ""
        }
    }
    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <div className="col-lg-8 col-11 table-book-item">
                    <h2 style={{ fontSize: "2.5rem", color: "white", marginTop: "2rem"}}><i onClick={()=>this.props.actions.handleBookStep(2)} style={{cursor:"pointer"}} className="fas fa-arrow-left"></i>Thông tin của bạn</h2>
                    <div style={{ background: "white", marginBottom:'1.5rem'}} className="col-12">
                        <div style={{ width: "100%", height: "2rem" }}></div>
                        <div className="col-12"style={{display:"inline-block"}}>
                            <span style={{fontSize:"1.5rem",fontWeight:"400",color:"black"}}>Họ và tên : </span>  
                            <TextField
                                id="standard-name"
                                margin="normal"
                                style={{marginTop:"-0.8rem"}}
                                className="col"
                                value={this.state.userInfo.name}
                            />
                        </div>
                        <div className="col-12 mt-5"style={{display:"inline-block"}}>
                            <span style={{fontSize:"1.5rem",fontWeight:"400",color:"black"}}>Email : </span>  
                            <TextField
                                id="standard-name"
                                margin="normal"
                                style={{marginTop:"-0.8rem"}}
                                className="col"
                                value={this.state.userInfo.email}
                            />
                        </div>
                        <div className="col-12 mt-5 mb-5"style={{display:"inline-block"}}>
                            <span style={{fontSize:"1.5rem",fontWeight:"400",color:"black"}}>Số điện thoại : </span>  
                            <TextField
                                id="standard-name"
                                margin="normal"
                                style={{marginTop:"-0.8rem"}}
                                className="col"
                                value={this.state.userInfo.phone}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CheckInfo;