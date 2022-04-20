import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import activitiesRoutes from "./routes/activities";
import config from "./src/config";
import chalk from "chalk";

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use("/activities", activitiesRoutes);

const boot = async () => {
  //Connect to mongoDB
  await mongoose.connect(config.mongoUri, config.mongoOptions);
  //Start express sever
  app.listen(PORT, () =>
    console.log(
      "Server running on port:" + " " + "http://localhost:" + chalk.green(PORT)
    )
  );
};
boot();
