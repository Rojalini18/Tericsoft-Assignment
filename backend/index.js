const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userManage = require("./routes/user.routes");
const authentication = require("./middleware/auth");
const bmiRoute = require("./routes/bmi.routes");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to the Page");
});

app.use("/user", userManage);

app.use(authentication);
app.get("/logout", (req, res) => {
  try {
    window.localStorage.removeItem("token");
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
});
app.use("/user", bmiRoute);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Conected to db successfully");
  } catch (error) {
    console.log("Error connecting to db");
    console.log("error");
  }
  console.log("Listening on port 8000");
});
