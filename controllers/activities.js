// import { v4 as uuidv4 } from "uuid";
import { createRequestSchema, updateRequestSchema } from "../routes/joi";
import RecordModel from "../src/models/record";
let activities = [];

export const searchAllActivities = async (req, res) => {
  const activities = await RecordModel.find({});
  res.status(200).send(activities);
};

export const createActivity = async (req, res) => {
  const body = req.body;
  // const activity = req.body;
  // validate
  const validateResult = createRequestSchema.validate(body);
  if (validateResult.error) {
    // failed validation
    return res.status(400).send(validateResult.error);
  }
  const newRecord = new RecordModel(body);
  await newRecord.save();

  return res.status(201).send(newRecord);
};
//FINISH LINE

// activities.push({ ...activity, id: uuidv4() });
// res
//   .status(201)
//   .send(`User with the name ${activity.activityName} added to the database.`);

export const searchActivityById = (req, res) => {
  const { id } = req.params;
  const foundActivity = activities.find((activity) => activity.id === id);
  if (foundActivity) {
    return res.send(foundActivity);
  } else {
    return res.status(404).send("Activity not found");
  }
};

export const deleteActivityByID = async (req, res) => {
  const _id = req.params;
  console.log(activityType);
  //true keep in array and if false remove from array
  // records.splice(req.recordIndex, 1);
  await RecordModel.deleteOne({ _id: id });
  // `1` if MongoDB deleted a doc, `0` if no docs matched the filter `{ name: ... }`
  res.status(204).send(`User with the id ${id} deleted from the database.`);
};

export const updateActivity = (req, res) => {
  const { id } = req.params;
  const {
    activityDate,
    activityName,
    activityDuration,
    activityType,
    activityDescription,
  } = req.body;
  // validate
  const validateResult = updateRequestSchema.validate(body);
  if (validateResult.error) {
    // failed validation
    return res.status(400).send("Invalid request");
  }
  const activity = activities.find((activity) => activity.id === id);

  if (activityDate) activity.activityDate = activityDate;
  if (activityName) activity.activityName = activityName;
  if (activityDuration) activity.activityDuration = activityDuration;
  if (activityType) activity.activityType = activityType;
  if (activityDescription) activity.activityDescription = activityDescription;

  res.status(201).send(`Activity with the id: ${id} has been updated `);
};
