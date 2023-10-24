<template>
  <div>
    <v-toolbar title="Walks"
               color="primary">
      <v-spacer></v-spacer>
      <v-btn prepend-icon="mdi-plus"
             variant="tonal"
             @click="newWalkSet">New Walk Set</v-btn>
    </v-toolbar>


    <div id="Walks">
      <v-alert v-for="(walk, walkIndex) in client.walks">

        <div class="flex gap-2 justify-space-between align-center">


          <v-text-field label='FSA'
                        v-model="client.walks[walkIndex].label"
                        hide-details
                        density="compact" />

          <v-text-field v-model="walkCode"
                        density="compact"
                        hide-details
                        class=""
                        label="Add Code"
                        @keyup.enter="addWalkCode(walk.walkId)" />


          <v-btn icon="mdi-delete"
                 size="x-small"
                 color="error"
                 @click="deleteWalkSet(walk.walkId)" />

        </div>
        <div class="flex gap-2 mt-3">

          <v-chip-group>
            <v-chip v-for="code in walk.codes"
                    closable
                    @click:close="deleteWalkCode(walk.walkId, code)"> {{ code }} </v-chip>

          </v-chip-group>

        </div>



      </v-alert>
    </div>

  </div>
</template>

<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import contenteditable from 'vue-contenteditable'
const isEditable = ref(false)

const client = inject('client') as Ref<Client>;

const walkCode = ref('');

function newWalkSet() {
  console.log("New Walk Set")
  client.value.walks.push({
    walkId: uuid(),
    label: "New Walk Set",
    codes: []
  })
}

function editWalkSet(walkId: string) {
  console.log("Edit Walk Set", walkId)
}


function deleteWalkSet(walkId: string) {
  client.value.walks = client.value.walks.filter(walk => walk.walkId !== walkId)
}

function addWalkCode(walkId: string) {
  const walkIndex = client.value.walks.findIndex(walk => walk.walkId === walkId)
  console.log("Walk Index", walkIndex, walkCode.value.toUpperCase())

  if (walkIndex > -1) {
    client.value.walks[walkIndex].codes.push(walkCode.value.toUpperCase())
    walkCode.value = ''
  }
}


function deleteWalkCode(walkId: string, code: string) {
  const index = client.value.walks.findIndex(walk => walk.walkId === walkId);
  if (index > -1) {
    client.value.walks[index].codes = client.value.walks[index].codes.filter(c => c !== code)
  }


} 
</script>

<style scoped></style>