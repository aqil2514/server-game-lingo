import mongoose from "mongoose";

const genSchema = new mongoose.Schema({
  elements: [],
  rankChar: [],
});

const General = mongoose.model("generals", genSchema);

export default General;
