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
import DialogAlert from "../../../common/DialogAlert";
import axios from "axios";
import ModalPopup from "../../../common/ModalPopup";
import { setHeader } from "../../../common/utils/common";

const MethodTableChemical: React.FC<any> = ({ chemicals, methodId }: any) => {
  const [isAdded, setIsAdded] = useState(false);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  //
  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [chemicalsNotInMethod, setChemicalsNotInMethod] = useState<any>(null);
  const [chosenChemical, setChosenChemical] = useState<any>(null);

  const handleClose = (value: boolean) => {
    setOpenDialog(value);
  };

  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/method/update/${id}`);
  };

  const handleDelete = (id: string) => {
    setOpenDialog(true);
    setId(id);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 100 },
    {
      field: "chemicalName",
      headerName: "Danh mục",
      width: 150,
    },
    {
      field: "chemicalModel",
      headerName: "Hãng/Model",
      width: 80,
    },
    {
      field: "chemicalUnit",
      headerName: "Đơn vị",
      width: 100,
    },
    {
      field: "chemicalImportDate",
      headerName: "Ngày nhập",
      width: 135,
    },
    {
      field: "chemicalQuantity",
      headerName: "Số lượng",
      width: 135,
    },
    {
      field: "chemicalDueDate",
      headerName: "Hạn sử dụng",
      width: 135,
    },
    {
      field: "chemicalExportDate",
      headerName: "Ngày xuất kho",
      width: 135,
    },

    {
      field: "chemicalReceiver",
      headerName: "Người nhận thiết bị",
      width: 135,
    },

    {
      field: "note",
      headerName: "Ghi chú",
      width: 135,
    },

    {
      field: "quantity",
      headerName: "Số lượng",
      width: 135,
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
    const selectedChemical = event.target.value;
    setChosenChemical(selectedChemical);
    handleModalOpen();
  };

  const fetchChemicalsNotInMethod = async () => {
    const endPoint =
      process.env.REACT_APP_API_BASE + `/chemical/not-in-method/${methodId}`;
    try {
      const { data } = await axios.get(endPoint, setHeader());
      const shortenedData = data.map((chemical: any) => {
        delete chemical["chemicalMethod"];
        delete chemical["chemicalDueDate"];
        delete chemical["chemicalExportDate"];
        delete chemical["chemicalImportDate"];
        delete chemical["chemicalReceiver"];
        delete chemical["chemicalQuantity"];
        delete chemical["chemicalUnit"];
        delete chemical["chemicalModel"];
        delete chemical["note"];
        delete chemical["quantity"];
        return chemical;
      });
      setChemicalsNotInMethod([...shortenedData]);
    } catch (error: any) {
      console.log("Meeting error:", error.message);
    }
  };

  useEffect(() => {
    fetchChemicalsNotInMethod();
  });

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DialogAlert
        id={id}
        openDialog={openDialog}
        handleClose={handleClose}
        msg={"Bạn có chắc muốn xoá vật tư này khỏi phương pháp ?"}
        isInMethod={true}
        methodId={methodId}
        item={"chemical"}
      />

      <ModalPopup
        isOpen={open}
        handleModalClose={() => setOpen(false)}
        chosenChemical={chosenChemical}
        chosenMethod={methodId}
      />
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
        {chemicalsNotInMethod && (
          <FormControl style={{ minWidth: "300px" }}>
            <Select
              value={""}
              onChange={(e) => handleOnChange(e)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Chọn thêm vật tư hoá chất</em>
              </MenuItem>
              {chemicalsNotInMethod?.map((element: any) => (
                <MenuItem
                  value={{ id: element.id, name: element.chemicalName } as any}
                >
                  {element.chemicalName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      {chemicals && (
        <div style={{ height: "79%", width: "100%" }}>
          <DataGrid
            rows={chemicals}
            columns={columns}
            pageSize={7}
            disableSelectionOnClick
          />
        </div>
      )}
    </div>
  );
};

export default MethodTableChemical;
