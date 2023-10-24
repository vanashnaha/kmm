import { collection, onSnapshot } from "firebase/firestore"

export const useOrderStore = defineStore('orders', {
  state: () => ({
    initialized: false,
    data: [] as Order[]
  }), //state
  getters: {
  }, //getters
  actions: {
    initialize() {
      if (this.initialized) return;
      const { $db } = useNuxtApp()

      onSnapshot(collection($db, 'orders'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const row = change.doc.data() as Order;
            this.data.push(row);
          }
          if (change.type === 'modified') {
            const index = this.data.findIndex((row) => row.id === change.doc.id);
            this.data[index] = change.doc.data() as Order;
          }
          if (change.type === 'removed') {
            const index = this.data.findIndex((row) => row.id === change.doc.id);
            this.data.splice(index, 1);
          }
        });
        this.initialized = true;
      });
    }
  }, //actions
})