<template>
  <v-card v-for="order in orderStore.data"
          class="mb-2"
          :key="order.id">
    <v-card-title>{{ order.id }}</v-card-title>
    <pre>{{ order }}</pre>

  </v-card>
</template>

<script setup lang="ts">

const orderStore = useOrderStore();
orderStore.initialize();

const clientStore = useClientStore();
clientStore.initialize();

</script>