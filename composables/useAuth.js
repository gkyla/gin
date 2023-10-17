import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default async function () {
  const { auth } = await useFirebase();
  const { getUserEmailByNIS } = await useFirestore();

  function getCurrentUser() {
    return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(auth, (user) => {
        removeListener();
        resolve(user);
      });
    });
  }

  async function login(nis, password) {
    /* TODO: dirubah untuk login menggunakan nis 
    
          Flow: ambil email di firestore dengan nis yang sudah ditentukan
        
        */

    try {
      const userData = await getUserEmailByNIS(nis);
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
