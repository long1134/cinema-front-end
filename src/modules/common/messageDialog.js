import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(props.openDialog);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.handleDialog(false)
    setOpen(false);
  };

  return (
    <div>
      <Dialog 
        className="custom-message-dialog"
        open={props.openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontSize:"1.5rem", color:"black"}}>
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{fontSize:"1.2rem"}} color="primary" autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}