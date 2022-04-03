import express from "express";
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

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT} `)
);
