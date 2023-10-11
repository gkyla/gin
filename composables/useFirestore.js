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

  // function buildUserNisRef(nis) {
  //   return doc(db, "users-nis", nis);
  // }

  function buildUserMetadataRef(uid) {
    return doc(db, "users-metadata", uid);
  }

  async function getUserEmailByNIS(nis) {
    const nisRef = collection(db, "users-nis");

    const q = query(nisRef, where("nis", "==", nis));
    const data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  }

  async function getData(doc) {
    try {
      return (await getDoc(doc)).data();
    } catch (error) {
      console.error("Error getting document:", e);
    }
  }

  return { buildUserMetadataRef, getData, getUserEmailByNIS };
}
