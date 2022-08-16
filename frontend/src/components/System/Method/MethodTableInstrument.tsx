import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DialogAlert from "../../../common/DialogAlert";

const MethodTableInstrument: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/method/create");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 100 },
    {
      field: "instrumentName",
      headerName: "Danh mục",
      width: 210,
    },
    {
      field: "instrumentModel",
      headerName: "Hãng/Model",
      width: 210,
    },
    {
      field: "instrumentSeriNo",
      headerName: "Số Seri",
      width: 190,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 180,
    },

    {
      field: "note",
      headerName: "Ghi chú",
      width: 180,
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Thiết Bị
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          marginBottom: "20px",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          style={{ alignSelf: "flex-end" }}
          variant="contained"
          onClick={handleOnClick}
        >
          + Thêm Thiết Bị
        </Button>
      </div>

      <div style={{ height: "79%", width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={7}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default MethodTableInstrument