import { onSnapshot, collection } from "firebase/firestore"

export const useClientStore = defineStore('clients', {
  state: () => ({
    initialized: false,
    data: [] as Client[]
  }), //state
  getters: {
    client: (state) => {
      const clients = {} as Record<string, Client>
      state.data.forEach((client) => {
        clients[client.clientId] = client
      })
      return clients
    }
  }, //getters
  actions: {
    initialize() {
      if (this.initialized) return;
      const { $db } = useNuxtApp()

      onSnapshot(collection($db, 'clients'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const client = change.doc.data() as Client;
            this.data.push(client);
          }
          if (change.type === 'modified') {
            const index = this.data.findIndex((client) => client.clientId === change.doc.id);
            this.data[index] = change.doc.data() as Client;
          }
          if (change.type === 'removed') {
            const index = this.data.findIndex((client) => client.clientId === change.doc.id);
            this.data.splice(index, 1);
          }
        });
        this.initialized = true;
      });
    }
  }, //actions
})