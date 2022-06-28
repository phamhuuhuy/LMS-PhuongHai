import React, { useState, useEffect } from "react";
import { Typography, Button, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DialogAlert from "../../common/DialogAlert";
import { Chemical } from "./Chemical.type";
import axios from "axios";

const ChemicalTable: React.FC = () => {
  const [data, setData] = useState<Chemical[]>([]);
  const [overDueData, setOverDueData] = useState<Chemical[]>();
  const [nextDueData, setNextDueData] = useState<Chemical[]>();
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

  const getData = async () => {
    const dataAPI = await axios.get(
      process.env.REACT_APP_API_BASE + "/chemical"
    );

    const { data } = dataAPI;
    setData(data);
  };

  const getOverDueData = async () => {
    const dataAPI = await axios.get(
      process.env.REACT_APP_API_BASE + "/chemical/over-due"
    );
    const { data } = dataAPI;
    setOverDueData(data);
  };

  const getNextDueData = async () => {
    const dataAPI = await axios.get(
      process.env.REACT_APP_API_BASE + "/chemical/next-due"
    );
    const { data } = dataAPI;
    console.log(data);
    setNextDueData(data);
  };
  const getDates = (date: string): number => {
    const date1 = new Date();
    const date2 = new Date(date);
    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.round(Difference_In_Days);
  };
  useEffect(() => {
    getData();
    getOverDueData();
    getNextDueData();
  }, []);
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
            height: "100px",
            padding: "10px 15px",
            backgroundColor: "#d7ecf7",
            overflowY: "scroll",
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
          {overDueData?.map((item) => (
            <div
              style={{
                color: "#7E93A0",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              Thiết bị
              <span
                style={{
                  color: "#4D7180",
                  fontWeight: "700",
                  fontSize: "14px",
                  marginLeft: "10px",
                }}
              >
                {item.chemicalName + " " + item.chemicalModel}{" "}
              </span>
              quá hạn hiểu chuẩn
              <span
                style={{
                  color: "#4D7180",
                  fontWeight: "700",
                  fontSize: "14px",
                  marginLeft: "10px",
                }}
              >
                {item.chemicalDueDate && getDates(item.chemicalDueDate)}{" "}
              </span>
              ngày
            </div>
          ))}
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
          {nextDueData?.map((item) => (
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
                {item.chemicalDueDate}
                {","}
              </span>
              <span
                style={{
                  color: "#4D7180",
                  fontWeight: "700",
                  fontSize: "14px",
                  marginLeft: "10px",
                }}
              >
                {item.chemicalName + " " + item.chemicalModel}
              </span>{" "}
              sẽ hết hạn
            </div>
          ))}
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
        item={"chemical"}
      />

      <div style={{ height: "70%", width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ChemicalTable;
