import express from "express";

import {
  createActivity,
  searchAllActivities,
  searchActivityById,
  deleteActivityByID,
  updateActivity,
} from "../controllers/activities";
const router = express.Router();

//Search all activities
router.get("/", searchAllActivities);

//Create activity

router.post("/", createActivity);

//Search a activity
router.get("/:id", searchActivityById);

//Delete a activity
router.delete("/:id", deleteActivityByID);

//Updates a activity
router.patch("/:id", updateActivity);

export default router;
