import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  activityDate: { type: Date },
  activityName: {
    type: String,
    minLength: [3, "Activity name should contains at least 3 char"],
  },
  activityDuration: { type: Number, min: [0, "Duration must be at least 0"] },
  activityType: { type: String },
  activityDescription: { type: String },
});

const RecordModel = mongoose.model("record", recordSchema, "records");

export default RecordModel;
