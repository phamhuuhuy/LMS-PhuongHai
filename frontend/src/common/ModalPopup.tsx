import React, { useState } from "react";
import { TextField, Typography, Modal as ModalMUI, Box } from "@mui/material";

const style = {
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

const Modal: React.FC<{ isOpen: boolean; handleModalClose: () => void }> = ({
  isOpen,
  handleModalClose,
}) => {
  return (
    <ModalMUI
      open={isOpen}
      onClose={() => handleModalClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Thêm thông tin chi tiết cho vật tư hoá chất được thêm
        </Typography>
        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography> */}
        {/* <TextField
          required
          margin="normal"
          name="chemicalModel"
          variant="outlined"
          label="Mã Số"
          fullWidth
          value={chemicalData?.chemicalModel}
          onChange={handleOnChange}
        /> */}
      </Box>
    </ModalMUI>
  );
};

export default Modal;
