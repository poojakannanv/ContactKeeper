import React, { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./Contact";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllContacts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const getAllContacts = () => {
    var config = {
      method: "get",
      url: "http://localhost:5000/api/contacts",
      headers: {
        "x-auth-token": token,
      },
    };

    axios(config)
      .then(function (response) {
        setContacts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="contacts">
      <Row className="container " style={{ paddingTop: 5 }}>
        <Col span={20}>
          <h2 style={{ color: "white" }}>Contacts</h2>
        </Col>
        <Col span={4}>
          <Link
            type="button"
            to="/contacts/create"
            className="btn btn-success"
            style={{ float: "right" }}
          >
            <AiOutlineUserAdd /> Add
          </Link>
        </Col>
      </Row>
      <div style={{ width: "98%", padding: 16 }}>
        {contacts && contacts.length !== 0 ? (
          <Row gutter={16}>
            {contacts.map((contact) => {
              return <Contact data={contact} key={contact._id} />;
            })}
          </Row>
        ) : (
          <h1 style={{ textAlign: "center" }}>No Contact Found. Add New </h1>
        )}
      </div>
    </div>
  );
};

export default Contacts;
