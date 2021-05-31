
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ic_play_circle_outline} from 'react-icons-kit/md/ic_play_circle_outline'
import Icon from 'react-icons-kit';
import { ClipLoader } from 'react-spinners';

class dialogTrailerComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            open : false
        }
    }
    render(){
        const handleClickOpen=() => {
            this.setState({
                open:true
            })
        }

        const handleClose=() => {
            this.setState({
                open:false
            })
        }

        return (
            <Dialog 
                className="custom-loading-dialog"
                open={this.props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent
                style={{width:"auto", overflow:"hidden",background:"none"}}>
                    <ClipLoader
                    sizeUnit={"px"}
                    size={150}
                    color={'white'}
                    loading={true}
                    />

                </DialogContent>
            </Dialog>
        );
        
    }

}
export default dialogTrailerComponent