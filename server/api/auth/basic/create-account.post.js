import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = getFirebaseApp();

const auth = getAuth(app);
const db = getFirestore(app);

export default defineEventHandler(async (event) => {
  const { email, nis, name, role, password } = await readBody(event);
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
        statusMessage: `Alamat email sudah terdaftar oleh akun lain (${err.errorInfo.code})`,
      });
    });

  console.log("createdUser", createdUser);
  if (role === "Admin" || role === "admin") {
    throw createError({
      statusMessage:
        "Maaf role tersebut tidak tersedia pada halaman registrasi :p",
    });
  }
  await auth.setCustomUserClaims(createdUser.uid, {
    role,
  });
  await db.collection("users-nis").doc(createdUser.uid).set({
    nis,
    email,
  });
  await db.collection("users-metadata").doc(createdUser.uid).set({
    name,
  });
  return {
    message: `Akun dengan nama ${name} dengan nis ${nis} telah berhasil terdaftar!`,
    isError: false,
  };
});