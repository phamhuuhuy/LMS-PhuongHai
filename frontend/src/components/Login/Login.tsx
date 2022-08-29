import React, { useState } from "react";
// material-ui
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorForm, setErrorForm] = useState<any>({});
  const navigate = useNavigate();
  const handleOnSubmit = async () => {
    setLoading(true);
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE + "/auth/login",
      dataForm
    );
    if (data.access_token) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data?.payload, accessToken: data.access_token })
      );
    }
    setLoading(false);
    navigate("/");
  };
  const handleOnChange = (event: any) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, mb: 4 }}
      style={{ height: "100%", backgroundColor: "blue" }}
    >
      <Grid
        container
        spacing={3}
        style={{ height: "500px", width: "100%", padding: "25px" }}
      >
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
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
                Đăng nhập
              </Typography>
              {loading ? <CircularProgress /> : null}
              <Box component="form" noValidate sx={{ mt: 1 }}>
                {errorForm?.message && (
                  <Alert severity="warning">{errorForm?.message}</Alert>
                )}
                <TextField
                  required
                  autoComplete="name"
                  autoFocus
                  margin="normal"
                  name="username"
                  variant="outlined"
                  label="Tên đăng nhập"
                  fullWidth
                  value={dataForm.username}
                  onChange={handleOnChange}
                />

                <TextField
                  required
                  autoComplete="name"
                  autoFocus
                  margin="normal"
                  name="password"
                  variant="outlined"
                  label="Password"
                  type="password"
                  fullWidth
                  value={dataForm?.password}
                  onChange={handleOnChange}
                />

                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", marginTop: "20px" }}
                  onClick={handleOnSubmit}
                >
                  Đăng nhập
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
