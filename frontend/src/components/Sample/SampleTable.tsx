import { Delete, Edit } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DialogAlert from "../../common/DialogAlert";
import { setHeader } from "../../common/utils/common";
import { Sample } from "./Sample.type";
import { Preview } from "@mui/icons-material";

const CustomerTable: React.FC = () => {
  const [data, setData] = useState<Sample[]>([]);
  const [id, setId] = useState<String>("");
  const [openDialog, setOpenDialog] = useState<Boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/sample/${id}`);
  };

  const handleDelete = (id: string) => {
    setOpenDialog(true);
    setId(id);
  };

  const handleClose = (value: boolean) => {
    setOpenDialog(value);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "sampleName",
      headerName: "Tên Mẫu",
      width: 170,
    },
    {
      field: "sampleReceivedDate",
      headerName: "Ngày Nhận Mẫu",
      width: 150,
    },

    {
      field: "sampleReturnedResultDate",
      headerName: "Ngày Trả Mẫu",
      width: 150,
    },
    {
      field: "sampleStatus",
      headerName: "Tình Trạng Mẫu",
      width: 120,
    },
    {
      field: "sampleNote",
      headerName: "Ghi Chú",
      width: 200,
    },
    {
      field: "action",
      headerName: "Hành Động",
      width: 150,
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
              <Tooltip title="Xem">
                <Preview
                  style={{ color: "red" }}
                  onClick={() => navigate(`/sample/detail/${params.row.id}`)}
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
      process.env.REACT_APP_API_BASE + "/sample",
      setHeader()
    );
    setData(data);
  };

  const nullParams = () => {
    return (
      <div style={{ height: "79%", width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={7}
          disableSelectionOnClick
        />
      </div>
    );
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Bảng Mẫu
      </Typography>

      <div style={{ height: "90%", width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      </div>
      <DialogAlert
        id={id}
        openDialog={openDialog}
        handleClose={handleClose}
        msg={"Bạn có chắc muốn xoá mẫu này ?"}
        item={"sample"}
      />
    </div>
  );
};

export default CustomerTable;
