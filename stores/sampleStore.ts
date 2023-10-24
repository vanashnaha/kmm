import { collection, onSnapshot } from "firebase/firestore"

export const useSampleStore = defineStore('sample', {
  state: () => ({
    initialized: false,
    clients: []
  }), //state
  getters: {
  }, //getters
  actions: {
    initialize() {
      const { $db } = useNuxtApp()
      const clientsRef = collection($db, "clients")
    }

  }, //actions
})