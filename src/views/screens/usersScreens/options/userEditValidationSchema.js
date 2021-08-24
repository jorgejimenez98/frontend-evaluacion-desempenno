import * as yup from "yup";

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
    .matches(/^([^0-9]*)$/, 'El primer nombre no debe contener números')
    .required("Los apellidos son obligatorios"),
  email: yup
    .string()
    .email("Entre un correo válido. Ej: nombre@correo.com")
    .required("El correo es obligatorio"),
});
