import * as yup from "yup";

export const validationSchema = yup.object({
  resumen: yup.string().trim().required("El Resumen es obligatorio"),
  cumplimiento: yup.string().trim().required("El Cumplimiento es obligatorio"),
  comportamiento: yup
    .string()
    .trim()
    .required("El Comportamiento es obligatorio"),
  usoYCuidado: yup
    .string()
    .trim()
    .required("El uso y cuidado es obligatorio de los recursos materiales"),
  recomendaciones: yup
    .string()
    .trim()
    .required("Las Recomendaciones son obligatorias"),
  evaluacionFinal: yup.string().required("Debes seleccionar una opción"),
});
