import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = getFirebaseApp();

const auth = getAuth(app);
const db = getFirestore(app);

export default defineEventHandler(async (event) => {
  const { email, username, name, role, password } = await readBody(event);

  /* Cek 
    apakah username sudah ada didalam database?
    apakah email sudah terdaftar ?
  */

  if (await isUsernameExists(username)) {
    throw createError({
      statusMessage: `Username "${username}" sudah terdaftar di sistem, silakan masukan Username yang lain`,
      data: {
        message: `Username "${username}" sudah terdaftar di sistem, silakan masukan Username yang lain`,
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
      /* TODO: Parse the error 
      https://firebase.google.com/docs/auth/admin/errors
      */

      throw createError({
        statusMessage: `${err.errorInfo.message} (${err.errorInfo.code})`,
        data: {
          ...err.errorInfo,
          isError: true,
        } /* pass data to the client */,
      });
    });

  // console.log("createdUser", createdUser);
  if (role === "Admin" || role === "admin") {
    throw createError({
      statusMessage:
        "Maaf role tersebut tidak tersedia pada halaman registrasi :p",
    });
  }
  await auth.setCustomUserClaims(createdUser.uid, {
    role,
  });
  await db.collection("users-username").doc(createdUser.uid).set({
    username,
    email,
  });
  await db.collection("users-metadata").doc(createdUser.uid).set({
    name,
  });
  return {
    message: `Akun dengan nama ${name} & username ${username} telah berhasil terdaftar!`,
    isError: false,
  };
});
