import { getFirestore } from "firebase-admin/firestore";

const app = getFirebaseApp();
const db = getFirestore(app);

export async function isNisExists(nis) {
  const queryNis = await db
    .collection("users-nis")
    .where("nis", "==", nis)
    .get();

  let nisDoc = null;
  queryNis.forEach((doc) => {
    if (doc.exists) {
      nisDoc = doc.data();
      console.log("doc exists", doc.data());
    }
  });

  return nisDoc;
}
