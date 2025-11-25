import * as Joi from 'joi';

export const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  profile: Joi.string().optional(),
  user_type: Joi.string().valid('admin', 'user', 'employee').required(),
  employee_type: Joi.string().valid('Permanent', 'Contract').optional(),
  company: Joi.string().required(),
  status: Joi.string().valid('active', 'deactive').optional(),
  dob: Joi.string().isoDate().optional(),
  gender: Joi.string().valid('male', 'female').optional(),
  is_active: Joi.boolean().optional(),
  present_address: Joi.string().optional(),
  permanent_address: Joi.string().optional(),
  user_designation: Joi.string().optional(),
});
