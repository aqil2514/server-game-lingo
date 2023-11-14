import mongoose from "mongoose";

const schema = new mongoose.Schema({
  fullName: String,
  nickName: String,
  username: String,
  password: String,
  role: String,
});

export const Users = mongoose.model("users", schema);
