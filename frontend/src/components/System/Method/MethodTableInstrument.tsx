import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DialogAlert from "../../../common/DialogAlert";

const MethodTableInstrument: React.FC<any> = ({
  instruments,
  methodId,
}: any) => {
  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/method/create");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "instrumentName",
      headerName: "Tên TB",
      width: 150,
    },
    {
      field: "instrumentModel",
      headerName: "Model",
      width: 80,
    },

    {
      field: "instrumentSeriNo",
      headerName: "Seri no.",
      width: 80,
    },
    {
      field: "instrumentBuyDate",
      headerName: "Ngày mua",
      width: 120,
    },
    {
      field: "instrumentCalibrationDate",
      headerName: "Ngày hiệu chuẩn",
      width: 150,
    },
    {
      field: "instrumentStatus",
      headerName: "Tình trạng TB",
      width: 100,
    },
    {
      field: "instrumentNextCalibrationDate",
      headerName: "Ngày HC kế tiếp",
      width: 150,
    },
    {
      field: "instrumentProvider",
      headerName: "Nhà cung cấp",
      width: 120,
    },
    {
      field: "instrumentSupervisor",
      headerName: "NV quản lí trực tiếp",
      width: 150,
    },
    {
      field: "instrumentServer",
      headerName: "Server",
      width: 100,
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
          rows={instruments}
          columns={columns}
          pageSize={7}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default MethodTableInstrument;
