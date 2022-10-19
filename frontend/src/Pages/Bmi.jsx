import React from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import style from "../Styles/style.module.css";
import Navbar from "../Components/Navbar";
const Bmi = () => {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bmiValue, setBmiValue] = useState();
  const token = localStorage.getItem("token");
  const calculateBMI = async () => {
    let height_In_Meter = Number(height) * 0.3048;
    setBmiValue((Number(weight) / Number(height_In_Meter) ** 2).toFixed(2));
    apiCall();
  };
  console.log(bmiValue);

  const apiCall = async () => {
    const payload = {
      height,
      weight,
      bmiValue,
    };

    await fetch("https://tericsoft-bmi-app.herokuapp.com/user/bmi", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authentication: `${token}`,
      },
    });
  };
  return (
    <>
      <Navbar />
      {bmiValue ? (
        <Text className={style.text}>
          Body mass index is : {Number(bmiValue)}
        </Text>
      ) : (
        ""
      )}
      <Box className={style.main}>
        <Box className={style.app}>
          <FormControl className={style.form}>
            <FormLabel>Enter Your Height in cm : </FormLabel>
            <Input type="number" onChange={(e) => setHeight(e.target.value)} />
          </FormControl>
          <FormControl className={style.form}>
            <FormLabel>Enter Your weight in KG : </FormLabel>
            <Input type="number" onChange={(e) => setWeight(e.target.value)} />
          </FormControl>
          <Button colorScheme={"teal"} onClick={calculateBMI}>
            BMI Calculate 
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Bmi;
