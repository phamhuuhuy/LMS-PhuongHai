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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DialogAlert from "../../../common/DialogAlert";

const MethodTableChemical: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/method/create");
  };

  const handleEdit = (id: string) => {
    navigate(`/method/update/${id}`);
  };

  const handleDelete = (id: string) => {
    setOpenDialog(true);
    console.log("Delete " + id);
    setId(id);
  };

  const handleClose = (value: boolean) => {
    setOpenDialog(value);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 100 },
    {
      field: "chemicalName",
      headerName: "Danh mục",
      width: 210,
    },
    {
      field: "chemicalModel",
      headerName: "Hãng/Model",
      width: 210,
    },
    {
      field: "chemicalQuantity",
      headerName: "Số lượng",
      width: 190,
    },
    {
      field: "chemicalUnit",
      headerName: "Đơn vị",
      width: 180,
    },

    {
      field: "note",
      headerName: "Ghi chú",
      width: 180,
    },
  ];

  const handleOnChange = (event: any) => {
    // setEmployeeData({
    //   ...employeeData,
    //   [event.target.name]: event.target.value,
    // });
    console.log("first");
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Vật Tư Hoá Chất
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
        <FormControl style={{minWidth: '250px'}}>
          <InputLabel id="demo-simple-select-label">Chức Danh</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name="isManager"
            id="demo-simple-select"
            value={"hello"}
            label="Chức Danh"
            onChange={handleOnChange}
          >
            <MenuItem value={true as any}>Quản lí</MenuItem>
            <MenuItem value={false as any}>Nhân Viên</MenuItem>
          </Select>
        </FormControl>
      </div>
      <DialogAlert
        id={id}
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

export default MethodTableChemical;
