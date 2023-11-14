import mongoose from "mongoose";

const leaderSkillsSchema = new mongoose.Schema({
  name: String,
  descEN: String,
  descID: String,
});

const LeaderSkills = mongoose.model("leaderskills", leaderSkillsSchema);

export default LeaderSkills;
