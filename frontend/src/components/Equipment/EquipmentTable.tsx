import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { Typography, Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DialogAlert from "../../common/DialogAlert";
import axios from "axios";
import { Equipment } from "./Equipment.type";
const CustomerTable: React.FC = () => {
  const [data, setData] = useState<Equipment[]>([]);
  const [overDueData, setOverDueData] = useState<Equipment[]>();
  const [nextDueData, setNextDueData] = useState<Equipment[]>();
  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    const dataAPI = await axios.get(
      process.env.REACT_APP_API_BASE + "/instrument"
    );

    const { data } = dataAPI;
    setData(data);
  };

  const getOverDueData = async () => {
    const dataAPI = await axios.get(
      process.env.REACT_APP_API_BASE + "/instrument/over-due"
    );
    const { data } = dataAPI;
    setOverDueData(data);
  };

  const getNextDueData = async () => {
    const dataAPI = await axios.get(
      process.env.REACT_APP_API_BASE + "/instrument/next-due"
    );
    const { data } = dataAPI;
    setNextDueData(data);
  };

  useEffect(() => {
    getData();
    getOverDueData();
    getNextDueData();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/equipment/${id}`);
  };

  const handleDelete = (id: string) => {
    setOpenDialog(true);
    setId(id);
  };

  const handleClose = (value: boolean) => {
    setOpenDialog(value);
  };

  const handleOnClick = () => {
    navigate("/equipment/create");
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
      field: "instrumentNextCalibrationDate",
      headerName: "Ngày HC kế tiếp",
      width: 150,
    },
    {
      field: "instrumentStatus",
      headerName: "Tình trạng TB",
      width: 100,
    },
    {
      field: "instrumentProvider",
      headerName: "Nhà cung cấp",
      width: 120,
    },
    {
      field: "employeeManagement",
      headerName: "NV quản lí trực tiếp",
      width: 150,
    },
    {
      field: "instrumentServer",
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

  const getDates = (date: string): number => {
    const date1 = new Date();
    const date2 = new Date(date);
    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.round(Difference_In_Days);
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
                {item.instrumentName + " " + item.instrumentModel}{" "}
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
                {item.instrumentCalibrationDate &&
                  getDates(item.instrumentCalibrationDate)}{" "}
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
            Thiết bị sắp hiệu chuẩn
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
                {item.instrumentNextCalibrationDate}{" "}
              </span>{" "}
              sẽ hiệu chuẩn
              <span
                style={{
                  color: "#4D7180",
                  fontWeight: "700",
                  fontSize: "14px",
                  marginLeft: "10px",
                }}
              >
                {item.instrumentName + " " + item.instrumentModel}
              </span>
            </div>
          ))}
        </div>
        <Button
          style={{ alignSelf: "flex-end" }}
          variant="contained"
          onClick={handleOnClick}
        >
          + Thêm Thiết Bị
        </Button>
      </div>
      <DialogAlert
        id={id}
        openDialog={openDialog}
        handleClose={handleClose}
        msg={"Bạn có chắc muốn xoá thiết bị này ?"}
        item={"instrument"}
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

export default CustomerTable;
