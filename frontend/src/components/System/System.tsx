import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const System: React.FC = () => {
  const navigate = useNavigate();

  const btnArrLeft = [
    {
      content: "1. Thiết lập danh mục phòng lab",
      onClickFuc: () => navigate("/lab"),
    },
    {
      content: "2. Thiết lập nhân sự phòng lab",
      onClickFuc: () => navigate("/staff"),
    },
    {
      content: "3. Thiết lập danh mục thiết bị ",
      onClickFuc: () => navigate("/equipment"),
    },
    {
      content: "4. Thiết lập phương pháp phân tích",
      onClickFuc: () => navigate("/method"),
    },
  ];

  const btnArrRight = [
    { content: "Phân quyền truy cập" },
    { content: "Thay đổi password" },
  ];

  return (
    <div
      style={{
        padding: "0px 20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "45%" }}>
        {btnArrLeft.map((btn) => (
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={btn.onClickFuc}
          >
            {btn.content}
          </Button>
        ))}
      </div>
      <div style={{ width: "45%" }}>
        {btnArrRight.map((btn) => (
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", marginTop: "20px" }}
          >
            {btn.content}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default System;
