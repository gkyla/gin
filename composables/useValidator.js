import Joi from "joi";

export default function () {
  const usernameSchema = Joi.string().alphanum().min(3).max(20);
  const emailSchema = Joi.string().email({ tlds: { allow: false } });

  function validateUsernameOrEmail(value) {
    if (!value) return { error: "Value cannot be empty" };

    const isUsernameValid = usernameSchema.validate(value);
    if (!isUsernameValid.error) {
      return { ...isUsernameValid, type: "username" };
    } else {
      const isEmailValid = emailSchema.validate(value);
      if (!isEmailValid.error) {
        return { ...isEmailValid, type: "email" };
      }
    }

    return { error: "Please fill with correct Username or Email address 😊" };
  }

  return { usernameSchema, emailSchema, validateUsernameOrEmail };
}
