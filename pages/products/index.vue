<template>
  <div class="w-full max-w-5xl m-auto">

    <v-data-table :items="productStore.data"
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
                 to="/products/create"></v-btn>
        </div>
      </template>

    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'
const productStore = useProductStore();
productStore.initialize();
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Product', key: 'label' }
]
const search = ref('');



function edit(e: any, data: any) {
  navigateTo(`/products/${data.item.id}`);
}

</script>