import { getFirestore } from "firebase-admin/firestore";
import Joi from "joi";

const app = getFirebaseApp();
const db = getFirestore(app);

export async function isNisExists(nis) {
  const queryNis = await db
    .collection("users-nis")
    .where("nis", "==", nis)
    .get();

  let nisDoc = null;
  queryNis.forEach((doc) => {
    if (doc.exists) {
      nisDoc = doc.data();
      console.log("doc exists", doc.data());
    }
  });

  return nisDoc;
}

const nisSchema = Joi.string().alphanum().min(3).max(20);
const emailSchema = Joi.string().email({ tlds: { allow: false } });

export function validateNisOrEmail(value) {
  /* 
  Since we are also performing validation in the frontend, which is not submitting a value, if an error occurs when we reach this endpoint, it will be displayed as "Value cannot be empty," whereas the frontend may error due to two conditions (submitted with no value or inappropriate type of user input).
   */

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
