<template>
  <div class="w-full max-w-5xl m-auto">

    <v-data-table :items="orderList"
                  :headers="headers"
                  :search="search"
                  @click:row="edit">
      <template v-slot:top>
        <div class="flex gap-2">
          <v-text-field label="search"
                        class="grow"
                        prepend-inner-icon="mdi-magnify"
                        outline
                        clearable
                        v-model="search"></v-text-field>
          <v-btn icon="mdi-plus"
                 to="/orders/create"></v-btn>

          <v-btn icon="mdi-cards-outline"
                 to="/orders/cards"></v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'
import { useNow, useDateFormat } from '@vueuse/core'

const orderStore = useOrderStore();
orderStore.initialize();

const clientStore = useClientStore();
clientStore.initialize();


const orderList = computed(() => {
  if (clientStore.initialized && orderStore.initialized) {
    return orderStore.data.map(order => {
      const client = order.clientId ? clientStore.client[order.clientId].name : '';
      return {
        //@ts-ignore
        date: useDateFormat(new Date(order.created.seconds * 1000), 'YYYY-MM-DD'),
        id: order.id,
        client: client,
        status: order.status
      }
    })
  } else {
    return [];
  }
})

const id = nanoid(6);
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Date', key: 'date' },
  { title: 'Client', key: 'client' },
  { title: "Status", key: "status" }
]
const search = ref('');



function edit(e: any, data: any) {
  navigateTo(`/orders/${data.item.id}`);
}

</script>