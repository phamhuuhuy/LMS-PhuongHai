import React, { useState } from "react";
import {
  Typography,
  Button,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DialogAlert from "../../../../common/DialogAlert";
import axios from "axios";
import { setHeader } from "../../../../common/utils/common";

interface StaffTableOneLabProps {
  labId: string;
}

const StaffTableOneLab: React.FC<StaffTableOneLabProps> = ({ labId }) => {
  const [data, setData] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/staff/${id}`);
  };

  const handleDelete = async (staffId: any) => {
    const { headers }: any = setHeader();
    const { data } = await axios.delete(
      process.env.REACT_APP_API_BASE + `/staff-lab`,
      {
        headers,
        data: {
          staffId,
          labId,
        },
      }
    );
    window.location.reload();
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
      width: 200,
    },
    {
      field: "employeeUserName",
      headerName: "Tên tài khoản",
      width: 200,
    },
    {
      field: "employeePassword",
      headerName: "Mật khẩu",
      width: 200,
    },
    {
      field: "action",
      headerName: "Hành Động",
      width: 200,
      renderCell: (params) => {
        return (
          <>
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

  React.useEffect(() => {
    fetchData();
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + `/staff/not-in-lab/${labId}`,
      setHeader()
    );
    setStaffList(data);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + `/lab/${labId}`,
      setHeader()
    );
    const { staffs } = data;
    setData(staffs);
  };

  const handleOnChange = async (e: any) => {
    const staffId = e.target.value;
    const bodyData = {
      staffId,
      labId,
      isLead: false,
    };
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE + `/staff-lab`,
      bodyData,
      setHeader()
    );
    window.location.reload();
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Danh sách nhân viên của phòng lab
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
        <div style={{ flex: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Nhân viên</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="lead"
              id="demo-simple-select"
              label="Nhân viên"
              onChange={handleOnChange}
            >
              {staffList.length > 0 &&
                staffList.map((item: any) => (
                  <MenuItem value={item.id as any}>
                    {item.employeeUserName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "end" }}>
          {/* <Button
            style={{ alignSelf: "flex-end" }}
            variant="contained"
            onClick={handleOnClick}
          >
            + Thêm Nhân Viên
          </Button> */}
        </div>
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

export default StaffTableOneLab;
