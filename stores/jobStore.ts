import { onSnapshot } from "firebase/firestore"

export const useJobStore = defineStore('jobs', {
  state: () => ({
    initialized: false,
    clients: []
  }), //state
  getters: {
  }, //getters
  actions: {
    initialize() {
      if (this.initialized) return
    }

  }, //actions
})