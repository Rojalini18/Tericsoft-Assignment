const express = require("express");
const BmiModel = require("../model/Bmi.model");
const bmiRoute = express.Router();

bmiRoute.post("/bmi", async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  const { height, weight, bmiValue } = req.body;
  const userBmi = new BmiModel({ userId, height, weight, bmiValue });
  await userBmi.save();
  res.send({ message: "BMI added Successfully", userBmi: userBmi });
});

bmiRoute.get("/history", async (req, res) => {
  const { userId } = req.body;
  const userBmi = await BmiModel.find({ userId });
  res.send(userBmi);
});

module.exports = bmiRoute;
