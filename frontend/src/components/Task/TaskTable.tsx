import { Delete, Edit, Preview } from "@mui/icons-material";
import { Button, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setHeader } from "../../common/utils/common";

const statusMapper = {
  ["to-do"] : 'Chuẩn bị làm',
  ["processing"]: 'Đang làm',
  ["wait-for-acception"]: 'Chờ phê duyệt',
  
}

const TaskTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const userisManager = JSON.parse(
    localStorage.getItem("user") as any
  )?.isManager;

  const handleOnClick = () => {
    navigate("/lab/create");
  };

  const handleEditAdmin = (id: string) => {
    navigate(`/task/admin/${id}`);
  };
  const handleDetail = (id: string) => {
    navigate(`/task/${id}`);
  };

  const handleDelete = (id: string) => {
    setOpenDialog(true);
    setId(id);
  };

  const handleClose = (value: boolean) => {
    setOpenDialog(value);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "taskName",
      headerName: "Tên cv",
      width: 150,
    },
    {
      field: "taskStatus",
      headerName: "Tình trạng",
      width: 150,
    },
    {
      field: "taskNote",
      headerName: "Ghi chú",
      width: 100,
    },
    {
      field: "taskResult",
      headerName: "Kết quả",
      width: 120,
    },
    {
      field: "taskStartDate",
      headerName: "Ngày bắt đầu",
      width: 150,
    },
    {
      field: "taskEndDate",
      headerName: "Ngày kết thúc",
      width: 150,
    },
    {
      field: "employeeName",
      headerName: "Nhân viên phụ trách",
      width: 150,
    },
    {
      field: "action",
      headerName: "Hành Động",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            {userisManager ? (
              <div>
                <Tooltip title="Xem chi tiết">
                  <Preview
                    style={{ color: "red" }}
                    onClick={() => handleEditAdmin(params.row.id)}
                  />
                </Tooltip>
              </div>
            ) : (
              <div style={{ marginRight: "20px" }}>
                <Tooltip title="Sửa">
                  <Edit
                    style={{ color: "#1976d2" }}
                    onClick={() => handleDetail(params.row.id)}
                  />
                </Tooltip>
              </div>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + "/task",
      setHeader()
    );
  const newData = data.map((task:any) => {
    const newTask ={
      ...task,
      employeeName: task?.staff?.employeeName
    }
    return newTask
  }) 
    setData(newData);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Danh công việc
      </Typography>
      {/* <DialogAlert
          id={id}
          item="lab"
          openDialog={openDialog}
          handleClose={handleClose}
          msg={"Bạn có chắc muốn xoá danh mục phòng Lab này ?"}
        /> */}

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

export default TaskTable;
