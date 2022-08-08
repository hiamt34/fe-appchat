import * as yup from "yup";

export const validateLogin = yup.object().shape({
  password: yup.string().required().min(6),
  email: yup.string().email(),
});

export const validateRegister = yup.object().shape({
  name: yup.string().required("Name is require!"),
  password: yup
    .string()
    .required("password is require!")
    .min(6, "password should be 6 chars minimum")
    .matches(/^[a-zA-Z0-9_.-]*$/, "password is latin!"),
  email: yup.string().email("is not email").required("email is require!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "password must match!"),
});

export const validateConten = yup.object().shape({
  conten: yup.string().trim().required("Conten is require!"),
})