import { Delete, Edit, Preview } from "@mui/icons-material";
import { Button, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DialogAlert from "../../../common/DialogAlert";
import { setHeader } from "../../../common/utils/common";

const LabTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/lab/create");
  };

  const handleEdit = (id: string) => {
    navigate(`/lab/${id}`);
  };
  const handleDetail = (id: string) => {
    navigate(`/labDetail/${id}`);
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
      field: "labName",
      headerName: "Tên phòng lab",
      width: 180,
    },
    {
      field: "employeeName",
      headerName: "Trưởng phòng",
      width: 190,
    },
    {
      field: "subLab",
      headerName: "Bộ phận con",
      width: 190,
    },
    {
      field: "certification",
      headerName: "Chứng chỉ",
      width: 180,
    },
    {
      field: "action",
      headerName: "Hành Động",
      width: 140,
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
            <div style={{ marginRight: "20px" }}>
              <Tooltip title="Xoá">
                <Delete
                  style={{ color: "red" }}
                  onClick={() => handleDelete(params.row.id)}
                />
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Phân Công">
                <Preview
                  style={{ color: "red" }}
                  onClick={() => handleDetail(params.row.id)}
                />
              </Tooltip>
            </div>
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
      process.env.REACT_APP_API_BASE + "/lab",
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
        Thiết lập danh mục phòng Lab
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
          + Thêm danh mục phòng Lab
        </Button>
      </div>
      <DialogAlert
        id={id}
        item="lab"
        openDialog={openDialog}
        handleClose={handleClose}
        msg={"Bạn có chắc muốn xoá danh mục phòng Lab này ?"}
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

export default LabTable;
