import { v4 as uuidv4 } from "uuid";

let activities = [];

export const searchAllActivities = (req, res) => {
  res.send(activities);
};

export const createActivity = (req, res) => {
  const activity = req.body;
  activities.push({ ...activity, id: uuidv4() });
  res
    .status(201)
    .send(`User with the name ${activity.activityName} added to the database.`);
};

export const searchActivityById = (req, res) => {
  const { id } = req.params;
  const foundActivity = activities.find((activity) => activity.id === id);
  if (foundActivity) {
    return res.send(foundActivity);
  } else {
    return res.status(404).send("Activity not found");
  }
};

export const deleteActivityByID = (req, res) => {
  const { id } = req.params;
  //true keep in array and if false remove from array
  activities = activities.filter((activity) => activity.id !== id);
  res.send(`User with the id ${id} deleted from the database.`);
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

  const activity = activities.find((activity) => activity.id === id);

  if (activityDate) activity.activityDate = activityDate;
  if (activityName) activity.activityName = activityName;
  if (activityDuration) activity.activityDuration = activityDuration;
  if (activityType) activity.activityType = activityType;
  if (activityDescription) activity.activityDescription = activityDescription;

  res.send(`Activity with the id: ${id} has been updated `);
};
