import React, { useEffect, useState } from "react";

import { Form, Input, Select, message } from "antd";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

const { Option } = Select;
const EditContact = () => {
  const [form] = Form.useForm();
  const param = useParams();
  const id = param.id;
  const [contact, setContact] = useState([]);
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
      method: "put",
      url: `http://localhost:5000/api/contacts/${id}`,
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        message.success("Contact Edited Successfully");
        navigate("/contacts");
      })
      .catch((err) => {});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getContact = () => {
    var config = {
      method: "get",
      url: `http://localhost:5000/api/contacts/${id}`,
      headers: {
        "x-auth-token": token,
      },
    };

    axios(config)
      .then((response) => {
        setContact(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getContact();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      name: contact && contact.name,
      email: contact && contact.email,
      phone: contact && contact.phone,
      type: contact && contact.type,
    });
  }, [contact, form]);

  return (
    <div className="layout-div">
      <div className="login-inner">
        <h1 className="text-center">Edit Contact</h1>

        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <button
              type="primary"
              htmltype="submit"
              style={{ marginRight: 30 }}
              className="btn btn-primary"
            >
              Update
            </button>
            <Link
              type="button"
              className="btn btn-secondary"
              to={`/contacts/view/${id}`}
            >
              Cancle
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditContact;
