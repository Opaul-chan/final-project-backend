import express from "express";
import mongoose from "mongoose";
// add "type" : "module" can delete const express
// const express = require("express");
import bodyParser from "body-parser";
import activitiesRoutes from "./routes/activities";
const app = express();
const PORT = 4000;

app.use(bodyParser.json());
//if visit slash users will run usersRoutes
app.use("/activities", activitiesRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Homepage");
});

const boot = async () => {
  //Connect to mongoDB
  const url =
    "mongodb+srv://sandbox:sandbox@cluster0.hs0f1.mongodb.net/sample_training?retryWrites=true&w=majority";
  await mongoose.connect(url);
  //Start express sever
  app.listen(PORT, () =>
    console.log(`Server running on port: http://localhost:${PORT} `)
  );
};
boot();
