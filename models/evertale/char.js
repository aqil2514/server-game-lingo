import mongoose from "mongoose";

const charSchema = new mongoose.Schema({
  charName: String,
  images: {
    form1: String,
    form2: String,
    form3: String,
  },
  status: {
    rankChar: String,
    element: String,
    weapon1: String,
    weapon2: String,
    leaderSkillName: String,
    leaderSkillEN: String,
    leaderSkillID: String,
    conjures: String,
    conjuresLink: String,
  },
  profile: {
    part1EN: String,
    part1ID: String,
    part2EN: String,
    part2ID: String,
    part3EN: String,
    part3ID: String,
  },
  activeSkill: {
    skill1: {
      skillName: String,
      spirit: String,
      target: String,
      tu: String,
      descEN: String,
      descID: String,
    },
    skill2: {
      skillName: String,
      spirit: String,
      target: String,
      tu: String,
      descEN: String,
      descID: String,
    },
    skill3: {
      skillName: String,
      spirit: String,
      target: String,
      tu: String,
      descEN: String,
      descID: String,
    },
    skill4: {
      skillName: String,
      spirit: String,
      target: String,
      tu: String,
      descEN: String,
      descID: String,
    },
  },
  passiveSkill: {
    passive1: {
      name: String,
      descEN: String,
      descID: String,
    },
    passive1: {
      name: String,
      descEN: String,
      descID: String,
    },
    passive2: {
      name: String,
      descEN: String,
      descID: String,
    },
    passive3: {
      name: String,
      descEN: String,
      descID: String,
    },
    passive4: {
      name: String,
      descEN: String,
      descID: String,
    },
    passive5: {
      name: String,
      descEN: String,
      descID: String,
    },
    passive6: {
      name: String,
      descEN: String,
      descID: String,
    },
  },
});

const Char = mongoose.model("characters", charSchema);
export default Char;
