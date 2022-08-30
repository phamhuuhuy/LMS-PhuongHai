import React from "react";
import { useState, useEffect, useCallback } from "react";
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
import { Lab } from "./Lab.type";
import axios from "axios";
import { setHeader } from "../../../common/utils/common";

const LabUpdateForm: React.FC = () => {
  const navigate = useNavigate();
  let { labId } = useParams();

  const [labData, setLabData] = useState<Lab>({
    labName: "",
    subLab: "",
    certification: "",
  });

  const [errorForm, setErrorForm] = useState<Lab>({});

  const handleValidation = () => {
    var error: Lab = {};
    var validate = true;
    if (!labData.labName) {
      error.labName = "Bắt Buộc";
      validate = false;
    }
    if (!labData.subLab) {
      error.subLab = "Bắt Buộc";
      validate = false;
    }

    if (!labData.certification) {
      error.certification = "Bắt Buộc";
      validate = false;
    }
    setErrorForm(error);
    return validate;
  };

  const handleOnChange = (event: any) => {
    setLabData({
      ...labData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async () => {
    if (handleValidation()) {
      try {
        const response = await axios.patch(
          process.env.REACT_APP_API_BASE + `/lab/${labId}`,
          labData,
          setHeader()
        );
        
        if (response.status === 200) {
          navigate("/lab");
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
      process.env.REACT_APP_API_BASE + `/lab/${labId}`,
      setHeader()
    );
    setLabData(data);
  }, [labId]);

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
                Cập Nhật Danh Mục Phòng Lab
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  required
                  autoComplete="name"
                  autoFocus
                  margin="normal"
                  name="labName"
                  variant="outlined"
                  label="Tên Danh Mục Phòng Lab"
                  fullWidth
                  value={labData?.labName}
                  onChange={handleOnChange}
                />
                {errorForm?.labName && (
                  <Alert severity="warning">{errorForm.labName}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="subLab"
                  variant="outlined"
                  label="Trưởng Phòng"
                  fullWidth
                  value={labData?.subLab}
                  onChange={handleOnChange}
                />
                {errorForm?.subLab && (
                  <Alert severity="warning">{errorForm.subLab}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="certification"
                  variant="outlined"
                  label="Chứng Chỉ"
                  fullWidth
                  value={labData?.certification}
                  onChange={handleOnChange}
                />
                {errorForm?.certification && (
                  <Alert severity="warning">{errorForm.certification}</Alert>
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

export default LabUpdateForm;
