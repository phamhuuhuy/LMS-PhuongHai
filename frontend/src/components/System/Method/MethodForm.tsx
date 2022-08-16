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
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Method } from "./Method.type";


const MethodForm: React.FC = () => {
  const navigate = useNavigate();
  const [methodData, setMethodData] = useState<Method>({
    methodTargets: "",
    methodName: "",
    methodDetail: "",
    methodScope: "",
    methodTime: "",
    labName: "",
    methodFileUrl: "",
  });
  const [errorForm, setErrorForm] = useState<Method>({});

  const handleValidation = () => {
    var error: Method = {};
    var validate = true;
    if (!methodData.methodTargets) {
      error.methodTargets = "Bắt Buộc";
      validate = false;
    }
    if (!methodData.methodName) {
      error.methodName = "Bắt Buộc";
      validate = false;
    }

    if (!methodData.methodDetail) {
      error.methodDetail = "Bắt Buộc";
      validate = false;
    }

    if (!methodData.methodScope) {
      error.methodScope = "Bắt Buộc";
      validate = false;
    }

    if (!methodData.methodTime) {
      error.methodTime = "Bắt Buộc";
      validate = false;
    }

    if (!methodData.labName) {
      error.labName = "Bắt Buộc";
      validate = false;
    }

    if (!methodData.methodFileUrl) {
      error.methodFileUrl = "Bắt Buộc";
      validate = false;
    }
    setErrorForm(error);
    return validate;
  };

  const handleOnChange = (event: any) => {
    setMethodData({
      ...methodData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async () => {
    if (handleValidation()) {
      try {
        const response = await fetch(process.env.REACT_APP_API_BASE + "/method", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(methodData),
        });
        if (response.status === 201) {
          navigate("/method");
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
                Thêm Phương Pháp Phân Tích
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  required
                  autoComplete="name"
                  autoFocus
                  margin="normal"
                  name="methodTargets"
                  variant="outlined"
                  label="Chỉ tiêu"
                  fullWidth
                  value={methodData?.methodTargets}
                  onChange={handleOnChange}
                />
                {errorForm?.methodTargets && (
                  <Alert severity="warning">{errorForm.methodTargets}</Alert>
                )}

                <TextField
                  required
                  autoComplete="name"
                  autoFocus
                  margin="normal"
                  name="methodName"
                  variant="outlined"
                  label="Tên phép thử cụ thể"
                  fullWidth
                  value={methodData?.methodName}
                  onChange={handleOnChange}
                />
                {errorForm?.methodName && (
                  <Alert severity="warning">{errorForm.methodName}</Alert>
                )}

                <TextField
                  required
                  margin="normal"
                  name="methodDetail"
                  variant="outlined"
                  label="Phương pháp thử"
                  fullWidth
                  value={methodData?.methodDetail}
                  onChange={handleOnChange}
                />
                {errorForm?.methodDetail && (
                  <Alert severity="warning">{errorForm.methodDetail}</Alert>
                )}

                <TextField
                  required
                  margin="normal"
                  name="methodScope"
                  variant="outlined"
                  label="Phạm vi đo giới hạn"
                  fullWidth
                  value={methodData?.methodScope}
                  onChange={handleOnChange}
                />
                {errorForm?.methodScope && (
                  <Alert severity="warning">{errorForm.methodScope}</Alert>
                )}

                <TextField
                  required
                  margin="normal"
                  name="methodTime"
                  variant="outlined"
                  label="Thời gian phân tích chuẩn (phút)"
                  fullWidth
                  value={methodData?.methodTime}
                  onChange={handleOnChange}
                />
                {errorForm?.methodTime && (
                  <Alert severity="warning">{errorForm.methodTime}</Alert>
                )}

                <TextField
                  required
                  margin="normal"
                  name="labName"
                  variant="outlined"
                  label="Phòng ban"
                  fullWidth
                  value={methodData?.labName}
                  onChange={handleOnChange}
                />
                {errorForm?.labName && (
                  <Alert severity="warning">{errorForm.labName}</Alert>
                )}

                <TextField
                  required
                  margin="normal"
                  name="methodFileUrl"
                  variant="outlined"
                  label="File đính kèm"
                  fullWidth
                  value={methodData?.methodFileUrl}
                  onChange={handleOnChange}
                />
                {errorForm?.methodFileUrl && (
                  <Alert severity="warning">{errorForm.methodFileUrl}</Alert>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", marginTop: "20px" }}
                  onClick={handleOnSubmit}
                >
                  Thêm Phương Pháp Phân Tích
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default MethodForm;
