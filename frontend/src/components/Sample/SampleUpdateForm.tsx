import React from "react";
import { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Sample } from "./Sample.type";
import MomentAdapter from "@material-ui/pickers/adapter/moment";

import { setHeader } from "../../common/utils/common";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/lab";

const SampleUpdateForm: React.FC = () => {
  const navigate = useNavigate();
  let { sampleId } = useParams();

  const [sampleData, setSampleData] = useState<any>({
    sampleName: "",
    sampleReceivedDate: null,
    sampleReturnedResultDate: null,
    sampleNote: "",
    sampleStatus: "",
    labId: "",
    customerId: "",
  });

  const [customerList, setCustomerList] = useState([]);
  const [labList, setLabList] = useState([]);

  const [errorForm, setErrorForm] = useState<any>({});

  const handleValidation = () => {
    var error: any = {};
    var validate = true;
    if (!sampleData.sampleName) {
      error.sampleName = "Bắt Buộc";
      validate = false;
    }
    if (!sampleData.sampleNote) {
      error.sampleNote = "Bắt Buộc";
      validate = false;
    }
    if (!sampleData.sampleStatus) {
      error.sampleStatus = "Bắt Buộc";
      validate = false;
    }
    if (!sampleData.sampleName) {
      error.sampleName = "Bắt Buộc";
      validate = false;
    }
    if (!sampleData.labId) {
      error.labId = "Bắt Buộc";
      validate = false;
    }
    if (!sampleData.customerId) {
      error.customerId = "Bắt Buộc";
      validate = false;
    }

    if (!sampleData.sampleReceivedDate) {
      error.sampleReceivedDate = "Bắt Buộc";
      validate = false;
    }

    setErrorForm(error);
    return validate;
  };

  const handleOnChange = (event: any) => {
    setSampleData({
      ...sampleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async () => {
    if (handleValidation()) {
      try {
        const response = await axios.patch(
          process.env.REACT_APP_API_BASE + "/sample/" + `${sampleId}`,
          sampleData,
          setHeader()
        );

        if (response.status === 200) {
          navigate("/sample");
        }
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
      }
    }
  };

  const fetchSampleById = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + "/sample/" + `${sampleId}`,
      setHeader()
    );
    setSampleData({
      sampleName: data.sampleName,
      sampleReceivedDate: data.sampleReceivedDate,
      sampleNote: data.sampleNote,
      sampleStatus: data.sampleStatus,
      labId: data.lab.id,
      customerId: data.customer.id,
    });
  };

  const fetchCustomerById = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + "/customer",
      setHeader()
    );

    setCustomerList(data);
  };

  const fetchLabById = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + "/lab/",
      setHeader()
    );

    setLabList(data);
  };
  useEffect(() => {
    fetchSampleById();
    fetchLabById();
    fetchCustomerById();
  }, []);

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
                Chỉnh sửa mẫu
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  required
                  autoComplete="name"
                  autoFocus
                  margin="normal"
                  name="sampleName"
                  variant="outlined"
                  label="Tên Mẫu"
                  fullWidth
                  value={sampleData?.sampleName}
                  onChange={handleOnChange}
                />
                {errorForm?.sampleName && (
                  <Alert severity="warning">{errorForm.sampleName}</Alert>
                )}

                <LocalizationProvider dateAdapter={MomentAdapter}>
                  <div>
                    <DatePicker
                      label="Ngày Nhận Mẫu"
                      value={sampleData.sampleReceivedDate}
                      onChange={(e: any) => {
                        setSampleData({
                          ...sampleData,
                          sampleReceivedDate: e.format("YYYY-MM-DD"),
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    {errorForm?.sampleReceivedDate && (
                      <Alert severity="warning">
                        {errorForm.sampleReceivedDate}
                      </Alert>
                    )}
                  </div>
                </LocalizationProvider>
                <FormControl fullWidth style={{ marginTop: "10px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Phòng Lab
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="labId"
                    id="demo-simple-select"
                    label="Phòng Lab"
                    value={sampleData.labId}
                    onChange={handleOnChange}
                  >
                    {labList.length > 0 &&
                      labList.map((lab: any) => (
                        <MenuItem value={lab.id as any}>{lab.labName}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errorForm?.labId && (
                  <Alert
                    severity="warning"
                    style={{ width: " 100%", marginTop: "8px" }}
                  >
                    {errorForm.labId}
                  </Alert>
                )}
                <FormControl fullWidth style={{ marginTop: "10px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Khách Hàng
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="customerId"
                    id="demo-simple-select"
                    label="Khách Hàng"
                    value={sampleData.customerId}
                    onChange={handleOnChange}
                  >
                    {customerList.length > 0 &&
                      customerList.map((customer: any) => (
                        <MenuItem value={customer.id as any}>
                          {customer.customerName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errorForm?.customerId && (
                  <Alert
                    severity="warning"
                    style={{ width: " 100%", marginTop: "8px" }}
                  >
                    {errorForm.customerId}
                  </Alert>
                )}
                <FormControl fullWidth style={{ marginTop: "10px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Tình trạng Mẫu
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="sampleStatus"
                    id="demo-simple-select"
                    label="Tình Trạng Mẫu"
                    value={sampleData?.sampleStatus}
                    onChange={handleOnChange}
                  >
                    {["done", "processing", "wait-for-acception", "reject"].map(
                      (status: any) => (
                        <MenuItem value={status}>{status}</MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
                {errorForm?.sampleStatus && (
                  <Alert
                    severity="warning"
                    style={{ width: " 100%", marginTop: "8px" }}
                  >
                    {errorForm.sampleStatus}
                  </Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="sampleNote"
                  variant="outlined"
                  label="Ghi Chú"
                  fullWidth
                  value={sampleData?.sampleNote}
                  onChange={handleOnChange}
                />
                {errorForm?.sampleNote && (
                  <Alert severity="warning">{errorForm.sampleNote}</Alert>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", marginTop: "20px" }}
                  onClick={handleOnSubmit}
                >
                  Cập Nhật
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SampleUpdateForm;
