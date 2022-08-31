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

import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import axios from "axios";
import { setHeader } from "../../common/utils/common";
import MethodList from "./MethodList";
import { ModelPopUp } from "./ModelPopUp";

interface EmployeeType {
  id: String;
  employeeUserName: String;
  employeePassword: String;
  employeeName: String;
  isManager: Boolean;
}

const SampleDetail: React.FC = () => {
  let { sampleId } = useParams();
  const [sampleData, setSampleData] = useState({
    sampleName: "",
    sampleReceivedDate: "",
    sampleReturnedResultDate: "",
    sampleNote: "",
    sampleStatus: "",
    labName: "",
    customerName: "",
    leadName: "",
  });

  const fetchSampleById = useCallback(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE + `/sample/${sampleId}`,
      setHeader()
    );
    let { lab, lead, customer, ...rest } = data;
    setSampleData({
      ...rest,
      labName: lab.labName,
      customerName: customer.customerName,
      lead: lead?.employeeName,
    });
  }, [sampleId]);

  const handleOnChange = async (e: any) => {
    const leadId = e.target.value;
    const bodyData = {
      staffId: leadId,
      //   labId,
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
          //   labId,
        },
      }
    );
    window.location.reload();
  };

  useEffect(() => {
    fetchSampleById();
  }, [fetchSampleById]);
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
                Thông tin chi tiết mẫu
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
                    Tên mẫu
                  </div>
                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {sampleData.sampleName}
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
                    Ngày nhận mẫu
                  </div>
                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {sampleData.sampleReceivedDate}
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
                    Ngày trả kết quả
                  </div>
                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {sampleData.sampleReturnedResultDate || "Chưa có"}
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
                    Tình trạng mẫu
                  </div>
                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {sampleData.sampleStatus}
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
                    Khách Hàng
                  </div>
                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {sampleData.customerName}
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
                    Phòng Lab
                  </div>
                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {sampleData.labName}
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
                    Tên Trưởng Phòng
                  </div>
                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {sampleData.leadName || "Chưa có"}
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
                    Ghi chú
                  </div>
                  <div style={{ maxWidth: "300px", width: "50%" }}>
                    {sampleData.sampleNote}
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
        style={{ height: "130%", overflow: "scroll" }}
      >
        <Grid container spacing={3} style={{ height: "100%" }}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column" }}
              style={{ height: "100%" }}
            >
              {/* <StaffTableOneLab labId={labId || ""} /> */}
              <MethodList sampleId={sampleId} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SampleDetail;
