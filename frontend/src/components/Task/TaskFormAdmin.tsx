import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setHeader } from "../../common/utils/common";

const TaskFormAdmin = () => {
  const navigate = useNavigate();
  let { taskId } = useParams();

  const [labData, setLabData] = useState<any>({
    taskName: "",
    taskStatus: "",
    taskResult: "",
    staffId: "",
    taskNote: "",
    methodId: "",
  });
  const [staffList, setStaffList] = useState<any>([]);

  const handleOnChange = (event: any) => {
    setLabData({
      ...labData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (taskStatus: any) => {
    const dataSent = { ...labData, taskStatus };
    console.log(dataSent);
    try {
      const response = await axios.patch(
        process.env.REACT_APP_API_BASE + `/task/${taskId}`,
        dataSent,
        setHeader()
      );

      if (response.status === 200) {
        navigate("/task");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      }
    }
  };

  const fetchStaffById = useCallback(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + `/task/${taskId}`,
      setHeader()
    );
    const { taskStatus, taskName, taskResult, staff, taskNote, method } = data;

    const dataSent = {
      taskStatus,
      taskName,
      taskResult,
      staffId: staff?.id,
      taskNote,
      methodId: method?.id,
    };
    console.log("hihi", dataSent);
    setLabData(dataSent);
  }, [taskId]);

  const fetchAllStaff = useCallback(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + `/staff/not-lead`,
      setHeader()
    );
    setStaffList(data);
  }, [taskId]);
  useEffect(() => {
    fetchStaffById();
    fetchAllStaff();
  }, [fetchStaffById, fetchAllStaff]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} style={{ height: "100%" }}>
      <Grid container spacing={3} style={{ height: "100%", overflowY: "auto" }}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            style={{ height: "100%" }}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "40%",
              }}
            >
              <Typography component="h1" variant="h5">
                Chi tiết của một công việc
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  required
                  autoComplete="name"
                  autoFocus
                  margin="normal"
                  name="taskName"
                  variant="outlined"
                  label="Tên công việc"
                  fullWidth
                  disabled={true}
                  value={labData?.taskName}
                  onChange={handleOnChange}
                />

                <FormControl style={{ marginBottom: "12px" }} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Nhân viên phụ trách
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="staffId"
                    id="demo-simple-select"
                    value={labData?.staffId}
                    label="Nhân viên phụ trách"
                    onChange={handleOnChange}
                    disabled={true}
                  >
                    {staffList.length > 0 &&
                      staffList.map((item: any) => (
                        <MenuItem value={item.id as any} key={item.id}>
                          {item.employeeName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                {/* <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tình Trạng Công Việc
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="taskStatus"
                    id="demo-simple-select"
                    value={labData?.taskStatus}
                    label="Tình Trạng Thiết Bị"
                    onChange={handleOnChange}
                  >
                    <MenuItem value={"to-do"}>Chuẩn bị làm</MenuItem>
                    <MenuItem value={"processing"}>Đang làm</MenuItem>
                    <MenuItem value={"wait-for-acception"}>
                      Chờ phê duyệt
                    </MenuItem>
                  </Select>
                </FormControl> */}
                <TextField
                  required
                  margin="normal"
                  name="taskResult"
                  variant="outlined"
                  label="Kết quả"
                  fullWidth
                  value={labData?.taskResult}
                  onChange={handleOnChange}
                />
                <TextField
                  required
                  margin="normal"
                  name="taskNote"
                  variant="outlined"
                  label="Ghi chú"
                  fullWidth
                  value={labData?.taskNote}
                  onChange={handleOnChange}
                />

                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", marginTop: "20px" }}
                  onClick={() => handleOnSubmit("done")}
                >
                  Đồng ý
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  style={{ width: "100%", marginTop: "20px" }}
                  onClick={() => handleOnSubmit("to-do")}
                >
                  Từ chối
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaskFormAdmin;
