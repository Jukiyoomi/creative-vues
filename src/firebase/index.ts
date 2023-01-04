import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "@/config";
import router from "@/router";
import { store } from "@/store";
import { toast } from "vue3-toastify";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await store.dispatch("setUser", user);
    // store.commit("setUser", user);
    toast.success(`Successfully signed in ! Hello ${user.displayName} !`);
  } else {
    console.log("sign out");
    await store.dispatch("setUser", null);
    toast.success("Logged Out");
    await router.push({ name: "home" });
  }
});

export async function ifAuthenticated() {
  if (store.state.user) {
    console.log("login done");
    return;
  }
  console.log("login not done");
  await router.push({ name: "home" });
}
