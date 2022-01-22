import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="home">
      <div className="home-inner">

      <h1 style={{"color":"white"}}>Welcome to ContactKeeper App..!</h1>
      </div>

      
    </div>
  );
};

export default Home;
