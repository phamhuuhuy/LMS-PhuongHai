import React, { useState } from "react";
import { Typography, Button, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DialogAlert from "../../common/DialogAlert";

const ChemicalTable: React.FC = () => {
  const [data, setData] = useState<GridRowsProp>([
    // mock data
    {
      id: 1,
      chemicalName: "abc",
      chemicalModel: "abc",
      chemicalUnit: "abc",
      chemicalImportDate: "abc",
      chemicalQuantity: "abc",
      chemicalDueDate: "abc",
      chemicalExportDate: "abc",
      chemicalReceiver: "abc",
    },
  ]);
  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/chemical/${id}`);
  };

  const handleDelete = (id: string) => {
    setOpenDialog(true);
    console.log("Delete " + id);
    setId(id);
  };

  const handleClose = (value: boolean) => {
    setOpenDialog(value);
  };

  const handleOnClick = () => {
    navigate("/chemical/create");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "chemicalName",
      headerName: "Tên hoá chất vật tư",
      width: 150,
    },
    {
      field: "chemicalModel",
      headerName: "Model",
      width: 80,
    },

    {
      field: "chemicalUnit",
      headerName: "Đơn vị tính",
      width: 100,
    },
    {
      field: "chemicalImportDate",
      headerName: "Ngày nhập",
      width: 120,
    },
    {
      field: "chemicalQuantity",
      headerName: "Số lượng",
      width: 100,
    },
    {
      field: "chemicalDueDate",
      headerName: "Hạn sử dụng",
      width: 120,
    },
    {
      field: "chemicalExportDate",
      headerName: "Ngày xuất kho",
      width: 120,
    },
    {
      field: "chemicalReceiver",
      headerName: "Người nhận",
      width: 120,
    },
    {
      field: "action",
      headerName: "Hành Động",
      width: 100,
      renderCell: (params) => {
        return (
          <>
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
            {/* <Link to={`/user/${params.row._id}`}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)} /> */}
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
        Bảng Vật Tư
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flexGrow: "1",
            marginRight: "50px",
            width: "500px",
            padding: "10px 15px",
            backgroundColor: "#d7ecf7",
          }}
        >
          <div style={{ color: "#8296A5" }}>Thông báo</div>
          <div
            style={{
              color: "#4D7180",
              fontWeight: "700",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          >
            Cảnh báo quá hạn
          </div>
          <div
            style={{
              color: "#7E93A0",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            Vật tư
            <span
              style={{
                color: "#4D7180",
                fontWeight: "700",
                fontSize: "14px",
                marginLeft: "10px",
              }}
            >
              Vật tư abc (Pablo 145)
            </span>
            quá hạn hiểu chuẩn 28 ngày
          </div>
          <div
            style={{
              color: "#4D7180",
              fontWeight: "700",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          >
            Vật tư sắp hiệu chuẩn
          </div>
          <div
            style={{
              color: "#7E93A0",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            Ngày
            <span
              style={{
                color: "#4D7180",
                fontWeight: "700",
                fontSize: "14px",
                marginLeft: "10px",
              }}
            >
              02/02/2001{" "}
            </span>{" "}
            sẽ hiệu chuẩn{" "}
            <span>vật tư điện từ trường (SUNIE INDUSTRY, INC)</span>
          </div>
        </div>
        <Button
          style={{ alignSelf: "flex-end" }}
          variant="contained"
          onClick={handleOnClick}
        >
          + Thêm Vật Tư
        </Button>
      </div>
      <DialogAlert
        id={id}
        openDialog={openDialog}
        handleClose={handleClose}
        msg={"Bạn có chắc muốn xoá vật tư này ?"}
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

export default ChemicalTable;
