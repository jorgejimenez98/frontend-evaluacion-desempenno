import * as yup from "yup";

export const initialValues = {
  name: "",
  pos_db_name: "",
  pms_db_name: "",
  zunPrUnidadOrganizativaId: "",
};

export const validationSchema = yup.object({
  name: yup.string().trim().required("El nombre es obligatorio"),
  pos_db_name: yup
    .string()
    .required("Este campo es obligatorio")
    .matches(/^(\S+$)/, "Este campo no debe tener espacios en blanco"),
  pms_db_name: yup
    .string()
    .required("Este campo es obligatorio")
    .matches(/^(\S+$)/, "Este campo no debe tener espacios en blanco"),
  zunPrUnidadOrganizativaId: yup
    .number()
    .required("El id de la unidad organizativa es obligatorio")
    .test(
      "Es positivo?",
      "El valor del ID no puede ser negativo!",
      (value) => value > 0
    )
});
