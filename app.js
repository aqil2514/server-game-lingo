import bodyParser from "body-parser";
import methodOverride from "method-override";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import "./utils/db.js";
import jwt from "jsonwebtoken";

import evertale from "./routes/evertale.js";

import { Users } from "./models/users.js";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://www.googleapis.com"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    preflightContinue: true,
  })
);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.get("/", (req, res) => {
  res.send("Server Aktif");
});

app.get("/dashboard", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.json({ msg: "Anda belum login" });
    return;
  }

  const secretKey = process.env.SECRET_KEY;
  const compared = await jwt.verify(token, secretKey);

  res.json({ user: compared.user, token });
});

app.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) {
      res.status(404).json({ status: 404, message: "User not found!" });
      return;
    }

    const compared = await bcrypt.compare(password, user.password);

    if (!compared) {
      res.status(400).json({ status: 400, message: "Wrong Password!" });
      return;
    }

    const payload = {
      fullName: user.fullName,
      nickName: user.nickName,
      user: user.username,
      role: user.role,
    };

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.cookie("token", token, { maxAge: 60 * 60 * 1000, path: "/", domain: "localhost", secure: true, httpOnly: true });
    return res.json({ token: req.cookies.token, status: 200, message: `Success Login!` });
  } catch (error) {
    console.error(error);
    return;
  }
});

app.delete("/users", async (req, res) => {
  const { _id, username } = req.body;

  await Users.deleteOne({ _id });

  res.json({ msg: `Akun dengan username ${username} telah dihapus` });
});

app.get("/users", async (req, res) => {
  const user = await Users.find();

  res.json(user);
});

app.post("/register", async (req, res) => {
  const { fullName, nickName, username, password, confirmPassword, role } = req.body;

  const users = await Users.findOne({ username });

  if (users) {
    res.json({ msg: "Username telah tersedia, silahkan gunakan yang lain" });
    return;
  }

  if (username.length <= 6) {
    res.json({ msg: "Username minimal 6 karakter" });
    return;
  }

  if (username.indexOf(" ") !== -1) {
    res.json({ msg: "Username tidak boleh mengandung spasi" });
    return;
  }

  if (password !== confirmPassword) {
    res.json({ msg: "Password tidak sama" });
    return;
  }

  if (password == username) {
    res.json({ msg: "Password dan Username tidak boleh sama" });
    return;
  }

  if (password.length <= 8) {
    res.json({ msg: "Password anda kurang dari 8 karakter" });
    return;
  }

  if (role == "Pilih Role") {
    res.json({ msg: "Anda belum memilih role!" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const lowerCaseUsername = username.toLowerCase();

  await Users.insertMany({ fullName, nickName, username: lowerCaseUsername, password: hashedPassword, role });
  res.json({ success: true, msg: "Berhasil dibuat. Silahkan login!" });
  return;
});

app.get("/token", async (req, res) => {
  const token = req.cookies.token;

  const secretKey = process.env.SECRET_KEY;
  if (token) {
    const user = await jwt.verify(token, secretKey);

    res.json({ token, user });
    return;
  }

  res.json({ msg: "Anda belum login!" });
  return;
});

app.get("/validation", async (req, res) => {
  const token = req.cookies.token;
  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    res.json({ msg: "Anda belum login!" });
    return;
  }

  const user = await jwt.verify(token, secretKey);

  res.json({ user });
});

app.get("/forbidden-area", async (req, res) => {
  const token = req.cookies.token;

  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    res.json({ msg: "Anda belum login!" });
    return;
  }

  const user = await jwt.verify(token, secretKey);

  if (user.role !== "General Admin") {
    res.json({ msg: "Anda bukan pemilik situs" });
    return;
  }

  res.json({ token, user });
});

// app.get("/forbidden-area/:id", async (req, res) => {
//   const user = await Users.findOne({ _id: req.params.id });
//   const token = req.cookies.token;

//   res.json({ user, token });
// });

app.get("/logout", async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    res.clearCookie("token");
    res.json({ msg: "Logout Success" });
    return;
  }
});

// EVERTALE SECTION
app.use("/evertale", evertale);

app.listen(3000, () => {
  console.log(`Server berjalan pada port http://localhost:3000`);
});
