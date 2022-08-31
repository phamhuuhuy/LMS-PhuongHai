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
  TextareaAutosize,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { Sample } from "./Sample.type";
import axios from "axios";
import { setHeader } from "../../common/utils/common";

const SampleForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sampleData, setSampleData] = useState<Sample>({
    sampleName: "",
    sampleNote: "",
    labId: "",
  });

  const [errorForm, setErrorForm] = useState<Sample>({});

  const [labList, setLabList] = useState([]);

  const getAllLab = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + `/lab`,
      setHeader()
    );
    setLabList(data);
  };

  const handleValidation = () => {
    var error: Sample = {};
    var validate = true;
    if (!sampleData.sampleName) {
      error.sampleName = "Bắt Buộc";
      validate = false;
    }
    if (!sampleData.sampleNote) {
      error.sampleNote = "Bắt Buộc";
      validate = false;
    }
    if (!sampleData.labId) {
      error.labId = "Bắt Buộc";
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
        const response = await axios.post(
          process.env.REACT_APP_API_BASE + "/sample",
          { ...sampleData, customerId: id },
          setHeader()
        );

        if (response.status === 201) {
          navigate("/sample");
        }
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
      }
    }
  };

  useEffect(() => {
    getAllLab();
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
                Thêm Mẫu
              </Typography>
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
                <Alert severity="warning" style={{ width: " 100%" }}>
                  {errorForm.sampleName}
                </Alert>
              )}
              <FormControl fullWidth style={{ marginTop: "3px" }}>
                <InputLabel id="demo-simple-select-label">Phòng Lab</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="labId"
                  id="demo-simple-select"
                  label="Phòng Lab"
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
              <TextField
                required
                autoComplete="name"
                autoFocus
                margin="normal"
                name="sampleNote"
                variant="outlined"
                label="Ghi Chú Mẫu"
                fullWidth
                value={sampleData?.sampleNote}
                onChange={handleOnChange}
              />
              {errorForm?.sampleNote && (
                <Alert severity="warning" style={{ width: " 100%" }}>
                  {errorForm.sampleNote}
                </Alert>
              )}
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={handleOnSubmit}
              >
                Thêm Mẫu
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SampleForm;
