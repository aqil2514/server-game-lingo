import express from "express";
const app = express.Router();

import Char from "../models/evertale/char.js";
import Weapons from "../models/evertale/weapons.js";
import LeaderSkills from "../models/evertale/leaderskills.js";
import General from "../models/evertale/general.js";
import { Conjures } from "../models/evertale/conjures.js";

app.get("/chars", async (req, res) => {
  const chars = await Char.find();
  const token = req.cookies.token;

  res.json({ chars, token });
});

app.post("/chars", (req, res) => {
  const { charName, element, rankChar, weapon1, weapon2, leaderSkillName, leaderSkillEN, leaderSkillID } = req.body;

  Char.insertMany({
    charName,
    status: {
      element,
      rankChar,
      weapon1,
      weapon2,
      leaderSkillName,
      leaderSkillEN,
      leaderSkillID,
    },
  });

  res.json({ token });
});

app.delete("/chars", async (req, res) => {
  await Char.deleteOne({ charName: req.body.charName });

  res.json({ success: `Character ${req.body.charName} berhasil dihapus` });
});

app.get("/weapons", async (req, res) => {
  const weapons = await Weapons.find();

  res.json(weapons);
});

app.get("/conjures", async (req, res) => {
  const conjures = await Conjures.find();
  const token = req.cookies.token;

  res.json({ conjures, token });
});

app.post("/conjures", (req, res) => {
  const { name, link } = req.body;

  Conjures.insertMany({
    name,
    link,
  });

  res.json({ success: "Unit Conjures berhasil ditambah" });
});

app.get("/conjures/edit/:name", async (req, res) => {
  const conjure = await Conjures.findOne({ name: req.params.name });
  const token = req.cookies.token;

  res.json({ conjure, token });
});

app.delete("/conjures", async (req, res) => {
  await Conjures.deleteOne({ name: req.body.name });

  res.json({ success: `Unit conjures ${req.body.name} berhasil dihapus` });
});

app.put("/conjures", async (req, res) => {
  await Conjures.updateOne(
    { _id: req.body._id },
    {
      $set: {
        name: req.body.name,
        link: req.body.link,
      },
    }
  );

  res.json({ success: "Unit Conjures berhasil diubah" });
});

app.get("/leaderskills", async (req, res) => {
  const leaderSkills = await LeaderSkills.find();

  res.json(leaderSkills);
});

app.get("/char/details/:charName", async (req, res) => {
  const chars = await Char.findOne({ charName: req.params.charName });

  res.json({ chars });
});

app.get("/generals", async (req, res) => {
  const general = await General.find();

  res.json(general);
});

export default app;
