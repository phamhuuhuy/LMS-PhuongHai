import React, { useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ModalPopup from "../../../common/ModalPopup";
import DialogAlert from "../../../common/DialogAlert";
import axios from "axios";

const MethodTableInstrument: React.FC<any> = ({
  instruments,
  methodId,
}: any) => {
  const [id, setId] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const handleModalOpen = () => setOpen(true);
  const [instrumentsNotInMethod, setInstrumentsNotInMethod] =
    useState<any>(null);
  const [chosenInstrument, setChosenInstrument] = useState<any>(null);

  const handleClose = (value: boolean) => {
    setOpenDialog(value);
  };

  const handleEdit = (id: string) => {
    navigate(`/method/update/${id}`);
  };

  const handleDelete = (id: string) => {
    setOpenDialog(true);
    console.log("Delete " + id);
    setId(id);
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
      field: "instrumentStatus",
      headerName: "Tình trạng TB",
      width: 100,
    },
    {
      field: "instrumentNextCalibrationDate",
      headerName: "Ngày HC kế tiếp",
      width: 150,
    },
    {
      field: "instrumentProvider",
      headerName: "Nhà cung cấp",
      width: 120,
    },
    {
      field: "instrumentSupervisor",
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
          </>
        );
      },
    },
  ];

  const handleOnChange = (event: any) => {
    const selectedInstrument = event.target.value;
    setChosenInstrument(selectedInstrument);
    handleModalOpen();
  };

  const fetchInstrumentsNotInMethod = async () => {
    const endPoint =
      process.env.REACT_APP_API_BASE + `/instrument/not-in-method/${methodId}`;
    try {
      const { data } = await axios.get(endPoint);
      const shortenedData = data.map((instrument: any) => {
        delete instrument["instrumentBuyDate"];
        delete instrument["instrumentCalibrationDate"];
        delete instrument["instrumentMethod"];
        delete instrument["instrumentModel"];
        delete instrument["instrumentNextCalibrationDate"];
        delete instrument["instrumentProvider"];
        delete instrument["instrumentSeriNo"];
        delete instrument["instrumentServer"];
        delete instrument["instrumentStatus"];
        delete instrument["instrumentSupervisor"];
        return instrument;
      });
      setInstrumentsNotInMethod([...shortenedData]);
    } catch (error: any) {
      console.log("Meeting error:", error.message);
    }
  };

  useEffect(() => {
    fetchInstrumentsNotInMethod();
  });

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DialogAlert
        id={id}
        openDialog={openDialog}
        handleClose={handleClose}
        msg={"Bạn có chắc muốn xoá thiết bị này khỏi phương pháp ?"}
        isInMethod={true}
        methodId={methodId}
        item={"instrument"}
      />

      <ModalPopup
        isOpen={open}
        handleModalClose={() => setOpen(false)}
        chosenInstrument={chosenInstrument}
        chosenMethod={methodId}
      />

      <Typography
        component="h2"
        variant="h6"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Thiết Bị
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
        {instrumentsNotInMethod && (
          <FormControl style={{ minWidth: "300px" }}>
            <Select
              value={""}
              onChange={(e) => handleOnChange(e)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Chọn thêm thiết bị</em>
              </MenuItem>
              {instrumentsNotInMethod?.map((element: any) => (
                <MenuItem
                  value={
                    { id: element.id, name: element.instrumentName } as any
                  }
                >
                  {element.instrumentName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>

      {instruments && (
        <div style={{ height: "79%", width: "100%" }}>
          <DataGrid
            rows={instruments}
            columns={columns}
            pageSize={7}
            disableSelectionOnClick
          />
        </div>
      )}
    </div>
  );
};

export default MethodTableInstrument;
