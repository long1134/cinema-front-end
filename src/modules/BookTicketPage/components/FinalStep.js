import React, { Component } from 'react';
import * as coockie from "js-cookie"
import imgMessage from "../../../assets/img/img_thanks.png"
import Button from '@material-ui/core/Button';

class FinalStep extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-12 row">
                    <div className="col-12 col-md-6">
                        <h1 style={{color:"red"}}>Hân hạnh cảm ơn vì đã sử dụng dịch vụ của chúng tôi</h1>
                        <p style={{color:"black",fontSize:"1.5rem"}}>Hãy kiểm tra email của bạn để xem chi tiết vé xem phim</p>
                        <p style={{color:"black",fontSize:"1.5rem"}}>Mọi đóng, ý kiến thắc mắc vui lòng liên hệ : </p>
                        <p style={{color:"black",fontSize:"1.5rem"}}>Số điện thoại : 0778722539</p>
                        <p style={{color:"black",fontSize:"1.5rem"}}>Email : longnguyenngocthanh99@gmail.com</p>
                        <Button variant="contained" color="secondary" style={{fontSize:"1.5rem"}} onClick={() => this.props.history.push("/")}>
                            Trang chủ
                        </Button>
                    </div>
                    <img alt="img message" className="col-12 col-md-6" src={imgMessage} />
                </div>
            </React.Fragment>
        );
    }
}

export default FinalStep;