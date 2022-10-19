import { Box, Button } from "@chakra-ui/react";
import React from "react";
import style from "../Styles/style.module.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await fetch("https://tericsoft-bmi-app.herokuapp.com/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box className={style.header}>
      <Link to={"/bmi"}>BMI Calculator</Link>
      <Link to={"/history"}>History</Link>
      <Button color={"blue"} onClick={handleLogout}>
        LOGOUT
      </Button>
    </Box>
  );
};

export default Navbar;


