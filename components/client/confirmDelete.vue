<template>
  <div>
    <v-dialog v-model="dialog"
              width="auto"
              persistent
              scrim>
      <v-alert type='error'
               title="Delete Client">
        <p> Are you want to delete this client?</p>

        <p class="flex justify-space-around mt-4">
          <span>
            <v-btn @click="$emit('close')">Cancel</v-btn>
          </span>
          <span>
            <v-btn @click="remove">Confirm</v-btn>
          </span>
        </p>
      </v-alert>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const remove = inject<Function>("remove")
const dialog = ref(true);
</script>

<style scoped></style>