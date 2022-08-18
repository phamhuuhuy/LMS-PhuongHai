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

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import DialogAlert from "../../../common/DialogAlert";
import Container from "@mui/material/Container";
import StaffTableOneLab from "./LabStaff/StaffTableOneLab";

const LabDetail: React.FC = () => {
  let { labId } = useParams();
  const [labData, setLabData] = useState({
    labName: "",
    subLab: "",
    certification: "",
  });
  const fetchStaffById = useCallback(async () => {
    const response = await fetch(
      process.env.REACT_APP_API_BASE + `/lab/${labId}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();

    let { id: string, ...filteredResult } = result;
    setLabData({ ...filteredResult });
  }, [labId]);

  useEffect(() => {
    fetchStaffById();
  }, [fetchStaffById]);
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
                    //TODO: add code
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
              <StaffTableOneLab />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LabDetail;
