import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DialogAlert = ({ openDialog, handleClose, id, msg, item }: any) => {
  const handleOnClose = () => {
    handleClose(false);
  };

  const handleDeleteUser = async () => {
    handleClose(false);
    if (id !== "") {
      try {
        const response = await fetch(process.env.REACT_APP_API_BASE+`/${item}/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        window.location.reload();
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
      }
    }
  };
  return (
    <Dialog
      open={openDialog}
      onClose={handleOnClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Cảnh Báo</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>Không</Button>
        <Button onClick={handleDeleteUser} autoFocus>
          Có
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlert;
