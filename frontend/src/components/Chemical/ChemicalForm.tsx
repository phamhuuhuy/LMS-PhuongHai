import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Paper } from "@mui/material";
import { Chemical, ChemicalError } from "./Chemical.type";
import MomentAdapter from "@material-ui/pickers/adapter/moment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const ChemicalForm: React.FC = () => {
  const [chemicalData, setChemicalData] = useState<Chemical>({
    chemicalName: "",
    chemicalModel: "",
    chemicalUnit: "",
    chemicalImportDate: null,
    chemicalQuantity: "",
    chemicalDueDate: null,
    chemicalExportDate: null,
    chemicalReceiver: "",
  });

  const [errorForm, setErrorForm] = useState<ChemicalError>({});

  const handleValidation = () => {
    console.log(chemicalData);
    var error: ChemicalError = {};
    var validate = true;
    var reg = new RegExp("^[0-9]+$");

    if (!reg.test(chemicalData.chemicalQuantity)) {
      error.chemicalQuantity = "Chỉ nhập số";
      validate = false;
    }

    if (!chemicalData.chemicalName) {
      error.chemicalName = "Bắt Buộc";
      validate = false;
    }
    if (!chemicalData.chemicalModel) {
      error.chemicalModel = "Bắt Buộc";
      validate = false;
    }
    if (!chemicalData.chemicalUnit) {
      error.chemicalUnit = "Bắt Buộc";
      validate = false;
    }
    if (!chemicalData.chemicalImportDate) {
      error.chemicalImportDate = "Bắt Buộc";
      validate = false;
    }
    if (!chemicalData.chemicalQuantity) {
      error.chemicalQuantity = "Bắt Buộc";
      validate = false;
    }

    if (!chemicalData.chemicalDueDate) {
      error.chemicalDueDate = "Bắt Buộc";
      validate = false;
    }

    if (!chemicalData.chemicalExportDate) {
      error.chemicalExportDate = "Bắt Buộc";
      validate = false;
    }

    if (!chemicalData.chemicalReceiver) {
      error.chemicalReceiver = "Bắt Buộc";
      validate = false;
    }

    setErrorForm(error);
    return validate;
  };

  const handleOnChange = (event: any) => {
    setChemicalData({
      ...chemicalData,
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
    console.log(chemicalData);
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
                Thêm Vật Tư
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  required
                  autoComplete="name"
                  autoFocus
                  margin="normal"
                  name="chemicalName"
                  variant="outlined"
                  label="Tên Vật Tư"
                  fullWidth
                  value={chemicalData?.chemicalName}
                  onChange={handleOnChange}
                />
                {errorForm?.chemicalName && (
                  <Alert severity="warning">{errorForm.chemicalName}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="chemicalModel"
                  variant="outlined"
                  label="Mã Số"
                  fullWidth
                  value={chemicalData?.chemicalModel}
                  onChange={handleOnChange}
                />
                {errorForm?.chemicalModel && (
                  <Alert severity="warning">{errorForm.chemicalModel}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="chemicalUnit"
                  variant="outlined"
                  label="Đơn Vị Tính"
                  fullWidth
                  value={chemicalData?.chemicalUnit}
                  onChange={handleOnChange}
                />
                {errorForm?.chemicalUnit && (
                  <Alert severity="warning">{errorForm.chemicalUnit}</Alert>
                )}

                <LocalizationProvider dateAdapter={MomentAdapter}>
                  <div>
                    <DatePicker
                      label="Ngày Nhập"
                      value={chemicalData?.chemicalImportDate}
                      onChange={(e: any) => {
                        console.log(e.format("MM/DD/YYYY"));
                        setChemicalData({
                          ...chemicalData,
                          chemicalImportDate: e.format("MM/DD/YYYY"),
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    {errorForm?.chemicalImportDate && (
                      <Alert severity="warning">
                        {errorForm.chemicalImportDate}
                      </Alert>
                    )}
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <DatePicker
                      label="Hạn Sử Dụng"
                      value={chemicalData?.chemicalDueDate}
                      onChange={(e: any) => {
                        console.log(e.format("MM/DD/YYYY"));
                        setChemicalData({
                          ...chemicalData,
                          chemicalDueDate: e.format("MM/DD/YYYY"),
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>

                  {errorForm?.chemicalDueDate && (
                    <Alert severity="warning">
                      {errorForm.chemicalDueDate}
                    </Alert>
                  )}

                  <div style={{ marginTop: "10px" }}>
                    <DatePicker
                      label="Ngày Xuất Kho"
                      value={chemicalData?.chemicalExportDate}
                      onChange={(e: any) => {
                        console.log(e.format("MM/DD/YYYY"));
                        setChemicalData({
                          ...chemicalData,
                          chemicalExportDate: e.format("MM/DD/YYYY"),
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>

                  {errorForm?.chemicalExportDate && (
                    <Alert severity="warning">
                      {errorForm.chemicalExportDate}
                    </Alert>
                  )}
                </LocalizationProvider>

                <TextField
                  required
                  margin="normal"
                  name="chemicalQuantity"
                  variant="outlined"
                  label="Số Lượng"
                  fullWidth
                  value={chemicalData?.chemicalQuantity}
                  onChange={handleOnChange}
                />
                {errorForm?.chemicalQuantity && (
                  <Alert severity="warning">{errorForm.chemicalQuantity}</Alert>
                )}

                <TextField
                  required
                  margin="normal"
                  name="chemicalReceiver"
                  variant="outlined"
                  label="Người Nhận"
                  fullWidth
                  value={chemicalData?.chemicalReceiver}
                  onChange={handleOnChange}
                />
                {errorForm?.chemicalReceiver && (
                  <Alert severity="warning">{errorForm.chemicalReceiver}</Alert>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", marginTop: "20px" }}
                  onClick={handleOnSubmit}
                >
                  Thêm Vật Tư
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChemicalForm;
