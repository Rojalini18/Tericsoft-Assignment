import { Box, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import style from "../Styles/style.module.css";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
const BmiHistory = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const apiCall = async () => {
    
    await fetch("https://tericsoft-bmi-app.herokuapp.com/user/history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authentication: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    apiCall();
  }, []);
  return (
    <>
      <Navbar />
      <Box className={style.main}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Avtar</Th>
                <Th>Weight(KG)</Th>
                <Th>HEIGHT(Feet)</Th>
                <Th isNumeric>BMI VALUE</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                ? data.map((el) => {
                    return (
                      <Tr key={el._id}>
                        <Td>
                          <Image
                            className={style.image}
                            src="https://img.freepik.com/premium-vector/person-avatar-design_24877-38137.jpg?w=2000"
                          />
                        </Td>
                        <Td>{el.weight}</Td>
                        <Td>{el.height}</Td>
                        <Td isNumeric>
                          {/* {el.bmiValue} */}
                          {(
                            Number(el.weight) /
                            (Number(el.height) * 0.3048) ** 2
                          ).toFixed(2)}
                        </Td>
                      </Tr>
                    );
                  })
                : ""}
            </Tbody>
          </Table>
        </TableContainer>
        {data
          ? data.map((el) => {
              return <Box key={el._id}></Box>;
            })
          : ""}
      </Box>
    </>
  );
};

export default BmiHistory;
