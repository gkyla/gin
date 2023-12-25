import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";

export default async function () {
  const { auth } = await useFirebase();
  const { getUserData } = await useFirestore();

  function getCurrentUser() {
    return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(auth, (user) => {
        removeListener();
        resolve(user);
      });
    });
  }

  function getUserWithId(id) {
    // const userRecords =
  }

  async function login(username, password) {
    try {
      const userData = await getUserData({ username });
      console.log(userData);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData[0].email,
        password,
      );
      return userCredential;
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    return await signOut(auth);
  }

  return { login, logout, getCurrentUser };
}
