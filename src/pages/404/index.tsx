import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      style={{
        height: "100%",
        background: "#fff",
      }}
      title="Hello World"
      subTitle="Sorry, The current page path does not exist."
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

export default NotFound;
