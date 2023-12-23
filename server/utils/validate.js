import { getFirestore } from "firebase-admin/firestore";
import Joi from "joi";

const app = getFirebaseApp();
const db = getFirestore(app);

export async function isUsernameExists(username) {
  const queryUsername = await db
    .collection("users-username")
    .where("username", "==", username)
    .get();

  let usernameDoc = null;
  queryUsername.forEach((doc) => {
    if (doc.exists) {
      /* TODO: ini bisa multiple value/nimpa value, check lagi nanti */
      usernameDoc = doc.data();
      console.log("doc exists", doc.data());
    }
  });

  return usernameDoc;
}

const usernameSchema = Joi.string().alphanum().min(3).max(20);
const emailSchema = Joi.string().email({ tlds: { allow: false } });

export function validateUsernameOrEmail(value) {
  /* 
  Since we are also performing validation in the frontend, which is not submitting a value, if an error occurs when we reach this endpoint, it will be displayed as "Value cannot be empty," whereas the frontend may error due to two conditions (submitted with no value or inappropriate type of user input).
   */

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

  return { error: "Please fill with correct username or email address 😊" };
}
