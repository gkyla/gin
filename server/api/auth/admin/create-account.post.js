import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = getFirebaseApp();
const auth = getAuth(app);
const db = getFirestore(app);

export default defineEventHandler(async (event) => {
  const { nis, role, email, password, name, idToken } = await readBody(event);

  const decodedToken = await auth.verifyIdToken(idToken);
  const userIsAdmin = await auth.getUser(decodedToken.uid);
  // console.log({ decodedToken, userIsAdmin, idToken });
  if (userIsAdmin.customClaims?.role !== "Admin") {
    throw createError({
      statusMessage:
        "Maaf kamu tidak memiliki akses/wewenang untuk mengubah atau membuat user",
    });
  } else {
    if (await isNisExists(nis)) {
      throw createError({
        statusMessage:
          "NIS sudah terdaftar, silakan login jika sudah terdaftar, atau masukan NIS yang lain",
        data: {
          message:
            "NIS sudah terdaftar, silakan login jika sudah terdaftar, atau masukan NIS yang lain",
          isError: true,
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
