import { createRequestSchema, updateRequestSchema } from "../routes/joi";
import RecordModel from "../src/models/record";

export const searchAllActivities = async (req, res) => {
  const activities = await RecordModel.find({}).sort({ activityDate: "desc" });
  res.status(200).send(activities);
};

export const createActivity = async (req, res) => {
  const body = req.body;
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

export const searchActivityById = async (req, res) => {
  const _id = req.params;
  const activity = await RecordModel.findById(_id.id);
  if (activity) {
    return res.send(activity);
  } else {
    return res.status(404).send("Activity not found");
  }
};

export const deleteActivityByID = async (req, res) => {
  const _id = req.params;

  await RecordModel.findByIdAndDelete(_id.id);
  res.status(204).send(`User with the id ${_id} deleted from the database.`);
};

export const updateActivity = async (req, res) => {
  const _id = req.params.id;
  const {
    activityDate,
    activityName,
    activityDuration,
    activityType,
    activityDescription,
  } = req.body;

  const activity = await RecordModel.findById(_id);

  if (activityDate) activity.activityDate = activityDate;
  if (activityName) activity.activityName = activityName;
  if (activityDuration) activity.activityDuration = activityDuration;
  if (activityType) activity.activityType = activityType;
  if (activityDescription) activity.activityDescription = activityDescription;
  const validateResult = updateRequestSchema.validate(req.body);
  if (validateResult.error) {
    // failed validation
    return res.status(400).send(validateResult.error);
  } else {
    await activity.save();
    res.status(201).send(`Activity with the id: ${_id} has been updated `);
  }
};
