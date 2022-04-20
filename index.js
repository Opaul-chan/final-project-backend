import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import activitiesRoutes from "./routes/activities";
import chalk from "chalk";

const app = express();
const PORT = process.env.PORT || 4000;

import dotenv from "dotenv";

dotenv.config();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use(async (req, res, next) => {
  await mongoose.connect(process.env.MONGO_URI);
  next();
});

app.use("/activities", activitiesRoutes);

//Start express sever
app.listen(PORT, () =>
  console.log(
    "Server running on port:" + " " + "http://localhost:" + chalk.green(PORT)
  )
);
