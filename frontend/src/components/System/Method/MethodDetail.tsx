import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, Paper } from "@mui/material";
import MethodTableChemical from "./MethodTableChemical";
import MethodTableInstrument from "./MethodTableInstrument";
import axios from "axios";
import { useParams } from "react-router-dom";

const MethodDetail: React.FC = () => {
  const { methodId } = useParams();
  const [data, setData] = useState<any>();
  const [chemicals, setChemicals] = useState<any>();
  const [instruments, setInstruments] = useState<any>();

  const fetchMethodByDetail = async () => {
    const endPoint = process.env.REACT_APP_API_BASE + `/method/${methodId}`;
    try {
      const { data } = await axios.get(endPoint);

      setChemicals(data?.chemicals);
      setInstruments(data?.instruments);

      setData([
        {
          keyMethod: "Số thứ tự",
          valueMethod: data?.id,
        },
        {
          keyMethod: "Chỉ tiêu",
          valueMethod: data?.methodTargets,
        },
        {
          keyMethod: "Tên phép thử cụ thể",
          valueMethod: data?.methodDetail,
        },
        {
          keyMethod: "Phương pháp thử",
          valueMethod: data?.methodName,
        },
        {
          keyMethod: "Phạm vi đo giới hạn",
          valueMethod: data?.methodScope,
        },
        {
          keyMethod: "Thời gian phân tích chuẩn",
          valueMethod: data?.methodTime,
        },
        {
          keyMethod: "File đính kèm",
          valueMethod: data?.methodFileUrl,
        },
      ]);
    } catch (error: any) {
      console.error("Meeting error:", error.message);
    }
  };

  useEffect(() => {
    fetchMethodByDetail();
  }, []);

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
                Chi tiết phương pháp phân tích
              </Typography>
              <div
                style={{
                  width: "60%",
                }}
              >
                {data?.map((ele: any, index: any) => (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <div style={{ minWidth: "80px", fontWeight: "bold" }}>
                      {ele.keyMethod}:
                    </div>
                    <div style={{ maxWidth: "300px", textAlign: "end" }}>
                      {ele.valueMethod}
                    </div>
                  </div>
                ))}
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
              <MethodTableChemical chemicals={chemicals} methodId={methodId} />
              <MethodTableInstrument
                instruments={instruments}
                methodId={methodId}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MethodDetail;
