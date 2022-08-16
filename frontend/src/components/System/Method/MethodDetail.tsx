import React from "react";
import { Typography, Container, Grid, Paper } from "@mui/material";
import MethodTableChemical from "./MethodTableChemical";
import MethodTableInstrument from "./MethodTableInstrument";

const dataArr = [
  {
    keyMethod: "Số thứ tự",
    valueMethod: "a164a125-e678-4000-8390-f7213c84e967",
  },
  {
    keyMethod: "Chỉ tiêu",
    valueMethod: "Chỉ tiêu COD",
  },
  {
    keyMethod: "Tên phép thử cụ thể",
    valueMethod: "Phương pháp dicromat",
  },
  {
    keyMethod: "Phương pháp thử",
    valueMethod: "TCVN 6491:19 99",
  },
  {
    keyMethod: "Thời gian phân tích chuẩn",
    valueMethod: "0.2 mg/L",
  },
  {
    keyMethod: "File đính kèm",
    valueMethod: "Download",
  },
];

const MethodDetail: React.FC = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column" }}
              style={{ height: "100%" }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                style={{ marginBottom: "20px" }}
              >
                Chi tiết phương pháp phân tích
              </Typography>
              <div
                style={{
                  width: "60%",
                }}
              >
                {dataArr.map((ele, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <div style={{ minWidth: "80px", fontWeight: "bold" }}>
                      {ele.keyMethod}:
                    </div>
                    <div style={{ maxWidth: "300px", textAlign: "end" }}>
                      {ele.valueMethod}
                    </div>
                  </div>
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 4 }}
        style={{ height: "2000px", overflow: "scroll" }}
      >
        <Grid container spacing={3} style={{ height: "100%" }}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column" }}
              style={{ height: "100%" }}
            >
              <MethodTableChemical />
              <MethodTableInstrument />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MethodDetail;
