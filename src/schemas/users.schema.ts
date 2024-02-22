import * as yup from "yup";
import * as constants from "../constants";

const createUserSchema = yup
  .object()
  .shape({
    first_name: yup.string().trim().required(),
    last_name: yup.string().trim().required(),
    email: yup.string().trim().email().required(),
  })
  .required(constants.REQUIREDFIELDSMESSAGE)
  .noUnknown(true)
  .strict();

const updateUserSchema = yup
  .object()
  .shape({
    first_name: yup.string().trim().optional(),
    last_name: yup.string().trim().optional(),
    email: yup.string().trim().email().optional(),
  })
  .required(constants.REQUIREDFIELDSMESSAGE)
  .noUnknown(true)
  .strict();

export { createUserSchema, updateUserSchema };
