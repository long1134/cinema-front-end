import 'date-fns';
import React, { Component } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import * as validator from "validator"
import * as coockie from "js-cookie"
import Button from '@material-ui/core/Button';
import MessageDialog from "../../common/messageDialog"

class InfoMember extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: coockie.get("userInfo") ? JSON.parse(coockie.get("userInfo")) : "",
      formStatus: true,
      formLoginStatus: true,
      openDialog : false
    }
  }
  render() {
    const handleDialog=(status)=>{
      this.setState({openDialog : status})
    }
    const changeText = (e) => {
      this.props.actions.handleChangeText(e)
    }
    const handleDateChange = (date) => {
      this.props.actions.handleChangeDate(date)
    }
    const { phone, address, email, name, username } = this.props.data
    const saveInfo = ()=>{
      let data = this.props.data
      console.log(!validator.isEmail(email))
      for (let i in data) {
          if (data[i] === "") {
              this.setState({ formStatus: false })
              return
          }
      }
      if (!validator.isEmail(data["email"])) {
          this.setState({ formStatus: false })
          return
      }
      if (!/^\d+$/.test(this.props.data.phone)) {
          this.setState({ formStatus: false })
          return
      }
      this.setState({ formStatus: true, openDialog : true })
      return this.props.actions.saveInfo({token : coockie.get("token"),data:this.props.data})
    }
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12 row" style={{background:"#282e34", margin:"0px", marginTop:"2rem"}}>
              <div className="col-6 pt-4">
                <span style={{fontSize:"1.8rem",color:"white",background:"#282e34"}}>Xin chào <span style={{color:"#cdc197"}}>{this.props.data.name}</span>! </span>
              </div>
              <div className="col-5 pt-4">
                <span style={{fontSize:"1.8rem",color:"#ffffffb0", float:"right"}}>Cấp độ thành viên | <span style={{color:"#cdc197"}}>{this.props.data.level}</span></span>
              </div>
              <div className="col-12 col-md-5 pb-4 mt-2">
                <span style={{fontSize:"1.8rem",color:"white"}}>Điểm tích lũy : <span style={{color:"#cdc197"}}>{this.props.data.point}</span></span>
              </div>
            </div>
            <div className="col-12">
              <TextField
                id="standard-uncontrolled"
                label="Họ tên"
                margin="normal"
                style={{ width: "100%" }}
                name="name"
                value={this.props.data.name}
                onChange={(e) => changeText(e.target)}
              />
              {!this.state.formStatus && name === "" ? <p style={{ color: "red", fontSize: "1.2rem" }}>Xin vui lòng nhập họ tên của bạn</p> : ""}
            </div>
            <div className="col-12 col-lg-5">

              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Ngày sinh của bạn"
                    value={this.props.data.birth}
                    onChange={e => handleDateChange(e)}
                    autoOk={true}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <div className="col">
              <TextField
                id="standard-uncontrolled"
                label="Số điện thoại"
                margin="normal"
                style={{ width: "100%" }}
                name="phone"
                value={phone}
                onChange={(e) => changeText(e.target)}
              />
              {!this.state.formStatus ? (phone === "" || (phone.length < 10 && phone.length > 11) ? <p style={{ color: "red", fontSize: "1.2rem" }}> Số điện thoại phải từ 10 đến 11 số</p> : (!/^\d+$/.test(this.props.data.phone) ? <p style={{ color: "red", fontSize: "1.2rem" }}>Số điện thoại chỉ có số</p> : "")) : ""}
            </div>
            <div className="col-12"></div>
            <div className="col-12">
              <TextField
                id="standard-uncontrolled"
                label="Địa chỉ"
                margin="normal"
                style={{ width: "100%" }}
                name="address"
                value={this.props.data.address}
                onChange={(e) => changeText(e.target)}
              />
              {!this.state.formStatus && address === "" ? <p style={{ color: "red", fontSize: "1.2rem" }}>Xin vui lòng nhập địa chỉ</p> : ""}
            </div>
            <div className="col-12 col-lg-5">
              <TextField
                id="standard-uncontrolled"
                label="Tên đăng nhập"
                margin="normal"
                name="username"
                style={{ width: "100%" }}
                value={this.props.data.username}
                onChange={(e) => changeText(e.target)}
              />
              {!this.state.formStatus ? (username === "" ? <p style={{ color: "red", fontSize: "1.2rem" }}>Vui lòng nhập Tên đăng nhập</p> : (username.length < 8 ? <p style={{ color: "red", fontSize: "1.2rem" }}>Tên đăng nhập phải từ 8 kí tự</p> : "")) : ""}
            </div>
            <div className="col">
              <TextField
                id="standard-uncontrolled"
                label="Email"
                margin="normal"
                name="email"
                style={{ width: "100%" }}
                value={this.props.data.email}
                onChange={(e) => changeText(e.target)}
              />
              {!this.state.formStatus ? (email === "" ? <p style={{ color: "red", fontSize: "1.2rem" }}>Vui lòng nhập địa chỉ email</p> : (!validator.isEmail(email) ? <p style={{ color: "red", fontSize: "1.2rem" }}>Email bạn nhập không chính xác</p> : "")) : ""}
            </div>
            <div className="col-12"></div>
            <div className="col-2 ">
              <Button onClick={()=>saveInfo()} style={{ height: "4rem", fontSize: "1.5rem", marginTop: '3rem', width:"15rem", background:"red",color:"white" }} variant="contained" >
                Lưu lại
              </Button>
              <MessageDialog message="Lưu thông tin thành công" handleDialog={handleDialog} openDialog={this.state.openDialog} />
            </div>

          </div>

        </div>
      </React.Fragment>)
  }
}

export default InfoMember;