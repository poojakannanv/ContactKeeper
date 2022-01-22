import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col, Typography, Tag, Button, message } from "antd";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineArrowLeft,
} from "react-icons/ai";

const { Text, Title } = Typography;
const SingleConatct = () => {
  const navigate = useNavigate();
  const param = useParams();

  const id = param.id;
  const [contact, setContact] = useState([]);
  const token = localStorage.getItem("token");

  const ViewCard = (props) => {
    return (
      <div
        className="d-flex  justify-content-between"
        style={{ marginRight: 20, marginLeft: 20 }}
      >
        <Title level={4} style={{ margin: 0, paddingRight: 10 }}>
          {props.title}
        </Title>

        <Text level={5} style={{ margin: 0, marginTop: 5, paddingLeft: 10 }}>
          {props.value}
        </Text>
      </div>
    );
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

  const onDelete = () => {
    var config = {
      method: "delete",
      url: `http://localhost:5000/api/contacts/${id}`,
      headers: {
        "x-auth-token": token,
      },
    };

    axios(config)
      .then((response) => {
        message.success("Contact Deleted Successfully");
        navigate("/contacts");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="layout-div">
      <div className="login-inner">
        <h1 style={{ textAlign: "center",marginBottom:30 }}>Contact Details</h1>

        <ViewCard title="Name" value={contact.name} />
        <ViewCard title="Phone Number" value={contact.phone} />
        <ViewCard title="Email" value={contact.email} />
        <ViewCard title="Contact Type" value={contact.type} />

        <Row align="center" style={{ marginTop: 70 }}>
          <Col span={6}>
            <Link type="button" className="btn btn-secondary" to="/contacts">
              <AiOutlineArrowLeft /> Cancle
            </Link>
          </Col>
          <Col span={5}>
            <Link
              type="button"
              className="btn btn-primary"
              to={`/contacts/edit/${contact._id}`}
            >
              <AiOutlineEdit /> Edit
            </Link>
          </Col>
          <Col>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                onDelete();
              }}
            >
              <AiOutlineDelete /> Delete
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SingleConatct;
