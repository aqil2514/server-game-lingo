import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  link: String,
});

export const Conjures = mongoose.model("conjures", schema);
