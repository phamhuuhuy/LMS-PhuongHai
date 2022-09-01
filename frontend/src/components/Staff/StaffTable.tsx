import React, { useState } from "react";
import { Typography, Button, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DialogAlert from "../../common/DialogAlert";
import { IStaffFetch } from "./Staff.type";
import axios from "axios";
import { setHeader } from "../../common/utils/common";

const StaffTable: React.FC = () => {
  const [data, setData] = useState<IStaffFetch[]>([]);
  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/staff/${id}`);
  };

  const handleDelete = (id: string) => {
    setOpenDialog(true);
    setId(id);
  };

  const handleClose = (value: boolean) => {
    setOpenDialog(value);
  };

  const handleOnClick = () => {
    navigate("/staff/create");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "employeeName",
      headerName: "Tên người dùng",
      width: 180,
    },
    {
      field: "employeeUserName",
      headerName: "Tên tài khoản",
      width: 180,
    },
    {
      field: "employeePassword",
      headerName: "Mật khẩu",
      width: 180,
    },
    {
      field: "isManager",
      headerName: "Chức danh",
      width: 150,
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

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + "/staff",
      setHeader()
    );
    setData(data);
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Thiết lập nhân sự cho mỗi Lab
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
          + Thêm Nhân Viên
        </Button>
      </div>
      <DialogAlert
        id={id}
        openDialog={openDialog}
        handleClose={handleClose}
        item="staff"
        msg={"Bạn có chắc muốn xoá nhân viên này ?"}
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

export default StaffTable;
