import React from "react";
import axios from "axios";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate,Navigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const onFinish = (values) => {
    var data = JSON.stringify({
      email: values.email,
      password: values.password,
    });

    var config = {
      method: "post",
      url: "http://localhost:5000/api/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/");
        message.success("LoggedIn Successfully");
        
      })
      .catch((error) => {
        const responseMessage = error.response.data.message;
        message.error(responseMessage);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-div ">
      <div className="login-inner">
        <h1 className="text-center"> Sign In</h1>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            type="email"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
