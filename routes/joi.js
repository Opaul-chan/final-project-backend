import Joi from "joi";

export const createRequestSchema = Joi.object({
  activityDate: Joi.date().required(),
  activityName: Joi.string().required(),
  activityDuration: Joi.number().min(0).required(),
  activityType: Joi.string().required(),
  activityDescription: Joi.string().allow("").required(),
});

export const updateRequestSchema = Joi.object({
  activityDate: Joi.string(),
  activityName: Joi.string(),
  activityDuration: Joi.number().min(0),
  activityType: Joi.string(),
  activityDescription: Joi.string().allow(""),
});
