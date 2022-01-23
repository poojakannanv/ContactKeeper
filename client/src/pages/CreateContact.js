import React from "react";
import { Form, Input, Select, message , Button} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

const { Option } = Select;
const CreateContact = () => {
  const [form] = Form.useForm();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const onFinish = (values) => {
    var data = JSON.stringify({
      name: values.name,
      email: values.email,
      phone: values.phone,
      type: values.type,
    });

    var config = {
      method: "post",
      url: "http://localhost:5000/api/contacts",
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        message.success("Contact Created Successfully");
        navigate("/contacts");
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
    <div className="layout-div">
      <div className="login-inner">
        <h1 className="text-center">Create New</h1>
        <Form
          form={form}
          name="basic"
          initialValues={{
            type: "personal",
          }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input minLength={10} maxLength={10} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Contact Type" name="type">
            <Select style={{ width: 400 }}>
              <Option value="personal">Personal</Option>
              <Option value="professional">Professional</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginTop: 30 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 30 }}
              className="btn btn-primary"
            >
              Create
            </Button>
            <Link type="button" className="btn btn-secondary" to="/contacts">
              Cancle
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateContact;
