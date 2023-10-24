<template>
  <div>
    <v-overlay :model-value="overlay"
               class="align-center justify-center"
               persistent>
      <v-progress-circular color="primary"
                           indeterminate
                           size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup lang="ts">
const overlay = ref(true);
</script>
