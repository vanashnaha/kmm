<template>
  <div>
    <v-dialog v-model="dialog"
              width="auto">
      <v-alert title="Delete Product"
               type="error">

        <p>Are you sure you want to delete this product?</p>

        <div class="flex gap-2">

          <v-btn @click="$emit('close')">Cancel</v-btn>
          <v-btn @click="remove">Delete</v-btn>
        </div>
      </v-alert>

    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const dialog = ref(true)
const route = useRoute();

function remove() {
  console.log('remove', route.params.id[0]);

  deleteProduct(route.params.id[0])
    .then(() => {
      console.log('deleted', route.params.id[0]);
      navigateTo('/products');
    })
    .catch((err) => {
      console.log('error', err);
    })

}
</script>
