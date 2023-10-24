<template>
  <div class="mt-4 max-w-3xl m-auto w-full">
    <v-form @submit.prevent="submit">
      <div class="flex gap-2">
        <v-select label="Client"
                  :items="clientStore.data"
                  item-title="name"
                  item-value="clientId"
                  v-model="order.clientId"
                  :error-messages="v$.clientId.$errors.map(e => e.$message as string)"></v-select>
        <v-select label="Status"
                  :items="status"
                  v-model="order.status"
                  :error-messages="v$.status.$errors.map(e => e.$message as string)"></v-select>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical"
                   size="x-small"
                   v-bind="props"></v-btn>
          </template>
          <v-list nav>
            <v-list-item @click="deleteDialog = true"><v-icon icon="mdi-delete" /> Delete</v-list-item>
          </v-list>
        </v-menu>

      </div>

      <h6 class="text-2xl flex my-2">
        <span class="grow">Order Items</span>
        <span>
          <v-btn icon="mdi-plus"
                 size="x-small"
                 color="primary"
                 @click="addItem" />
        </span>
      </h6>
      <OrderItem v-for="(item, index) in order.items"
                 :key="item.id"
                 :item="item"
                 @deleteItem="order.items.splice(index, 1)" />

      <v-textarea label="Notes"
                  v-model="order.notes"></v-textarea>

      <div class="flex">
        <v-spacer></v-spacer>
        <v-btn type="Submit">Save Order</v-btn>
      </div>
    </v-form>

    <OrderDeleteDialog v-if="deleteDialog"
                       @close="deleteDialog = false" />

    <Loading v-if="!isReady" />
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const orderStore = useOrderStore();
orderStore.initialize();

const clientStore = useClientStore();
clientStore.initialize();

const productStore = useProductStore();
productStore.initialize();


const order = ref<Order>({
  id: nanoid(6),
  created: new Date(),
  updated: new Date(),
  clientId: '',
  status: '',
  items: [],
  notes: '',
  subTotal: 0,
  tax: 0,
  totalAmountDue: 0,
  payments: [],
  balanceAmountDue: 0,
})
const deleteDialog = ref(false)
const rules = {
  clientId: { required: helpers.withMessage('Client is required', required) },
  status: { required: helpers.withMessage('Status is required', required) },
}
const v$ = useVuelidate(rules, order)

const isReady = computed(() => {

  //stores are loaded
  if (!productStore.initialized || !clientStore.initialized) return false;


  const route = useRoute()
  const id = route.params.id[0]

  if (id === 'create') return true

  //get order from store
  const index = orderStore.data.findIndex(o => o.id === id)
  if (index > -1) {
    order.value = JSON.parse(JSON.stringify(orderStore.data[index])) as Order
    return true
  }

  //order not found
  alert('Order not found => ' + id)
  navigateTo('/orders')
  return false


})

function addItem() {
  order.value.items.push({
    id: nanoid(6),
    productId: '',
    options: {
      size: null,
      material: null,
      coating: null,
      laminate: null,
      color: null,
      bundling: null,
      finishing: null,
    },
    quantity: 0,
    cost: 0,
    notes: "",
  })
}

async function submit() {
  const result = await v$.value.$validate()
  if (!result) return

  setOrder(order.value)
    .then(() => {
      console.log('Order saved')
      navigateTo('/orders')
    })
    .catch(err => {
      alert(err)
    })
}



const address = {
  clientId: '',
  addressId: '',
  company: '',
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  province: '' as unknown as ProvinceKey,
  postalCode: '',
  country: '',
  phone: '',
  email: '',
  isDeleted: false,
  isActive: true,
}
type Address = typeof address



const deliveryAddresses: Address[] = []


</script>

<style scoped></style>