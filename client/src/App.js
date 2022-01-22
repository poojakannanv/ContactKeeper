import React from "react";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import SingleConatct from "./pages/SingleConatct";
import CreateContact from "./pages/CreateContact";
import { Routes, Route } from "react-router";
import { Layout } from "antd";
import Headers from "./pages/Headers";
import EditContact from "./pages/EditContact";

const { Content, Footer } = Layout;

const App = () => {
  return (
    <Layout className="layout">
      <Headers />
      <Content>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="contacts/create" element={<CreateContact />} />
            <Route path="contacts/view/:id" element={<SingleConatct />} />
            <Route path="contacts/edit/:id" element={<EditContact />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#001529",
          color: "white",
          padding: "15px",
        }}
      >
        ContactKeeper ©2022
      </Footer>
    </Layout>
  );
};

export default App;
