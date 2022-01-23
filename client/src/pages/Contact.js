import React from "react";
import { Card, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

const { Title, Text } = Typography;

const Contact = (props) => {
  const navigate = useNavigate();
  const onClick = (id) => {
    navigate(`/contacts/view/${id}`);
  };
  return (
    <Col span={6} className="gutter-col">
      <Card
        hoverable
        onClick={() => {
          onClick(props.data._id);
        }}
        className="card"
      >
        <Title level={4} className="capitalize">
          <FaUserAlt /> <Text>{props.data.name}</Text>
        </Title>
        <Title level={5} type="secondary">
          <BsFillTelephoneFill />
          <Text style={{ paddingLeft: 5 }}>{props.data.phone}</Text>
        </Title>
      </Card>
    </Col>
  );
};
export default Contact;
