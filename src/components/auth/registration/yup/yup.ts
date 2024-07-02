import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .required("Fill the field!")
    .email("Wrong format of mail!")
    .max(20, "20 chars are maximum value for email"),
  password: yup
    .string()
    .required("Fill the field!")
    .min(7, "Password should contain 7 symbols minimum!")
    .max(14, "Password must be at most 14 characters"),
  phone_number: yup
    .string()
    .required("Fill the field!")
    .min(10, "Phone number should contain at least 10 numbers!")
    .max(10, "Phone number must be at most 10 characters"),
  first_name: yup
    .string()
    .required("Fill the field!")
    .max(10, "First name must be at most 10 characters"),
  last_name: yup
    .string()
    .required("Fill the field!")
    .max(15, "Last name must be at most 15 characters"),
  nick_name: yup
    .string()
    .required("Fill the field!")
    .max(10, "Nick name must be at most 10 characters"),
  description: yup
    .string()
    .required("Fill the field!")
    .min(1, "Description should contain at least one character!")
    .max(120, "120 chars are maximum values of characters for description!"),
  position: yup
    .string()
    .required("Fill the field!")
    .max(10, "Position must be at most 10 characters"),
});
