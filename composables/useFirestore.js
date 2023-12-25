import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

export default async function () {
  const { db } = await useFirebase();

  function buildUserMetadataRef(uid) {
    return doc(db, "users-metadata", uid);
  }

  async function getUserData({ username, email }) {
    /* TODO: 
      ini mungkin harus dipindahin ke backend, karna ngambil user info 
      cuman bisa lewat firebase admin sdk 
    */
    if (!username && !email) return;

    if (username) {
      console.log("wew s");
      const refArg = collection(db, "users-username");
      const q = query(refArg, where("username", "==", username));
      return await findQuery(q);
    }

    if (email) {
      const refArg = collection(db, "users-username");
      const q = query(refArg, where("email", "==", email));
      return await findQuery(q);
    }

    async function findQuery(query) {
      const data = [];
      const querySnapshot = await getDocs(query);
      querySnapshot.forEach((doc) => {
        console.log(doc);
        /* TODO: extract nama dll ke dalam data ini */

        data.push({ ...doc.data(), id: doc.id });
      });
      return data;
    }
  }

  async function getData(doc) {
    try {
      return (await getDoc(doc)).data();
    } catch (error) {
      console.error("Error getting document:", e);
    }
  }

  return { buildUserMetadataRef, getData, getUserData };
}
