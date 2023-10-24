<template>
  <div><v-app>
      <v-app-bar color="primary"
                 :elevation="2">

        <v-app-bar-nav-icon variant="text"
                            @click="toggleDrawer"></v-app-bar-nav-icon>

        <div class="nav-logo">

          <v-img src="/images/mmad-w.svg"
                 max-height="50px"
                 contain>
          </v-img>

        </div>

        <v-spacer></v-spacer>


        <v-btn to="/clients">Clients</v-btn>
        <v-btn to="/products">Products</v-btn>
        <!--
        <v-btn to="/orders">Orders</v-btn>
        <v-btn to="/brokerages">Brokerages</v-btn>
        <v-btn to="/Suppliers">Suppliers</v-btn>
        <v-btn to="/distributors">Distributors</v-btn>
        -->
        <v-btn to="/users">Users</v-btn>
      </v-app-bar>



      <v-navigation-drawer v-model="drawer">
        <v-list>

          <v-list-item prepend-icon="mdi-home"
                       title="Orders"
                       to="/orders"></v-list-item>

          <v-list-item prepend-icon="mdi-cart"
                       title="Products"
                       to="/products"></v-list-item>


          <v-list-item prepend-icon="mdi-account-tie"
                       title="Clients"
                       to="/clients"></v-list-item>

          <v-list-item prepend-icon="mdi-office-building"
                       title="Brokerages"
                       to="/brokerages"></v-list-item>

          <v-list-item prepend-icon="mdi-robot-industrial"
                       title="Suppliers"
                       to="/suppliers"></v-list-item>

          <v-list-item prepend-icon="mdi-truck-delivery"
                       title="Distributors"
                       to="/distributors"></v-list-item>
          <v-list-item prepend-icon="mdi-account-circle"
                       title="Users"
                       to="/users"></v-list-item>


        </v-list>
      </v-navigation-drawer>
      <v-main>
        <slot />
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const drawer = ref(false)
const toggleDrawer = () => { drawer.value = !drawer.value }

</script>
