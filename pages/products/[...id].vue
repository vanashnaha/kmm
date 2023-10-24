<template>
  <div class="w-full max-w-5xl m-auto">
    <v-form @submit.prevent="submit"
            v-if="product !== null">
      <div class="flex gap-2">
        <v-text-field label="Product"
                      v-model="product.label"></v-text-field>

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


      <div class="flex gap-2 flex-wrap">
        <v-checkbox label="Materials"
                    v-model="options.material"
                    @update:model-value="setValue('material')"></v-checkbox>
        <v-checkbox label="Size"
                    v-model="options.size"
                    @update:model-value="setValue('size')"></v-checkbox>
        <v-checkbox label="Coating"
                    v-model="options.coating"
                    @update:model-value="setValue('coating')"></v-checkbox>
        <v-checkbox label="Laminate"
                    v-model="options.laminate"
                    @update:model-value="setValue('laminate')"></v-checkbox>
        <v-checkbox label="Color"
                    v-model="options.color"
                    @update:model-value="setValue('color')"></v-checkbox>
        <v-checkbox label="Finishing"
                    v-model="options.finishing"
                    @update:model-value="setValue('finishing')"></v-checkbox>
        <v-checkbox label="Bundling"
                    v-model="options.bundling"
                    @update:model-value="setValue('bundling')"></v-checkbox>


        <v-checkbox label="Min"
                    v-model="options.min"
                    @update:model-value="setValue('min')"></v-checkbox>

        <v-checkbox label="Max"
                    v-model="options.max"
                    @update:model-value="setValue('max')"></v-checkbox>

      </div>



      <div class="flex gap-2"
           v-if="product.options.size">
        <v-select label="Size"
                  class="grow"
                  :items="sizes"
                  item-value="id"
                  item-title="label"
                  multiple
                  chips
                  clearable
                  v-model="product.options.size.value"></v-select>
        <v-checkbox label="Multiple selection allowed"
                    v-model="product.options.size.multiple"></v-checkbox>
      </div>



      <div class="flex gap-2"
           v-if="product.options.material">

        <v-select label="Material"
                  class="grow"
                  v-if="product.options.material"
                  :items="materials"
                  item-value="id"
                  item-title="label"
                  multiple
                  chips
                  clearable
                  v-model="product.options.material.value"></v-select>

        <v-checkbox label="Multiple selection allowed"
                    v-model="product.options.material.multiple"></v-checkbox>
      </div>

      <div class="flex gap-2"
           v-if="product.options.coating">
        <v-select label="Coating"
                  class="grow"
                  :items="coatings"
                  item-value="id"
                  item-title="label"
                  chips
                  clearable
                  multiple
                  v-model="product.options.coating.value"></v-select>
        <v-checkbox label="Multiple selection allowed"
                    v-model="product.options.coating.multiple"></v-checkbox>
      </div>


      <div class="flex gap-2"
           v-if="product.options.laminate">
        <v-select label="Laminate"
                  class="grow"
                  :items="laminates"
                  item-value="id"
                  item-title="label"
                  chips
                  clearable
                  multiple
                  v-model="product.options.laminate.value"></v-select>
        <v-checkbox label="Multiple selection allowed"
                    v-model="product.options.laminate.multiple"></v-checkbox>
      </div>

      <div class="flex gap-2"
           v-if="product.options.color">
        <v-select label="Color"
                  class="grow"
                  :items="colors"
                  item-value="id"
                  item-title="label"
                  chips
                  clearable
                  multiple
                  v-model="product.options.color.value"></v-select>

        <v-checkbox label="Multiple selection allowed"
                    v-model="product.options.color.multiple"></v-checkbox>
      </div>

      <div class="flex gap-2"
           v-if="product.options.finishing">
        <v-select label="Finishing"
                  class="grow"
                  :items="finishings"
                  multiple
                  chips
                  clearable
                  item-value="id"
                  item-title="label"
                  v-model="product.options.finishing.value"></v-select>
        <v-checkbox label="Multiple selection allowed"
                    v-model="product.options.finishing.multiple"></v-checkbox>
      </div>

      <div class="flex gap-4">
        <V-text-field label="Min"
                      v-if="product.options.min !== null"
                      v-model.number="product.options.min"></V-text-field>
        <V-text-field label="Max"
                      v-if="product.options.max !== null"
                      v-model.number="product.options.max"></V-text-field>
      </div>
      <div class="flex gap-4">
        <v-btn to="/products">Cancel</v-btn>
        <v-btn type="submit">Save Changes</v-btn>
      </div>

    </v-form>

    <Loading v-if="!isReady" />


    <ProductDeleteDialog v-if="deleteDialog"
                         @close="deleteDialog = false" />
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'

const product = ref<Product | null>({
  id: nanoid(6),
  created: new Date(),
  updated: new Date(),
  label: '',
  options: {
    size: null,
    material: null,
    coating: null,
    laminate: null,
    color: null,
    bundling: false,
    finishing: null,
    min: null,
    max: null
  },
  notes: "",
})

const options = reactive({
  size: false,
  material: false,
  coating: false,
  laminate: false,
  color: false,
  bundling: false,
  finishing: false,
  min: false,
  max: false
})

type Options = keyof typeof options;

const productStore = useProductStore();
productStore.initialize();


const deleteDialog = ref(false);

const isReady = computed(() => {
  if (!productStore.initialized) return false

  const route = useRoute();
  const id = route.params.id[0];

  if (id === 'create') return true;

  const row = productStore.data.find((p) => p.id === id) || null;
  if (row === null) {
    alert("Product not found => " + id)
    navigateTo('/products');
    return false
  };

  //set product data
  product.value = JSON.parse(JSON.stringify(row)) as Product;

  //set options 
  options.size = (product.value.options.size !== null) ? true : false;
  options.material = (product.value.options.material !== null) ? true : false;
  options.coating = (product.value.options.coating !== null) ? true : false;
  options.laminate = (product.value.options.laminate !== null) ? true : false;
  options.color = (product.value.options.color !== null) ? true : false;
  options.finishing = (product.value.options.finishing !== null) ? true : false;
  options.min = (product.value.options.min !== null) ? true : false;
  options.max = (product.value.options.min !== null) ? true : false;
  return true;
})



function setValue(option: Options) {
  if (product.value === null) return;
  if (option === 'min' || option === 'max') {
    if (options[option]) {
      product.value.options[option] = 0;
    } else {
      product.value.options[option] = null;
    }
    return;
  }
  else if (option === 'bundling') {
    product.value.options[option] = options[option];
    return;
  }

  if (options[option]) {
    product.value.options[option] = {
      value: [],
      multiple: false
    }
  } else {
    product.value.options[option] = null;
  }

}


function submit() {
  if (product.value === null) return;
  console.log(product.value);
  setProduct(product.value)
    .then(() => {
      navigateTo('/products');
    }).catch((err) => {
      alert("Error saving => " + err);
    })
}
</script>