import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const ModelPopUp: React.FC<any> = ({
  isOpen,
  handleModalClose,
  handleOnChange,
  dataForm,
  handleOnSubmit,
}) => {
  const style = {
    borderRadius: "2px",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "400px",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => handleModalClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          style={{ fontSize: "23px" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Công việc
        </Typography>
        <TextField
          required
          margin="normal"
          name="taskName"
          variant="outlined"
          label="Tên Công Việc"
          fullWidth
          value={dataForm?.taskName}
          onChange={handleOnChange}
        />
        <TextField
          required
          margin="normal"
          name="taskNote"
          variant="outlined"
          label="Ghi chú công việc"
          fullWidth
          value={dataForm?.taskNote}
          onChange={handleOnChange}
        />

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={handleOnSubmit}
          >
            Thêm Công Việc
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
