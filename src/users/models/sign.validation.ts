import * as Joi from 'joi';

export const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  phone_number: Joi.string(),
  profile: Joi.string(),
  user_type: Joi.string().valid('admin', 'user', 'employee').required(),
  employee_type: Joi.string().valid('Permanent', 'Contract'),
  company: Joi.string().required(),
  status: Joi.string().valid('active', 'deactive'),
  dob: Joi.string().isoDate(),
  gender: Joi.string().valid('male', 'female'),
  is_active: Joi.boolean(),
  present_address: Joi.string(),
  permanent_address: Joi.string(),
  user_designation: Joi.string(),
});
