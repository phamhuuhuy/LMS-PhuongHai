import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CustomerTable from "./CustomerTable";

const Customer = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, mb: 4 }}
      style={{ height: "100%", overflow: "scroll" }}
    >
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <CustomerTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Customer;
