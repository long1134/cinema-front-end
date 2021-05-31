
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ic_play_circle_outline } from 'react-icons-kit/md/ic_play_circle_outline'
import Icon from 'react-icons-kit';

class dialogTrailerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    render() {
        const handleClickOpen = () => {
            this.setState({
                open: true
            })
        }
        console.log(this.props)

        const handleClose = () => {
            this.setState({
                open: false
            })
        }
        const { trailer } = this.props

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    <Icon className="icon-play" style={{ position: "absolute", color: "#ffffffa8", zIndex: "10", background: "#0000009e", borderRadius: "50%" }} size={'100%'} icon={ic_play_circle_outline} />
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="xl"
                >
                    <DialogContent
                        className="trailer-dialog">
                        <iframe width="100%" height="100%" src={trailer} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </DialogContent>
                </Dialog>
            </div>
        );

    }

}
export default dialogTrailerComponent