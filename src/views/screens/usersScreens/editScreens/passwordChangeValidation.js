import * as yup from "yup";

export const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

export const validationSchema = yup.object({
  newPassword: yup
    .string()
    .matches(/^(\S+$)/, "La contraseña no debe tener espacios en blanco")
    .matches(/[0-9]/, "La contraseña debe tener al menos un número")
    .matches(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
    .matches(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscuña")
    .min(6, "La contraseña debe tener como mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("newPassword"), null], "Las contraseñas no coinciden")
    .required("Confirmar la contraseña es obligatorio"),
});
