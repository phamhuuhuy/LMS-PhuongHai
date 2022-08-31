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
import { Edit, Delete, AddTask } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setHeader } from "../../common/utils/common";
import DialogAlert from "../../common/DialogAlert";
import { ModelPopUp } from "./ModelPopUp";

const MethodList: React.FC<any> = ({ sampleId }) => {
  const [method, setMethod] = useState([]);
  const [sampleMethod, setSampleMethod] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [methodId, setMethodId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const [taskForm, setTaskForm] = useState({
    taskName: "",
    taskNote: "",
    sampleId,
    methodId: "",
  });

  const handleCloseModal = () => {
    setIsOpen(false);
    setTaskForm({ ...taskForm, taskName: "", taskNote: "", methodId: "" });
  };

  const handleOnChange = (e: any) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  //   const handleDelete = async (staffId: any) => {
  //     const { headers }: any = setHeader();
  //     const { data } = await axios.delete(
  //       process.env.REACT_APP_API_BASE + `/staff-lab`,
  //       {
  //         headers,
  //         data: {
  //           staffId,
  //           labId,
  //         },
  //       }
  //     );
  //     window.location.reload();
  //   };

  const handleClose = (value: boolean) => {
    setOpenDialog(value);
  };

  const handleOnClick = () => {
    navigate("/staff/create");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "methodName",
      headerName: "Tên chỉ tiêu",
      width: 200,
    },
    {
      field: "methodDetail",
      headerName: "Chi tiết chỉ tiêu",
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
                  //   onClick={() => handleDelete(params.row.id)}
                />
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  React.useEffect(() => {
    fetchMethod();
    fetchMethodBySampleId();
  }, []);

  const fetchMethodBySampleId = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + `/task/method/${sampleId}`,
      setHeader()
    );
    setSampleMethod(data);
  };

  const fetchMethod = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + `/method`,
      setHeader()
    );
    setMethod(data);
  };

  const handleOnSubmit = async () => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE + `/task`,
      taskForm,
      setHeader()
    );
    setMethod(data);
  };

  //   const handleOnChange = async (e: any) => {
  //     const staffId = e.target.value;
  //     const bodyData = {
  //       staffId,
  //       //   labId,
  //       isLead: false,
  //     };
  //     const { data } = await axios.post(
  //       process.env.REACT_APP_API_BASE + `/staff-lab`,
  //       bodyData,
  //       setHeader()
  //     );
  //     window.location.reload();
  //   };

  console.log("taskForm", sampleMethod);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Danh sách chỉ tiêu
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
            <InputLabel id="demo-simple-select-label">Chỉ tiêu</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="methodId"
              id="demo-simple-select"
              label="Chỉ tiêu"
              onChange={(e) => {
                handleOnChange(e);
                setIsOpen(true);
              }}
              value={taskForm.methodId}
            >
              {method.length > 0 &&
                method.map((method: any) => (
                  <MenuItem value={method.id as any}>
                    {method.methodName}
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
          rows={sampleMethod}
          columns={columns}
          pageSize={7}
          disableSelectionOnClick
        />
      </div>

      <ModelPopUp
        isOpen={isOpen}
        handleModalClose={handleCloseModal}
        dataForm={taskForm}
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
      />
    </div>
  );
};

export default MethodList;
