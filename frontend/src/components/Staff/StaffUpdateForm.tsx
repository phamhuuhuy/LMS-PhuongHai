import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Staff } from "./Staff.type";
import axios from "axios";
import { setHeader } from "../../common/utils/common";

const StaffUpdateForm: React.FC = () => {
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  let { staffId } = useParams();

  const [employeeData, setEmployeeData] = useState<Staff>({
    employeeUserName: "",
    employeePassword: "",
    employeeName: "",
    employeeLab: "",
    isManager: "",
  });

  const [errorForm, setErrorForm] = useState<Staff>({});

  const handleValidation = () => {
    console.log("ref", passwordRef.current?.value);
    var error: Staff = {};
    var validate = true;
    if (!employeeData.employeeUserName) {
      error.employeeUserName = "Bắt Buộc";
      validate = false;
    }

    if (passwordRef.current?.value) {
      if (
        !employeeData?.employeePassword?.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/
        )
      ) {
        error.employeePassword =
          "Tối thiểu tám ký tự, ít nhất một chữ cái và một số";
        validate = false;
      }
    }

    if (!employeeData.employeeName) {
      error.employeeName = "Bắt Buộc";
      validate = false;
    }
    if (!employeeData.employeeLab) {
      error.employeeLab = "Bắt Buộc";
      validate = false;
    }
    if (employeeData.isManager === "") {
      error.isManager = "Bắt Buộc";
      validate = false;
    }
    setErrorForm(error);
    return validate;
  };

  const handleOnChange = (event: any) => {
    setEmployeeData({
      ...employeeData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async () => {
    if (handleValidation()) {
      try {
        const { employeePassword, ...restEmployee } = employeeData;
        const response = await axios.patch(
          process.env.REACT_APP_API_BASE + `/staff/${staffId}`,
          passwordRef.current?.value ? employeeData : restEmployee,
          setHeader()
        );
        if (response.status === 200) {
          navigate("/staff");
        }
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
      }
    }
  };

  const fetchStaffById = useCallback(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + `/staff/${staffId}`,
      setHeader()
    );
    setEmployeeData(data);
  }, [staffId]);

  useEffect(() => {
    fetchStaffById();
  }, [fetchStaffById]);

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
                Cập Nhật Nhân Sự
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  required
                  autoComplete="name"
                  autoFocus
                  margin="normal"
                  name="employeeUserName"
                  variant="outlined"
                  label="Tên Tài Khoản"
                  fullWidth
                  value={employeeData?.employeeUserName}
                  onChange={handleOnChange}
                />
                {errorForm?.employeeUserName && (
                  <Alert severity="warning">{errorForm.employeeUserName}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="employeePassword"
                  variant="outlined"
                  type="password"
                  label="Mật Khẩu"
                  fullWidth
                  inputRef={passwordRef}
                  onChange={handleOnChange}
                />
                {errorForm?.employeePassword && (
                  <Alert severity="warning">{errorForm.employeePassword}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="employeeName"
                  variant="outlined"
                  label="Tên Nhân Sự"
                  fullWidth
                  value={employeeData?.employeeName}
                  onChange={handleOnChange}
                />
                {errorForm?.employeeName && (
                  <Alert severity="warning">{errorForm.employeeName}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="employeeLab"
                  variant="outlined"
                  label="Phòng Lab"
                  fullWidth
                  value={employeeData?.employeeLab}
                  onChange={handleOnChange}
                />
                {errorForm?.employeeLab && (
                  <Alert severity="warning">{errorForm.employeeLab}</Alert>
                )}

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Chức Danh
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="isManager"
                    id="demo-simple-select"
                    value={employeeData?.isManager}
                    label="Chức Danh"
                    onChange={handleOnChange}
                  >
                    <MenuItem value={true as any}>Quản lí</MenuItem>
                    <MenuItem value={false as any}>Nhân Viên</MenuItem>
                  </Select>
                </FormControl>
                {errorForm?.isManager && (
                  <Alert severity="warning">{errorForm.isManager}</Alert>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", marginTop: "20px" }}
                  onClick={handleOnSubmit}
                >
                  Cập Nhật Nhân Sự
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StaffUpdateForm;
