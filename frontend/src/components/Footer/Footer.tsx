import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

const data = [
  {
    name: "Nhận mẫu",
    index: 5,
  },
  {
    name: "Hóa lý",
    index: 50,
  },
  {
    name: "Vi sinh",
    index: 99,
  },
  {
    name: "Phòng cơ",
    index: 12,
  },
  {
    name: "Hóa Phân tích",
    index: 1,
  },
];

const chooseColor = (index: Number): string => {
  console.log(index);
  if (index < 10) return "#00ff00";
  if (index < 20) return "#FFA600";
  if (index < 70) return "red";
  return "#6a0dad";
};

const Footer = () => {
  return (
    <Container maxWidth="lg" style={{ height: "100%" }}>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={2}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: chooseColor(item.index),
              }}
            >
              <Typography style={{ color: "white" }}>{item.name}</Typography>
              <Typography style={{ color: "white" }}>
                IQA {item.index}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Footer;
