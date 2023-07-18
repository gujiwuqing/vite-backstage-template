import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NoPermission = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      style={{
        height: "100%",
        background: "#fff",
      }}
      title="Hello World"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <>
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Back Home
          </Button>
          <Button
            type="primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Back Login
          </Button>
        </>
      }
    />
  );
};

export default NoPermission;
