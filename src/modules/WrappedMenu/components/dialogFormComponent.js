
import 'date-fns';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import * as validator from "validator"
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { user } from 'react-icons-kit/fa/user'
import Icon from 'react-icons-kit';
import { signOut } from 'react-icons-kit/fa/signOut'
import * as coockie from "js-cookie"

class dialogFormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: coockie.get("userInfo") ? JSON.parse(coockie.get("userInfo")) : "",
            formStatus: true,
            formLoginStatus: true
        }
    }
    render() {
        const checkValidateRegister = () => {
            let data = this.props.data
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
            if (this.state.password !== this.state.repassword) {
                this.setState({ formStatus: false })
                return
            }
            if (phone.length < 10 || phone.length > 11) {
                return this.props.actions.handleFormStatus(false)
            }
            if (!/^\d+$/.test(this.props.data.phone)) {
                this.setState({ formStatus: false })
                return
            }
            this.setState({ formStatus: true })
            return this.props.actions.register(this.props.data)
        }
        const checkValidateLogin = () => {
            let data = this.props.data
            if (data["password"] === "" && data["username"]) {
                return this.setState({
                    formLoginStatus: false
                })
            }
            this.props.actions.login({ username: this.props.data.username, password: this.props.data.password })
            return this.setState({
                formLoginStatus: true
            })
        }
        const handleDateChange = (date) => {
            this.props.actions.handleChangeDate(date)
        }
        const handleClickOpen = () => {
            if (!this.props.userInfo)
                this.props.actions.handleDialog(true)
            else {
                this.props.history.push("/")
                this.props.actions.handleLogout()
            }
        }

        const changeText = (e) => {
            this.props.actions.handleChangeText(e)
        }

        const handleClose = () => {
            this.props.actions.handleDialog(false)
        }
        const { phone, address, password, repassword, email, name, username, login } = this.props.data
        return (
            <div>
                <div className="wrapped-btn-login" variant="outlined" color="primary" onClick={handleClickOpen}>
                    {!(this.props.userInfo === "") ? <div><Icon icon={signOut} /> Signout</div> : <div><Icon icon={user} /> Login</div>}
                </div>
                <Dialog
                    open={this.props.dialogStatus}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="sm"
                >
                    <DialogContent className="trailer-dialog" style={{ width: "100%", height: this.props.typeForm === "login" ? (this.state.formLoginStatus ? "30rem" : "35rem") : this.state.formStatus ? "50rem" : "60rem" }}>
                        <h2 style={{ color: "black", marginBottom: "1rem", fontSize: "2rem" }} className="row">
                            <span className={this.props.typeForm === "login" ? "title-form-dialog-active col-6 col-lg-4" : "title-form-dialog col-6 col-lg-4"} onClick={() => this.props.actions.handleChangeTypeForm("login")}>
                                Đăng Nhập
                            <div className="line"></div>
                            </span>  /
                        <span className={this.props.typeForm === "logout" ? "title-form-dialog-active col col-lg-4" : "title-form-dialog col col-lg-4"} onClick={() => this.props.actions.handleChangeTypeForm("logout")}>
                                Đăng Kí
                            <div className="line"></div>
                            </span>
                        </h2>
                        {this.props.typeForm === "login" ?
                            <form className="row">
                                {this.props.errorStatus ? <div className="col-12" style={{ fontSize: '1.5rem', color: "red" }}>Tên đăng nhập hoặc mật khẩu sai!!!</div> : ""}

                                <div className="col-12">
                                    <TextField
                                        id="standard-uncontrolled"
                                        label="Email/Tên đăng nhập"
                                        margin="normal"
                                        name="username"
                                        style={{ width: "100%" }}
                                        value={this.props.data.username}
                                        onChange={(e) => changeText(e.target)}
                                    />
                                    {!this.state.formLoginStatus && login === "" ? <p style={{ color: "red", fontSize: "1.2rem" }}>Xin vui lòng nhập tên đăng nhập</p> : ""}
                                </div>
                                <div className="col-12">
                                    <TextField
                                        id="standard-uncontrolled"
                                        label="Password"
                                        type="password"
                                        margin="normal"
                                        name="password"
                                        value={this.props.data.password}
                                        onChange={(e) => changeText(e.target)}
                                        style={{ width: "100%" }}
                                    />
                                    {!this.state.formLoginStatus && password === "" ? <p style={{ color: "red", fontSize: "1.2rem" }}>Xin vui lòng nhập password</p> : ""}
                                </div>

                                <div className="col-2 col-lg-3"></div>

                                <Button onClick={() => checkValidateLogin()} className="col-8 col-lg-6" variant="contained" style={{ height: "4rem", fontSize: "1.5rem", marginTop: '3rem' }} color="secondary" >
                                    Đăng nhập
                        </Button>
                            </form> :
                            <form className="row">
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

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                disableToolbar
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
                                    {!this.state.formStatus ? (phone === "" || (phone.length < 10 || phone.length > 11) ? <p style={{ color: "red", fontSize: "1.2rem" }}> Số điện thoại phải từ 10 đến 11 số</p> : (!/^\d+$/.test(this.props.data.phone) ? <p style={{ color: "red", fontSize: "1.2rem" }}>Số điện thoại chỉ có số</p> : "")) : ""}
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
                                <div className="col-12 col-lg-5">
                                    <TextField
                                        id="standard-uncontrolled"
                                        label="Password"
                                        type="password"
                                        margin="normal"
                                        style={{ width: "100%" }}
                                        name="password"
                                        value={this.props.data.password}
                                        onChange={(e) => changeText(e.target)}
                                    />
                                    {!this.state.formStatus ? (password === "" ? <p style={{ color: "red", fontSize: "1.2rem" }}>Vui lòng nhập password</p> : (password.length < 8 ? <p style={{ color: "red", fontSize: "1.2rem" }}>password của bạn phải từ 8 kí tự</p> : "")) : ""}
                                </div>
                                <div className="col">
                                    <TextField
                                        id="standard-uncontrolled"
                                        label="Xác nhận password"
                                        type="password"
                                        margin="normal"
                                        style={{ width: "100%" }}
                                        name="repassword"
                                        value={this.props.data.repassword}
                                        onChange={(e) => changeText(e.target)}
                                    />
                                    {!this.state.formStatus ? (repassword === "" ? <p style={{ color: "red", fontSize: "1.2rem" }}>Vui lòng nhập xác nhận password</p> : (password !== repassword ? <p style={{ color: "red", fontSize: "1.2rem" }}>Password và xác nhận password không chính xác</p> : "")) : ""}
                                </div>

                                <div className="col-12"></div>
                                <div className="col-3"></div>
                                <Button onClick={() => checkValidateRegister()} style={{ height: "4rem", fontSize: "1.5rem", marginTop: '3rem' }} className="col-6 " variant="contained" color="secondary" >
                                    Đăng kí
                                </Button>
                            </form>}
                    </DialogContent>
                </Dialog>
            </div>
        );

    }

}
export default dialogFormComponent