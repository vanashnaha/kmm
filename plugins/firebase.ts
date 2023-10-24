import { initializeApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = config.public.firebaseClient as FirebaseOptions;

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

  nuxtApp.vueApp.provide('db', db);
  nuxtApp.provide('db', db);

  nuxtApp.vueApp.provide('storage', storage);
  nuxtApp.provide('storage', storage);


});