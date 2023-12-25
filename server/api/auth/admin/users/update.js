import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { to } from "await-to-js";

const app = getFirebaseApp();
const auth = getAuth(app);
const db = getFirestore(app);

export default defineEventHandler(async (event) => {
  const { userInput } = await readBody(event);

  const userDataCollection = db.collection("users-username");
  const metaDataCollection = db.collection("users-metadata");

  //   userDataCollection.doc
  /* TODO: Check if admin */

  const [errUserData] = await to(
    userDataCollection.doc(userInput.id).update({
      email: userInput.email,
      username: userInput.username,
    }),
  );

  if (errUserData) {
    throw createError({
      statusMessage: "Error updating user data, code: 22",
    });
  }

  const [errMeta] = await to(
    metaDataCollection.doc(userInput.id).update({
      name: userInput.name,
    }),
  );

  if (errMeta) {
    throw createError({
      statusMessage: "Error updating user data, code: 23",
    });
  }

  return {
    message: "Update success !",
  };
});
