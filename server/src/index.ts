import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import users from "./routes/user";

dotenv.config();
const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", users);

app.listen(PORT);
