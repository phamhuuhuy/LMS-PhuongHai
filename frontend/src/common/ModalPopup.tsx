import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Typography,
  Modal as ModalMUI,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";
import Spinner from "./Spinner";
import { NotificationContext } from "../components/System/Method/MethodDetail";
import { setHeader } from "./utils/common";

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

const Modal: React.FC<{
  isOpen: boolean;
  handleModalClose: () => void;
  chosenChemical?: {
    id: string;
    name: string;
  };
  chosenInstrument?: {
    id: string;
    name: string;
  };
  chosenMethod: string;
}> = ({
  isOpen,
  handleModalClose,
  chosenChemical,
  chosenInstrument,
  chosenMethod,
}) => {
  const [dataForm, setDataForm] = useState<any>({
    note: "",
    quantity: "",
  });

  const { isDisplayNoti, setIsDisplayNoti } = useContext(NotificationContext);

  const [pageState, setPageState] = useState<{
    loading: boolean;
    data: any | undefined;
    error: boolean | any;
  }>({ loading: false, error: false, data: undefined });

  const [errorForm, setErrorForm] = useState<any>({});

  const handleOnChange = (event: any) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidation = () => {
    var error: any = {};
    var validate = true;
    var reg = new RegExp("^[0-9]+$");

    if (!reg.test(dataForm.quantity)) {
      error.quantity = "Chỉ nhập số";
      validate = false;
    }

    if (!dataForm.note) {
      error.note = "Bắt Buộc";
      validate = false;
    }
    if (!dataForm.quantity) {
      error.quantity = "Bắt Buộc";
      validate = false;
    }

    setErrorForm(error);
    return validate;
  };

  const handleOnSubmit = async () => {
    if (handleValidation()) {
      const requestBodyChemical = {
        ...dataForm,
        methodId: chosenMethod,
        chemicalId: chosenChemical?.id,
        quantity: Number(dataForm.quantity),
      };

      const requestBodyInstrument = {
        ...dataForm,
        methodId: chosenMethod,
        instrumentId: chosenInstrument?.id,
        quantity: Number(dataForm.quantity),
      };

      var response;
      try {
        setPageState({ ...pageState, loading: true });
        const endPointChemical =
          process.env.REACT_APP_API_BASE + "/chemical-method";
        const endPointInstrument =
          process.env.REACT_APP_API_BASE + "/instrument-method";
        if (chosenChemical) {
          response = await axios.post(
            endPointChemical,
            requestBodyChemical,
            setHeader()
          );
        } else {
          response = await axios.post(
            endPointInstrument,
            requestBodyInstrument,
            setHeader()
          );
        }
        setPageState({ ...pageState, loading: false, data: response.data.msg });
        setDataForm({
          note: "",
          quantity: "",
        });
        handleModalClose();
        setIsDisplayNoti(!isDisplayNoti);
      } catch (error: any) {
        setPageState({ ...pageState, error: error.message });
      }
    }
  };

  return (
    <ModalMUI
      open={isOpen}
      onClose={() => handleModalClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {pageState.loading && <Spinner />}
        {pageState.error && <div>{pageState.error}</div>}
        <Typography
          style={{ fontSize: "23px" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Thêm thông tin chi tiết cho{" "}
          {chosenChemical ? "vật tư hoá chất" : "thiết bị"} được thêm
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span style={{ fontWeight: "bold" }}>
            {chosenChemical ? "Vật tư hoá chất" : "Thiết bị"} đã chọn:{" "}
          </span>
          {chosenChemical ? chosenChemical?.name : chosenInstrument?.name}
        </Typography>
        <TextField
          required
          margin="normal"
          name="note"
          variant="outlined"
          label="Ghi chú"
          fullWidth
          value={dataForm?.note}
          onChange={handleOnChange}
        />
        {errorForm?.note && <Alert severity="warning">{errorForm.note}</Alert>}

        <TextField
          required
          margin="normal"
          name="quantity"
          variant="outlined"
          label="Số lượng"
          fullWidth
          value={dataForm?.quantity}
          onChange={handleOnChange}
        />
        {errorForm?.quantity && (
          <Alert severity="warning">{errorForm.quantity}</Alert>
        )}

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ width: "60%", marginTop: "20px" }}
            onClick={handleOnSubmit}
          >
            Thêm {chosenChemical ? "vật tư hoá chất" : "thiết bị"}
          </Button>
        </div>
      </Box>
    </ModalMUI>
  );
};

export default Modal;
