import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp({
  credential: applicationDefault(),
});

const auth = getAuth(app);
const db = getFirestore(app);

export default defineEventHandler(async (event) => {
  const { nis, role, email, password, name, idToken } = await readBody(event);

  const decodedToken = await auth.verifyIdToken(idToken);
  const userIsAdmin = await auth.getUser(decodedToken.uid);
  console.log({ decodedToken, userIsAdmin, idToken });
  if (userIsAdmin.customClaims?.role !== "Admin") {
    throw createError({
      statusMessage:
        "Maaf kamu tidak memiliki akses/wewenang untuk mengubah atau membuat user",
    });
  } else {
    const createdUser = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    console.log({ createdUser, userIsAdmin });
    await auth.setCustomUserClaims(createdUser.uid, {
      role,
    });

    const userNisCollection = db.collection("users-nis");
    const userMetadataCollection = db.collection("users-metadata");

    await userNisCollection.doc(createdUser.uid).set({
      email,
      nis,
    });
    await userMetadataCollection.doc(createdUser.uid).set({
      name,
    });

    return {
      createdUser,
      message: `User ${nis} (${name}) telah berhasil dibuat`,
    };
  }
});
