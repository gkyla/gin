import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = getFirebaseApp();
const auth = getAuth(app);
const db = getFirestore(app);

export default defineEventHandler(async (event) => {
  const { username, role, email, password, name, idToken } =
    await readBody(event);

  const decodedToken = await auth.verifyIdToken(idToken);
  const userIsAdmin = await auth.getUser(decodedToken.uid);
  // console.log({ decodedToken, userIsAdmin, idToken });
  if (userIsAdmin.customClaims?.role !== "Admin") {
    throw createError({
      statusMessage:
        "Maaf kamu tidak memiliki akses/wewenang untuk mengubah atau membuat user",
      data: {
        isError: true,
        message:
          "Maaf kamu tidak memiliki akses/wewenang untuk mengubah atau membuat user",
      },
    });
  } else {
    if (await isUsernameExists(username)) {
      throw createError({
        statusMessage: `Username "${username}" sudah terdaftar di sistem, silakan coba masukan Username yang lain`,
        data: {
          message: `Username "${username}" sudah terdaftar di sistem, silakan coba masukan Username yang lain`,
          isError: true,
          type: "username",
        },
      });
    }

    const createdUser = await auth
      .createUser({
        email,
        password,
        displayName: name,
      })
      .catch((err) => {
        throw createError({
          statusMessage: `${err.errorInfo.message} (${err.errorInfo.code})`,
          data: {
            ...err.errorInfo,
            isError: true,
          } /* pass data to the client */,
        });
      });

    // console.log({ createdUser, userIsAdmin });
    await auth.setCustomUserClaims(createdUser.uid, {
      role,
    });

    const userUsernameCollection = db.collection("users-username");
    const userMetadataCollection = db.collection("users-metadata");

    await userUsernameCollection.doc(createdUser.uid).set({
      email,
      username,
    });
    await userMetadataCollection.doc(createdUser.uid).set({
      name,
    });

    return {
      createdUser,
      message: `User ${username} (${name}) telah berhasil dibuat`,
    };
  }
});
