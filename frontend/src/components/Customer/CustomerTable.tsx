import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete, Search } from "@mui/icons-material";
import { Typography, TextField, Button, Tooltip } from "@mui/material";

const CustomerTable = () => {
  const handleEdit = (id: string) => {
    console.log("Edit " + id);
  };
  const handleDelete = (id: string) => {
    console.log("Delete " + id);
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

  const rows = [
    {
      id: "3f8a2ef9-cb2b-4552-bab9-d4b87aca24bb",
      customerName: "Nguyen Dinh Nhat Huy",
      customerType: "VIP",
      customerContact: "Nguyen Cat Tuong",
      customerPhone: "0909764673",
      customerEmail: "quochuynguyen17@gmail.com",
      customerNote: "quoc huy map an nhieu",
    },
    {
      id: "5e50c061-1fca-4ff3-afa3-727b0fc50a30",
      customerName: "pham huu huy",
      customerType: "VIP",
      customerContact: "Nguyen Cat Tuong",
      customerPhone: "0909764673",
      customerEmail: "quochuynguyen17@gmail.com",
      customerNote: "quoc huy map an nhieu",
    },
    {
      id: "75c80c2f-c7cc-49f1-b0eb-09dae5b00965",
      customerName: "nguyen quoc huy",
      customerType: "VIP",
      customerContact: "Nguyen Cat Tuong",
      customerPhone: "0909764673",
      customerEmail: "quochuynguyen17@gmail.com",
      customerNote: "quoc huy map an nhieu",
    },
    {
      id: "3f8a2ef9-cb2b-4552-bab9-d4b87aca24bb1",
      customerName: "Nguyen Dinh Nhat Huy",
      customerType: "VIP",
      customerContact: "Nguyen Cat Tuong",
      customerPhone: "0909764673",
      customerEmail: "quochuynguyen17@gmail.com",
      customerNote: "quoc huy map an nhieu",
    },
    {
      id: "5e50c061-1fca-4ff3-afa3-727b0fc50a301",
      customerName: "pham huu huy",
      customerType: "VIP",
      customerContact: "Nguyen Cat Tuong",
      customerPhone: "0909764673",
      customerEmail: "quochuynguyen17@gmail.com",
      customerNote: "quoc huy map an nhieu",
    },
    {
      id: "75c80c2f-c7cc-49f1-b0eb-09dae5b009651",
      customerName: "nguyen quoc huy",
      customerType: "VIP",
      customerContact: "Nguyen Cat Tuong",
      customerPhone: "0909764673",
      customerEmail: "quochuynguyen17@gmail.com",
      customerNote: "quoc huy map an nhieu",
    },
    {
      id: "3f8a2ef9-cb2b-4552-bab9-d4b87aca24bb2",
      customerName: "Nguyen Dinh Nhat Huy",
      customerType: "VIP",
      customerContact: "Nguyen Cat Tuong",
      customerPhone: "0909764673",
      customerEmail: "quochuynguyen17@gmail.com",
      customerNote: "quoc huy map an nhieu",
    },
    {
      id: "5e50c061-1fca-4ff3-afa3-727b0fc50a302",
      customerName: "pham huu huy",
      customerType: "VIP",
      customerContact: "Nguyen Cat Tuong",
      customerPhone: "0909764673",
      customerEmail: "quochuynguyen17@gmail.com",
      customerNote: "quoc huy map an nhieu",
    },
    {
      id: "75c80c2f-c7cc-49f1-b0eb-09dae5b009652",
      customerName: "nguyen quoc huy",
      customerType: "VIP",
      customerContact: "Nguyen Cat Tuong",
      customerPhone: "0909764673",
      customerEmail: "quochuynguyen17@gmail.com",
      customerNote: "quoc huy map an nhieu",
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
          />
          <Button variant="outlined">
            Tìm <Search style={{ color: "#1976d2", marginLeft: "2px" }} />
          </Button>
        </div>
        <Button variant="contained">+ Thêm KH</Button>
      </div>

      <div style={{ height: "79%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={7}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default CustomerTable;
