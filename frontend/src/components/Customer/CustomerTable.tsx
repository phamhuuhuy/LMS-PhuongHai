import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete, Search } from "@mui/icons-material";
import { Typography, TextField, Button, Tooltip } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import DialogAlert from "../../common/DialogAlert";
import { ICustomerFetch } from "./Customer.type";
import axios from "axios";
import { setHeader } from "../../common/utils/common";

const CustomerTable: React.FC = () => {
  const [data, setData] = useState<ICustomerFetch[]>([]);
  const [id, setId] = useState<String>("");
  const [openDialog, setOpenDialog] = useState<Boolean>(false);
  const [searchForm, setSearchForm] = useState<String | null>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/customer/${id}`);
  };

  const handleDelete = (id: string) => {
    setOpenDialog(true);
    setId(id);
  };

  const handleClose = (value: boolean) => {
    setOpenDialog(value);
  };

  const handleOnClick = () => {
    navigate("/customer/create");
  };

  const handleSearchClick = () => {
    if (searchForm === "") {
      setSearchForm(null);
      navigate("/customer?name=null");
      return;
    }
    navigate(`/customer?name=${searchForm}`);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "customerName",
      headerName: "Tên KH",
      width: 170,
    },
    {
      field: "customerType",
      headerName: "Loại KH",
      width: 100,
    },

    {
      field: "customerContact",
      headerName: "Người Liên Hệ",
      width: 150,
    },
    {
      field: "customerPhone",
      headerName: "SĐT KH",
      width: 120,
    },
    {
      field: "customerEmail",
      headerName: "Email KH",
      width: 230,
    },
    {
      field: "customerNote",
      headerName: "Ghi Chú",
      width: 150,
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
    const { data } = await axios(
      process.env.REACT_APP_API_BASE + "/customer",
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

  const haveParams = () => {
    const newData = data.filter((item: any) =>
      item.customerName.includes(searchParams.get("name"))
    );
    return (
      <div style={{ height: "79%", width: "100%" }}>
        <DataGrid
          rows={newData}
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
        Bảng Khách Hàng
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
        <div style={{ display: "flex", alignContent: "stretch" }}>
          <TextField
            id="outlined-basic"
            label="Tên khách hàng"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setSearchForm(e.target.value);
            }}
          />
          <Button variant="outlined" onClick={handleSearchClick}>
            Tìm <Search style={{ color: "#1976d2", marginLeft: "2px" }} />
          </Button>
        </div>
        <Button variant="contained" onClick={handleOnClick}>
          + Thêm KH
        </Button>
      </div>
      <DialogAlert
        id={id}
        openDialog={openDialog}
        handleClose={handleClose}
        msg={"Bạn có chắc muốn xoá user này ?"}
        item={"customer"}
      />

      {searchParams.get("name") === "null" || !searchParams.get("name")
        ? nullParams()
        : haveParams()}
    </div>
  );
};

export default CustomerTable;
