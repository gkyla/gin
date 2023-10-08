import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp({
  credential: applicationDefault(),
});

const auth = getAuth(app);
const db = getFirestore(app);
// const usersNikRef = collection(db, "users-nik");

export default defineEventHandler(async (event) => {
  /* TODO: Tambahin data tambahan ke firestore/metadata */

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

    await userNisCollection.doc(nis).set({
      email,
    });
    await userMetadataCollection.doc(nis).set({
      name,
    });

    return {
      createdUser,
      message: `User dengan ${nis} (${name}) telah berhasil dibuat`,
    };
  }
});
