import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DialogAlert = ({ openDialog, handleClose, id }: any) => {
  const handleOnClose = () => {
    handleClose(false);
  };

  const handleDeleteUser = async () => {
    handleClose(false);
    console.log(id);
    if (id !== "") {
      try {
        const response = await fetch(`http://localhost:5000/customer/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        console.log(result);
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
          Bạn có chắc muốn xoá user này ?
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
