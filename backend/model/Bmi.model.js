const mongoose = require("mongoose");

const bmiSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  height: { type: Number, require: true },
  weight: { type: Number, require: true },
  bmiValue: { type: Number, require: true },
});

const BmiModel = new mongoose.model("bmi", bmiSchema);

module.exports = BmiModel;
