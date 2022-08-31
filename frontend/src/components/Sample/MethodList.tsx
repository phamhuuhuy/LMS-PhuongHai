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
  const [updated, setUpdated] = useState(false);
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

  const emptyField = () => {
    setTaskForm({ ...taskForm, taskName: "", taskNote: "", methodId: "" });
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    emptyField();
  };

  const handleOnChange = (e: any) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleDelete = async (taskId: any) => {
    const { data } = await axios.delete(
      process.env.REACT_APP_API_BASE + `/task/` + taskId,
      setHeader()
    );
    emptyField();
    setUpdated(!updated);
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
                  onClick={() => handleDelete(params.row.taskId)}
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
  }, []);

  React.useEffect(() => {
    fetchMethodBySampleId();
  }, [updated]);

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
    setIsOpen(false);
    setUpdated(!updated);
  };

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
                method
                  .filter(
                    (item: any) =>
                      !sampleMethod
                        .map((hoho: any) => hoho.id)
                        .includes(item.id)
                  )
                  .map((method: any) => (
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
        item="task"
        msg={"Bạn có chắc muốn xoá ?"}
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
