<template>
  <div class="mb-2">
    <v-alert>
      <div class="flex gap-2">
        <v-select label="Product"
                  :items="productStore.data"
                  item-value="id"
                  item-title="label"
                  v-model="item.productId"></v-select>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical"
                   size="x-small"
                   v-bind="props"></v-btn>
          </template>
          <v-list nav>
            <v-list-item @click="$emit('deleteItem')"><v-icon icon="mdi-delete" /> Delete</v-list-item>
          </v-list>
        </v-menu>
      </div>
      <span v-if="product">
        <v-select v-if="product.options.size"
                  label="size"
                  :items="sizeOptions"
                  :multiple=product.options.size.multiple
                  item-value="id"
                  item-title="label"
                  v-model="item.options.size"></v-select>

        <v-select v-if="product.options.laminate"
                  label="Laminate"
                  :items="laminateOptions"
                  :multiple=product.options.laminate.multiple
                  item-value="id"
                  item-title="label"
                  v-model="item.options.laminate"></v-select>

        <v-select v-if="product.options.material"
                  label="Material"
                  :items="materialOptions"
                  :multiple=product.options.material.multiple
                  item-value="id"
                  item-title="label"
                  v-model="item.options.material"></v-select>

        <v-select v-if="product.options.color"
                  label="Color"
                  :items="colorOptions"
                  :multiple=product.options.color.multiple
                  item-value="id"
                  item-title="label"
                  v-model="item.options.color"></v-select>

        <v-select v-if="product.options.finishing"
                  label="Finishing"
                  :items="finishingOptions"
                  :multiple=product.options.finishing.multiple
                  item-value="id"
                  item-title="label"
                  v-model="item.options.finishing"></v-select>

        <v-checkbox v-if="product.options.bundling"
                    label="Bundling"
                    v-model="item.options.bundling"></v-checkbox>

        <v-text-field label="Quantity"
                      type="number"
                      v-model="item.quantity"></v-text-field>
      </span>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
type Props = {
  item: OrderItem
}
const props = defineProps<Props>()
const productStore = useProductStore();

const sizeOptions = ref<Size[]>([]);
const laminateOptions = ref<Laminate[]>([]);
const materialOptions = ref<Material[]>([]);

const colorOptions = ref<Color[]>([]);
const finishingOptions = ref<Finish[]>([]);

const product = ref<Product | null>(null)

function setProductOptions() {
  product.value = productStore.data.find(p => p.id === props.item.productId) || null;
  if (product.value === null || product.value.options.size === null) return [];

  //size options
  if (product.value.options.size) sizeOptions.value = sizes.filter(s => product.value!.options.size!.value.includes(s.id))
  else sizeOptions.value = []

  //material options
  if (product.value.options.material) materialOptions.value = materials.filter(m => product.value!.options.material!.value.includes(m.id))
  else materialOptions.value = []

  //laminate options
  if (product.value.options.laminate) laminateOptions.value = laminates.filter(l => product.value!.options.laminate!.value.includes(l.id))
  else laminateOptions.value = []

  //color options
  if (product.value.options.color) colorOptions.value = colors.filter(c => product.value!.options.color!.value.includes(c.id))
  else colorOptions.value = []

  //finish options
  if (product.value.options.finishing) finishingOptions.value = finishings.filter(f => product.value!.options.finishing!.value.includes(f.id))
  else finishingOptions.value = []


}


watch(() => props.item.productId, setProductOptions, { immediate: true })
</script>

<style scoped></style>