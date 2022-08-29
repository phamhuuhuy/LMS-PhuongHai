import React, { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Button,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import DialogAlert from "../../../common/DialogAlert";
import Container from "@mui/material/Container";
import StaffTableOneLab from "./LabStaff/StaffTableOneLab";
import axios from "axios";
import { setHeader } from "../../../common/utils/common";

interface EmployeeType {
  id: String;
  employeeUserName: String;
  employeePassword: String;
  employeeName: String;
  isManager: Boolean;
}

const LabDetail: React.FC = () => {
  let { labId } = useParams();
  const [labData, setLabData] = useState({
    labName: "",
    subLab: "",
    certification: "",
    lead: {} as EmployeeType,
  });

  const [leadList, setLeadList] = useState([]);
  const fetchStaffById = useCallback(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + `/lab/${labId}`,
      setHeader()
    );
    setLabData(data);
  }, [labId]);

  const handleOnChange = async (e: any) => {
    const leadId = e.target.value;
    const bodyData = {
      staffId: leadId,
      labId,
      isLead: true,
    };
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE + `/staff-lab`,
      bodyData,
      setHeader()
    );
    window.location.reload();
  };

  const handleDelete = async (staffId: any) => {
    const { headers }: any = setHeader();
    const { data } = await axios.delete(
      process.env.REACT_APP_API_BASE + `/staff-lab`,
      {
        headers,
        data: {
          staffId,
          labId,
        },
      }
    );
    window.location.reload();
  };
  const fetchLead = useCallback(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + `/staff/not-in-lab/lead/${labId}`,
      setHeader()
    );
    setLeadList(data);
  }, [labId]);
  useEffect(() => {
    fetchStaffById();
    fetchLead();
  }, [fetchStaffById, fetchLead]);
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column" }}
              style={{ height: "100%" }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                style={{ marginBottom: "20px" }}
              >
                Thông tin chi tiết phòng lab
              </Typography>
              <div
                style={{
                  width: "60%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      minWidth: "80px",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    Tên phòng lab
                  </div>
                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {labData.labName}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      minWidth: "80px",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    Bộ phận con
                  </div>
                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {labData.subLab}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      minWidth: "80px",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    Thông tin chứng chỉ
                  </div>
                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {labData.certification}
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      minWidth: "80px",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    Trưởng phòng
                  </div>

                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {labData?.lead ? (
                      <span
                        style={{
                          display: "flex",
                        }}
                      >
                        {labData?.lead?.employeeName}
                        <Tooltip title="Xoá">
                          <Delete
                            style={{ color: "red" }}
                            onClick={() => handleDelete(labData?.lead?.id)}
                          />
                        </Tooltip>
                      </span>
                    ) : (
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Trưởng phòng
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          name="lead"
                          id="demo-simple-select"
                          label="Trưởng phòng"
                          onChange={handleOnChange}
                        >
                          {leadList.length > 0 &&
                            leadList.map((item: EmployeeType) => (
                              <MenuItem value={item.id as any}>
                                {item.employeeName}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    )}
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 4 }}
        style={{ height: "2000px", overflow: "scroll" }}
      >
        <Grid container spacing={3} style={{ height: "100%" }}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column" }}
              style={{ height: "100%" }}
            >
              <StaffTableOneLab labId={labId || ""} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LabDetail;
