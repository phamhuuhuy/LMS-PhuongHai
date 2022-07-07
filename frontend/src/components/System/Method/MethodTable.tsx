import React, { useState } from "react";
import { Typography, Button, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Edit, Delete, Preview } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DialogAlert from "../../../common/DialogAlert";

const MethodTable: React.FC = () => {
  const [data, setData] = useState<any[]>([
    {
      id: "hello",
      methodTargets: "hello",
      methodName: "hello",
      methodDetail: "hello",
      methodScope: "hello",
      methodTime: "hello",
      methodFileUrl: "hello",
    },
  ]);
  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/method/create");
  };

  const handleEdit = (id: string) => {
    navigate(`/method/${id}`);
  };

  const handleDelete = (id: string) => {
    setOpenDialog(true);
    console.log("Delete " + id);
    setId(id);
  };

  const handleClose = (value: boolean) => {
    setOpenDialog(value);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "methodTargets",
      headerName: "Chỉ tiêu/ sản phẩm, vật liệu được thử",
      width: 150,
    },
    {
      field: "methodName",
      headerName: "Tên phép thử cụ thể",
      width: 150,
    },
    {
      field: "methodDetail",
      headerName: "Phương pháp thử",
      width: 150,
    },
    {
      field: "methodScope",
      headerName: "Phạm vi đo giới hạn",
      width: 150,
    },
    {
      field: "methodTime",
      headerName: "Thời gian phân tích chuẩn",
      width: 150,
    },
    {
      field: "methodFileUrl",
      headerName: "File đính kèm",
      width: 150,
    },
    {
      field: "action",
      headerName: "Hành Động",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <div style={{ marginRight: "20px" }}>
              <Tooltip title="Xem">
                <Preview
                  style={{ color: "#1976d2" }}
                  onClick={() => handleEdit(params.row.id)}
                />
              </Tooltip>
            </div>
            <div style={{ marginRight: "20px" }}>
              <Tooltip title="Sửa">
                <Edit
                  style={{ color: "#1976d2" }}
                  onClick={() => handleEdit(params.row.id)}
                />
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Xoá">
                <Delete
                  style={{ color: "red" }}
                  onClick={() => handleDelete(params.row.id)}
                />
              </Tooltip>
            </div>
          </>
        );
      },
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
        Thiết lập phương pháp phân tích
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
          + Thêm phương pháp
        </Button>
      </div>
      <DialogAlert
        id={id}
        openDialog={openDialog}
        handleClose={handleClose}
        msg={"Bạn có chắc muốn xoá phương pháp này ?"}
      />

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

export default MethodTable;
