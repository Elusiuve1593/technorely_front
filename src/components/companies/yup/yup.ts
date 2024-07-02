import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Fill the field!")
    .max(10, "Name must be at most 10 characters"),
  address: yup
    .string()
    .required("Fill the field!")
    .max(15, "Address must be at most 15 characters"),
  service_of_activity: yup
    .string()
    .required("Fill the field!")
    .max(15, "Service of activity must be at most 15 characters"),
  number_of_employees: yup
    .number()
    .required("Fill the field!")
    .typeError("Fill the field!")
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? 1 : value
    ),
  description: yup
    .string()
    .required("Fill the field!")
    .min(1, "Description should contain at least one character!")
    .max(120, "120 chars are maximum values of characters for description!"),
  type: yup
    .string()
    .required("Fill the field!")
    .max(15, "Type must be at most 15 characters"),
});
