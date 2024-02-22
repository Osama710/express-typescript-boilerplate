import * as yup from "yup";
import * as constants from "../constants";

const loginSchema = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .trim()
    .min(constants.PASSWORDMINLENGTH)
    .max(constants.PASSWORDMAXLENGTH)
    .matches(constants.PASSWORDREGEX, constants.PASSWORDMESSAGE)
    .required(),
}).required(constants.REQUIREDFIELDSMESSAGE).noUnknown(true).strict();

export { loginSchema };
