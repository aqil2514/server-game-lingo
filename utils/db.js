import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.DATAbASE_URI;

mongoose.connect(uri);
