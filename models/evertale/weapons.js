import mongoose from "mongoose";

const weaponSchema = new mongoose.Schema({
  name: String,
  iconUrl: String,
});

const Weapons = mongoose.model("weapons", weaponSchema);

export default Weapons;
