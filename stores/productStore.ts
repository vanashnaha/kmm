import { collection, onSnapshot } from "firebase/firestore"

export const useProductStore = defineStore('products', {
  state: () => ({
    initialized: false,
    data: [] as Product[]
  }), //state
  getters: {
    record: (state) => {
      const products = {} as Record<string, Product>
      state.data.forEach(e => {
        products[e.id] = e
        console.log("Records", e)

      })
      return products
    }
  }, //getters
  actions: {
    initialize() {
      if (this.initialized) return;
      const { $db } = useNuxtApp()

      onSnapshot(collection($db, 'products'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const row = change.doc.data() as Product;
            this.data.push(row);
          }
          if (change.type === 'modified') {
            const index = this.data.findIndex((row) => row.id === change.doc.id);
            this.data[index] = change.doc.data() as Product;
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