<template>
  <div>
    <VToolbar title="Client Info"
              color="primary">
      <template v-slot:append>
        <v-menu>
          <template v-slot:activator="{ props }">
            <VBtn icon="mdi-dots-vertical"
                  v-bind="props" />

            <VBtn icon="mdi-content-save"
                  @click="$emit('set', client)" />
          </template>

          <v-list>
            <v-list-item @click="confirmDeleteDialog = true">Delete</v-list-item>
          </v-list>
        </v-menu>

        <VBtn icon="mdi-close"
              @click="$emit('close')"></VBtn>
      </template>
    </VToolbar>



    <v-card class="my-3 mx-2"
            elevation="6">
      <v-card-title>
        Primary Contact Info
      </v-card-title>
      <v-card-item>

        <VTextField v-model="client.name"
                    density="compact"
                    hide-details
                    label="Name">
          <template v-slot:append-inner>
            <v-btn icon="mdi-content-copy"
                   color="primary"
                   @click="copy(client.name)"
                   size="x-small" />
          </template>
        </VTextField>

        <VTextField v-model="client.title"
                    density="compact"
                    hide-details
                    label="Title">
          <template v-slot:append-inner>
            <v-btn icon="mdi-content-copy"
                   color="primary"
                   @click="copy(client.title)"
                   size="x-small" />
          </template>
        </VTextField>

        <VTextField v-model="client.company"
                    density="compact"
                    hide-details
                    label="Company">
          <template v-slot:append-inner>
            <v-btn icon="mdi-content-copy"
                   color="primary"
                   @click="copy(client.company)"
                   size="x-small" />
          </template>
        </VTextField>

        <VTextField v-model="client.driveLocation"
                    hide-details
                    density="compact"
                    label="Drive Location"></VTextField>

        <VTextField v-model="client.email"
                    density="compact"
                    hide-details
                    label="Email" />
        <VTextField v-model="client.tel.cell"
                    density="compact"
                    hide-details
                    label="Cell Phone" />
        <VTextField v-model="client.tel.work"
                    density="compact"
                    hide-details
                    label="Work Phone" />

        <VTextarea v-model="client.notes"
                   label="Notes"
                   dense
                   hide-details
                   rows="3" />

      </v-card-item>
    </v-card>

    <v-card class="my-3 mx-2"
            elevation="6">

      <v-card-title class="mt-3">
        Delivery Info
      </v-card-title>

      <v-card-item>

        <VTextField v-model="client.address.office.street"
                    density="compact"
                    hide-details
                    label="Street" />

        <VTextField v-model="client.address.office.city"
                    density="compact"
                    hide-details
                    label="City" />

        <VSelect v-model="client.address.office.province"
                 :items="provinces"
                 item-value="abbreviation"
                 item-title="name"
                 density="compact"
                 hide-details
                 label="Province" />

        <VTextField v-model="client.address.office.postalCode"
                    density="compact"
                    hide-details
                    label="Postal Code" />

      </v-card-item>
    </v-card>

    <v-card class="my-3 mx-2"
            elevation="6">

      <v-card-title>Brokerage</v-card-title>

      <v-card-item>
        <VSelect :items="brokerages"
                 v-model="client.brokerage.parent"
                 density="compact"
                 hide-details
                 label="Brokerage parent" />
        <VTextField v-model="client.brokerage.name"
                    density="compact"
                    hide-details
                    label="Brokerage name" />

        <VTextField v-model="client.brokerage.address.street"
                    density="compact"
                    hide-details
                    label="Brokerage street" />

        <v-checkbox v-model="client.brokerage.hasBrandGuide"
                    density="compact"
                    label="Has Brand Guide" />

      </v-card-item>
    </v-card>


    <v-card class="my-3 mx-2"
            elevation="6">
      <ClientWalks />
    </v-card>
    <v-row>
      <v-col>

        <VBtn block
              color="primary"
              rounded
              size=" x-large"
              class="py-4"
              @click="set">
          <v-icon>mdi-content-save</v-icon>
          Save
        </VBtn>
      </v-col>
    </v-row>

    <ClientConfirmDelete v-if="confirmDeleteDialog"
                         @close="confirmDeleteDialog = false" />
    <pre>{{ client }}</pre>

  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['set', 'close', 'remove'])
const client = inject("client") as Ref<Client>
const set = inject<Function>("set");

const confirmDeleteDialog = ref<boolean>(false);



function copy(text: string) {
  navigator.clipboard.writeText(text);
}

</script>

<style scoped></style>