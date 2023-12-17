import Joi from "joi";

export default function () {
  const nisSchema = Joi.string().alphanum().min(3).max(20);
  const emailSchema = Joi.string().email({ tlds: { allow: false } });

  function validateNisOrEmail(value) {
    if (!value) return { error: "Value cannot be empty" };

    const isNisValid = nisSchema.validate(value);
    if (!isNisValid.error) {
      return { ...isNisValid, type: "nis" };
    } else {
      const isEmailValid = emailSchema.validate(value);
      if (!isEmailValid.error) {
        return { ...isEmailValid, type: "email" };
      }
    }

    return { error: "Please fill with correct nis or email address 😊" };
  }

  return { nisSchema, emailSchema, validateNisOrEmail };
}
