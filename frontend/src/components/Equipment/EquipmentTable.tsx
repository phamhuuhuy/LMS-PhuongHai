import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { Typography, Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DialogAlert from "../../common/DialogAlert";

const CustomerTable = () => {
  const [data, setData] = useState<GridRowsProp>([
      // mock data
    { id: 1, equipmentName: 'Quạt Trần', equipmentModel: 'FGH3L', seriNumber: '12465', dateBuy: '02/01/2001', dateCalibrate: '30/04/2022' ,
    dateRecalibrate: "30/04/2030", equipmentStatus: 'Tốt',infoProvider: 'Amigoes',  employeeManagement: 's3815059', server: 'Connected' },
    { id: 2, equipmentName: 'Cối xay gió', equipmentModel: 'FDA3G', seriNumber: '12465', dateBuy: '02/01/2001', dateCalibrate: '30/04/2022' ,
    dateRecalibrate: "30/04/2030", equipmentStatus: 'Xấu',infoProvider: 'Cooper',  employeeManagement: 's3815059', server: 'Connected' },
    { id: 3, equipmentName: 'Bản ủi', equipmentModel: 'SKT1K', seriNumber: '12465', dateBuy: '02/01/2001', dateCalibrate: '30/04/2022' ,
    dateRecalibrate: "30/04/2030", equipmentStatus: 'Tốt',infoProvider: 'Nilon',  employeeManagement: 's3815059', server: 'Connected' },
  ]);
  const [id, setId] = useState('')
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/customer/${id}`);
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
    navigate("/customer/create");
  };



  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "equipmentName",
      headerName: "Tên TB",
      width: 150,
    },
    {
      field: "equipmentModel",
      headerName: "Model",
      width: 80,
    },

    {
      field: "seriNumber",
      headerName: "Seri no.",
      width: 80,
    },
    {
      field: "dateBuy",
      headerName: "Ngày mua",
      width: 120,
    },
    {
      field: "dateCalibrate",
      headerName: "Ngày hiệu chuẩn",
      width: 150,
    },
    {
      field: "dateRecalibrate",
      headerName: "Ngày HC kế tiếp",
      width: 150,
    },
    {
        field: "equipmentStatus",
        headerName: "Tình trạng TB",
        width: 100,
    },
    {
        field: "infoProvider",
        headerName: "Nhà cung cấp",
        width: 120,
    },
    {
        field: "employeeManagement",
        headerName: "NV quản lí trực tiếp",
        width: 150,
    },
    {
        field: "server",
        headerName: "Server",
        width: 100,
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/customer");
    const value = await response.json();
    setData(value);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Bảng Thiết bị
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
        <Button variant="contained" onClick={handleOnClick}>
          + Thêm Thiết Bị
        </Button>
      </div>
      <DialogAlert id={id} openDialog={openDialog} handleClose={handleClose} msg={'Bạn có chắc muốn xoá thiết bị này ?'}/>

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

export default CustomerTable;
