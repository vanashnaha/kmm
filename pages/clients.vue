<template>
  <div>
    <v-container>

      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title>Clients</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="create"
                 variant="tonal">
            <v-icon>mdi-plus</v-icon> Add New Client
          </v-btn>
        </v-toolbar>

        <v-card-item>
          <v-data-table :items="clientStore.data"
                        :headers="headers"
                        :search="search"
                        @click:row="edit">
            <template v-slot:top>
              <div class="d-flex flex-row justify-space-between p-3">
                <v-text-field v-model="search"
                              label="Search"
                              single-line
                              hide-details
                              prepend-inner-icon="mdi-magnify">
                </v-text-field>
              </div>
            </template>
          </v-data-table>

        </v-card-item>
      </v-card>

    </v-container>


    <v-navigation-drawer v-model='navigationDrawer'
                         location="right"
                         :width="width"
                         v-if='navigationDrawer'
                         temporary
                         scrim
                         persistent
                         :client="client">
      <ClientForm v-if='navigationDrawer'
                  @close="navigationDrawer = false"
                  @set="set"
                  @remove="remove" />
    </v-navigation-drawer>

    <v-snackbar v-model="snackbar.show"
                loaction="top right"
                :color="snackbar.color">{{ snackbar.text }}</v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuid } from 'uuid';
import { setClient, deleteClient } from "@/composables/clients";
const clientStore = useClientStore();
clientStore.initialize();

const width = ref<number>(600);
const headers = [
  { title: " Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Phone", key: "tel.cell" },
  { title: "Brokerage", key: "brokerage.name" },

  { title: "Drive", key: "driveLocation" }
]

const search = ref<string>('');
const navigationDrawer = ref<boolean>(false);


const client = ref<Client>(JSON.parse(JSON.stringify(clientTemplate)));
provide("client", client);

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
});

onMounted(() => {
  width.value = Math.min(window.innerWidth, 600);
  window.addEventListener('resize', () => {
    width.value = Math.min(window.innerWidth, 600);
  });
});


function create() {
  client.value = JSON.parse(JSON.stringify(clientTemplate))
  client.value.clientId = uuid();
  navigationDrawer.value = true;
}

function edit(e: Event, data: any) {
  client.value = data.item;
  navigationDrawer.value = true;
}

async function set() {
  console.log("Saving client", client);

  await setClient(client.value)
    .then(() => {
      console.log("Document successfully written!");
      snackbar.value.text = "Client saved";
      snackbar.value.color = "success";
      snackbar.value.show = true;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    })
    .finally(() => {
      console.log("Done");
      navigationDrawer.value = false;

    })
}
provide("set", set);

async function remove() {
  console.log("Delete Client", client.value.clientId)
  await deleteClient(client.value.clientId)
    .then(() => {
      console.log("Document successfully deleted!");
      snackbar.value.text = "Client deleted";
      snackbar.value.color = "success";
      snackbar.value.show = true;
    }).catch((error) => {
      console.error("Error removing document: ", error);
    })
    .finally(() => {
      console.log("Done");
      navigationDrawer.value = false;
    })
}
provide("remove", remove);
</script>

<style scoped></style>