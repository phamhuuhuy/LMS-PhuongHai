import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Spinner:any = () => {
  return (
     <Box sx={{ display: "flex", width: '100%', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  )
}
export default Spinner