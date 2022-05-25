import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Customer } from "./Customer.type";

const CustomerForm = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState<Customer>({
    customerName: "",
    customerType: "",
    customerContact: "",
    customerPhone: "",
    customerEmail: "",
    customerNote: "",
  });

  const [errorForm, setErrorForm] = useState<Customer>({});

  const handleValidation = () => {
    var error: Customer = {};
    var validate = true;
    if (!customerData.customerName) {
      error.customerName = "Bắt Buộc";
      validate = false;
    }
    if (!customerData.customerPhone) {
      error.customerPhone = "Bắt Buộc";
      validate = false;
    } else {
      if (!customerData.customerPhone.match(/^[0-9]{10}$/)) {
        error.customerPhone = "Số điện thoại không hợp lệ (10 số)";
        validate = false;
      }
    }
    if (!customerData.customerEmail) {
      error.customerEmail = "Bắt Buộc";
      validate = false;
    } else {
      let lastAtPos = customerData.customerEmail.lastIndexOf("@");
      let lastDotPos = customerData.customerEmail.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          customerData.customerEmail.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          customerData.customerEmail.length - lastDotPos > 2
        )
      ) {
        error.customerEmail = "Email không hợp lệ (ví dụ: user@gmail.com)";
        validate = false;
      }
    }
    if (!customerData.customerContact) {
      error.customerContact = "Bắt Buộc";
      validate = false;
    }
    if (!customerData.customerType) {
      error.customerType = "Bắt Buộc";
      validate = false;
    }
    setErrorForm(error);
    return validate;
  };

  const handleOnChange = (event: any) => {
    setCustomerData({
      ...customerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async () => {
    if (handleValidation()) {
      try {
        const response = await fetch("http://localhost:5000/customer", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(customerData),
        });
        console.log(response);
        if (response.status === 201) {
          navigate("/customer");
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
                Thêm Khách Hàng
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  required
                  autoComplete="name"
                  autoFocus
                  margin="normal"
                  name="customerName"
                  variant="outlined"
                  label="Tên Khách Hàng"
                  fullWidth
                  value={customerData?.customerName}
                  onChange={handleOnChange}
                />
                {errorForm?.customerName && (
                  <Alert severity="warning">{errorForm.customerName}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="customerType"
                  variant="outlined"
                  label="Nhóm Khách Hàng"
                  fullWidth
                  value={customerData?.customerType}
                  onChange={handleOnChange}
                />
                {errorForm?.customerType && (
                  <Alert severity="warning">{errorForm.customerType}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="customerContact"
                  variant="outlined"
                  label="Người Liên Hệ"
                  fullWidth
                  value={customerData?.customerContact}
                  onChange={handleOnChange}
                />
                {errorForm?.customerContact && (
                  <Alert severity="warning">{errorForm.customerContact}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="customerPhone"
                  variant="outlined"
                  label="Số Điện Thoại"
                  fullWidth
                  value={customerData?.customerPhone}
                  onChange={handleOnChange}
                />
                {errorForm?.customerPhone && (
                  <Alert severity="warning">{errorForm.customerPhone}</Alert>
                )}
                <TextField
                  required
                  margin="normal"
                  name="customerEmail"
                  variant="outlined"
                  label="Email"
                  fullWidth
                  value={customerData?.customerEmail}
                  onChange={handleOnChange}
                />
                {errorForm?.customerEmail && (
                  <Alert severity="warning">{errorForm.customerEmail}</Alert>
                )}
                <TextField
                  margin="normal"
                  name="customerNote"
                  variant="outlined"
                  label="Ghi Chú"
                  fullWidth
                  value={customerData?.customerNote}
                  onChange={handleOnChange}
                />
                {errorForm?.customerNote && (
                  <Alert severity="warning">{errorForm.customerNote}</Alert>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", marginTop: "20px" }}
                  onClick={handleOnSubmit}
                >
                  Thêm Khách Hàng
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerForm;
