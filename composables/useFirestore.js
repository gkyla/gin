import { doc, getDoc } from "firebase/firestore";

export default async function () {
  const { db } = await useFirebase();

  function buildUserNisRef(nis) {
    return doc(db, "users-nis", nis);
  }

  function buildUserMetadataRef(nis) {
    return doc(db, "users-metadata", nis);
  }

  async function getData(doc) {
    try {
      return (await getDoc(doc)).data();
    } catch (error) {
      console.error("Error getting document:", e);
    }
  }

  return { buildUserNisRef, buildUserMetadataRef, getData };
}
