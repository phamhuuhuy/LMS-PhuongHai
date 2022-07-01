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
import {
  Instrument,
  InstrumentError,
  InstrumentStatus,
} from "./Equipment.type";
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
  const [instrumentData, setInstrumentData] = useState<Instrument>({
    instrumentName: "",
    instrumentModel: "",
    instrumentSeriNo: "",
    instrumentBuyDate: null,
    instrumentCalibrationDate: null,
    instrumentNextCalibrationDate: null,
    instrumentStatus: "",
    instrumentProvider: "",
    instrumentServer: true,
  });

  const [errorForm, setErrorForm] = useState<InstrumentError>({});

  // const handleValidation = () => {
  //   console.log(equipmentData);
  //   var error: EquipmentError = {};
  //   var validate = true;

  const handleValidation = () => {
    var error: InstrumentError = {};
    var validate = true;

    if (!instrumentData.instrumentName) {
      error.instrumentName = "Bắt Buộc";
      validate = false;
    }
    if (!instrumentData.instrumentModel) {
      error.instrumentModel = "Bắt Buộc";
      validate = false;
    }
    if (!instrumentData.instrumentSeriNo) {
      error.instrumentSeriNo = "Bắt Buộc";
      validate = false;
    }
    if (!instrumentData.instrumentBuyDate) {
      error.instrumentBuyDate = "Bắt Buộc";
      validate = false;
    }
    if (!instrumentData.instrumentCalibrationDate) {
      error.instrumentCalibrationDate = "Bắt Buộc";
      validate = false;
    } else {
      if (
        Date.parse(instrumentData.instrumentBuyDate || "") >
        Date.parse(instrumentData.instrumentCalibrationDate)
      ) {
        error.instrumentCalibrationDate =
          "Ngày Hiệu Chuẩn Không Được Trước Ngày Mua";
        validate = false;
      }
    }

    if (!instrumentData.instrumentNextCalibrationDate) {
      error.instrumentNextCalibrationDate = "Bắt Buộc";
      validate = false;
    } else {
      if (
        Date.parse(instrumentData.instrumentCalibrationDate || "") >=
        Date.parse(instrumentData.instrumentNextCalibrationDate)
      ) {
        error.instrumentNextCalibrationDate =
          "Ngày Hiệu Chuẩn Kế Tiếp Không Được Trước Ngày Hiệu Chuẩn";
        validate = false;
      }
    }

    if (!instrumentData.instrumentStatus) {
      error.instrumentStatus = "Bắt Buộc";
      validate = false;
    }

    if (!instrumentData.instrumentProvider) {
      error.instrumentProvider = "Bắt Buộc";
      validate = false;
    }

    if (!instrumentData.instrumentSupervisor) {
      error.instrumentSupervisor = "Bắt Buộc";
      validate = false;
    }
    setErrorForm(error);
    return validate;
  };

  const handleOnChange = (event: any) => {
    setInstrumentData({
      ...instrumentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async () => {
    console.log(handleValidation());
    if (handleValidation()) {
      console.log("form", instrumentData);
      try {
        const response = await fetch(
          process.env.REACT_APP_API_BASE + "/instrument",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(instrumentData),
          }
        );
        if (response.status === 201) {
          navigate("/equipment");
        }
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
      }
    }
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
                  name="instrumentName"
                  variant="outlined"
                  label="Tên Thiết Bị"
                  fullWidth
                  value={instrumentData?.instrumentName}
                  onChange={handleOnChange}
                />
                {errorForm?.instrumentName && (
                  <Alert severity="warning">{errorForm.instrumentName}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="instrumentModel"
                  variant="outlined"
                  label="Model"
                  fullWidth
                  value={instrumentData?.instrumentModel}
                  onChange={handleOnChange}
                />
                {errorForm?.instrumentModel && (
                  <Alert severity="warning">{errorForm.instrumentModel}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="instrumentSeriNo"
                  variant="outlined"
                  label="Seri No."
                  fullWidth
                  value={instrumentData?.instrumentSeriNo}
                  onChange={handleOnChange}
                />
                {errorForm?.instrumentSeriNo && (
                  <Alert severity="warning">{errorForm.instrumentSeriNo}</Alert>
                )}

                <LocalizationProvider dateAdapter={MomentAdapter}>
                  <div>
                    <DatePicker
                      label="Ngày Mua"
                      className={classes.root}
                      value={instrumentData.instrumentBuyDate}
                      onChange={(e: any) => {
                        setInstrumentData({
                          ...instrumentData,
                          instrumentBuyDate: e.format("YYYY-MM-DD"),
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    {errorForm?.instrumentBuyDate && (
                      <Alert severity="warning">
                        {errorForm.instrumentBuyDate}
                      </Alert>
                    )}
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <DatePicker
                      label="Ngày Hiệu Chuẩn"
                      value={instrumentData.instrumentCalibrationDate}
                      onChange={(e: any) => {
                        setInstrumentData({
                          ...instrumentData,
                          instrumentCalibrationDate: e.format("YYYY-MM-DD"),
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>

                  {errorForm?.instrumentCalibrationDate && (
                    <Alert severity="warning">
                      {errorForm.instrumentCalibrationDate}
                    </Alert>
                  )}

                  <div style={{ marginTop: "10px" }}>
                    <DatePicker
                      label="Ngày Hiệu Chuẩn Kế Tiếp"
                      value={instrumentData.instrumentNextCalibrationDate}
                      onChange={(e: any) => {
                        setInstrumentData({
                          ...instrumentData,
                          instrumentNextCalibrationDate: e.format("YYYY-MM-DD"),
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>

                  {errorForm?.instrumentNextCalibrationDate && (
                    <Alert severity="warning">
                      {errorForm.instrumentNextCalibrationDate}
                    </Alert>
                  )}
                </LocalizationProvider>

                <TextField
                  required
                  margin="normal"
                  name="instrumentProvider"
                  variant="outlined"
                  label="Thông Tin Nhà Cung Cấp"
                  fullWidth
                  value={instrumentData?.instrumentProvider}
                  onChange={handleOnChange}
                />
                {errorForm?.instrumentProvider && (
                  <Alert severity="warning">
                    {errorForm.instrumentProvider}
                  </Alert>
                )}

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tình Trạng Thiết Bị
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="instrumentStatus"
                    id="demo-simple-select"
                    value={instrumentData?.instrumentStatus}
                    label="Tình Trạng Thiết Bị"
                    onChange={handleOnChange}
                  >
                    <MenuItem value={InstrumentStatus.good}>Tốt</MenuItem>
                    <MenuItem value={InstrumentStatus.bad}>Xấu</MenuItem>
                  </Select>
                </FormControl>
                {errorForm?.instrumentStatus && (
                  <Alert severity="warning">{errorForm.instrumentStatus}</Alert>
                )}

                <TextField
                  margin="normal"
                  name="instrumentSupervisor"
                  variant="outlined"
                  label="Nhân Viên Quản Lí Trực Tiếp"
                  fullWidth
                  value={instrumentData?.instrumentSupervisor}
                  onChange={handleOnChange}
                />
                {errorForm?.instrumentSupervisor && (
                  <Alert severity="warning">
                    {errorForm.instrumentSupervisor}
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
