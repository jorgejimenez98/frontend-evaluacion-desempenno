import * as yup from "yup";

export const initialValues = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isAdmin: false,
  isFoodAndDrinkBoss: false,
};

export const validationSchema = yup.object({
  username: yup
    .string()
    .required("El nombre de usuario es obligatorio")
    .matches(/^(\S+$)/, "El nombre de usuario no debe tener espacios en blanco")
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres"),
  first_name: yup
    .string()
    .trim()
    .matches(/^([^0-9]*)$/, "El primer nombre no debe tener números")
    .required("El primer nombre es obligatorio"),
  last_name: yup
    .string()
    .trim()
    .matches(/^([^0-9]*)$/, "El primer nombre no debe contener números")
    .required("Los apellidos son obligatorios"),
  email: yup
    .string()
    .email("Entre un correo válido. Ej: nombre@correo.com")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .matches(/^(\S+$)/, "La contraseña no debe tener espacios en blanco")
    .matches(/[0-9]/, "La contraseña debe tener al menos un número")
    .matches(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
    .matches(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscuña")
    .min(6, "La contraseña debe tener como mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Confirmar la contraseña es obligatorio"),
});
