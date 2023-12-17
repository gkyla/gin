import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { to } from "await-to-js";

const app = getFirebaseApp();
const auth = getAuth(app);
const db = getFirestore(app);

export default defineEventHandler(async (event) => {
  const { userInput } = await readBody(event);

  /* TODO: Check if admin */

  let userData = {};
  const userDataCollection = db.collection("users-nis");
  const metaDataCollection = db.collection("users-metadata");

  /* Find with precise value of nis or email */

  const validate = validateNisOrEmail(userInput);
  console.log(validate);
  if (validate.error) {
    return validate.error;
  }

  async function findQuery(query) {
    const populatedData = {};
    query.forEach((doc) => {
      populatedData.data = { ...doc.data(), id: doc.id };
    });

    const [err, dataMetadata] = await to(
      metaDataCollection.doc(populatedData?.data?.id).get(),
    );

    if (err) {
      console.log("woi");
      return;
    }

    populatedData.metadata = dataMetadata.data();
    return populatedData;
  }

  if (validate.type === "nis") {
    const querySnapshot = await userDataCollection
      .where("nis", "==", validate.value)
      .get();

    const [errQuery, data] = await to(findQuery(querySnapshot));

    if (errQuery) {
      throw createError({
        statusMessage: `User "${validate.value}" was not found`,
      });
    } else {
      userData = data;
    }
  }

  if (validate.type === "email") {
    const querySnapshot = await userDataCollection
      .where("email", "==", validate.value)
      .get();

    const [errQuery, data] = await to(findQuery(querySnapshot));

    if (errQuery) {
      throw createError({
        statusMessage: `User "${validate.value}" was not found`,
      });
    } else {
      userData = data;
    }
  }

  console.log({ userData, value: validate.value });
  return userData;
});
