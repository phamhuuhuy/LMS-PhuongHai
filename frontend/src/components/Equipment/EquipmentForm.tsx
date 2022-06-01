import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Equipment, EquipmentError, EquipmentStatus } from "./Equipment.type";
import MomentAdapter from "@material-ui/pickers/adapter/moment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { makeStyles } from "@mui/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const useStyles = makeStyles({
  root: {
    "& .MuiFormControl-root": {
      backgroundColor: "red",
    },
  },
});

const EquipmentForm: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [equipmentData, setEquipmentData] = useState<Equipment>({
    equipmentName: "",
    equipmentModel: "",
    seriNumber: "",
    dateBuy: null,
    dateCalibrate: null,
    dateRecalibrate: null,
    equipmentStatus: "",
    infoProvider: "",
    employeeManagement: "",
  });

  const [errorForm, setErrorForm] = useState<EquipmentError>({});

  const [age, setAge] = useState("");

  const handleValidation = () => {
    console.log(equipmentData);
    var error: EquipmentError = {};
    var validate = true;

    if (!equipmentData.equipmentName) {
      error.equipmentName = "Bắt Buộc";
      validate = false;
    }
    if (!equipmentData.equipmentModel) {
      error.equipmentModel = "Bắt Buộc";
      validate = false;
    }
    if (!equipmentData.seriNumber) {
      error.seriNumber = "Bắt Buộc";
      validate = false;
    }
    if (!equipmentData.dateBuy) {
      error.dateBuy = "Bắt Buộc";
      validate = false;
    }
    if (!equipmentData.dateCalibrate) {
      error.dateCalibrate = "Bắt Buộc";
      validate = false;
    }

    if (!equipmentData.dateRecalibrate) {
      error.dateRecalibrate = "Bắt Buộc";
      validate = false;
    }

    if (!equipmentData.equipmentStatus) {
      error.equipmentStatus = "Bắt Buộc";
      validate = false;
    }

    if (!equipmentData.infoProvider) {
      error.infoProvider = "Bắt Buộc";
      validate = false;
    }

    if (!equipmentData.employeeManagement) {
      error.employeeManagement = "Bắt Buộc";
      validate = false;
    }
    setErrorForm(error);
    return validate;
  };

  const handleOnChange = (event: any) => {
    setEquipmentData({
      ...equipmentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async () => {
    //   if (handleValidation()) {
    //     try {
    //       const response = await fetch("http://localhost:5000/customer", {
    //         method: "POST",
    //         headers: {
    //           "Content-type": "application/json",
    //         },
    //         body: JSON.stringify(customerData),
    //       });
    //       console.log(response);
    //       if (response.status === 201) {
    //         navigate("/customer");
    //       }
    //     } catch (error) {
    //       if (error instanceof Error) {
    //         throw error.message;
    //       }
    //     }
    //   }
    handleValidation();
    console.log(equipmentData);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} style={{ height: "100%" }}>
      <Grid container spacing={3} style={{ height: "100%", overflowY: "auto" }}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            style={{ height: "100%" }}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "40%",
              }}
            >
              <Typography component="h1" variant="h5">
                Thêm Thiết Bị
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  required
                  autoComplete="name"
                  autoFocus
                  margin="normal"
                  name="equipmentName"
                  variant="outlined"
                  label="Tên Thiết Bị"
                  fullWidth
                  value={equipmentData?.equipmentName}
                  onChange={handleOnChange}
                />
                {errorForm?.equipmentName && (
                  <Alert severity="warning">{errorForm.equipmentName}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="equipmentModel"
                  variant="outlined"
                  label="Model"
                  fullWidth
                  value={equipmentData?.equipmentModel}
                  onChange={handleOnChange}
                />
                {errorForm?.equipmentModel && (
                  <Alert severity="warning">{errorForm.equipmentModel}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="seriNumber"
                  variant="outlined"
                  label="Seri No."
                  fullWidth
                  value={equipmentData?.seriNumber}
                  onChange={handleOnChange}
                />
                {errorForm?.seriNumber && (
                  <Alert severity="warning">{errorForm.seriNumber}</Alert>
                )}

                <LocalizationProvider dateAdapter={MomentAdapter}>
                  <div>
                    <DatePicker
                      label="Ngày Mua"
                      className={classes.root}
                      value={equipmentData.dateBuy}
                      onChange={(e: any) => {
                        console.log(e.format("MM/DD/YYYY"));
                        setEquipmentData({
                          ...equipmentData,
                          dateBuy: e.format("MM/DD/YYYY"),
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    {errorForm?.dateBuy && (
                      <Alert severity="warning">{errorForm.dateBuy}</Alert>
                    )}
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <DatePicker
                      label="Ngày Hiệu Chuẩn"
                      value={equipmentData.dateCalibrate}
                      onChange={(e: any) => {
                        console.log(e.format("MM/DD/YYYY"));
                        setEquipmentData({
                          ...equipmentData,
                          dateCalibrate: e.format("MM/DD/YYYY"),
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>

                  {errorForm?.dateCalibrate && (
                    <Alert severity="warning">{errorForm.dateCalibrate}</Alert>
                  )}

                  <div style={{ marginTop: "10px" }}>
                    <DatePicker
                      label="Ngày Hiệu Chuẩn Kế Tiếp"
                      value={equipmentData.dateRecalibrate}
                      onChange={(e: any) => {
                        console.log(e.format("MM/DD/YYYY"));
                        setEquipmentData({
                          ...equipmentData,
                          dateRecalibrate: e.format("MM/DD/YYYY"),
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>

                  {errorForm?.dateRecalibrate && (
                    <Alert severity="warning">
                      {errorForm.dateRecalibrate}
                    </Alert>
                  )}
                </LocalizationProvider>

                <TextField
                  required
                  margin="normal"
                  name="infoProvider"
                  variant="outlined"
                  label="Thông Tin Nhà Cung Cấp"
                  fullWidth
                  value={equipmentData?.infoProvider}
                  onChange={handleOnChange}
                />
                {errorForm?.infoProvider && (
                  <Alert severity="warning">{errorForm.infoProvider}</Alert>
                )}

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tình Trạng Thiết Bị
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="equipmentStatus"
                    id="demo-simple-select"
                    value={equipmentData?.equipmentStatus}
                    label="Tình Trạng Thiết Bị"
                    onChange={handleOnChange}
                  >
                    <MenuItem value={EquipmentStatus.good}>Tốt</MenuItem>
                    <MenuItem value={EquipmentStatus.bad}>Xấu</MenuItem>
                  </Select>
                </FormControl>
                {errorForm?.equipmentStatus && (
                  <Alert severity="warning">{errorForm.equipmentStatus}</Alert>
                )}

                <TextField
                  margin="normal"
                  name="employeeManagement"
                  variant="outlined"
                  label="Nhân Viên Quản Lí Trực Tiếp"
                  fullWidth
                  value={equipmentData?.employeeManagement}
                  onChange={handleOnChange}
                />
                {errorForm?.employeeManagement && (
                  <Alert severity="warning">
                    {errorForm.employeeManagement}
                  </Alert>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", marginTop: "20px" }}
                  onClick={handleOnSubmit}
                >
                  Thêm Thiết Bị
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EquipmentForm;
