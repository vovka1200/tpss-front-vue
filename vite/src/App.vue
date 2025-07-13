<script setup lang="ts">
import {RouterView} from 'vue-router'
import Drawer from './components/Drawer.vue'
import {ref, computed} from "vue";
import Authorize from "./components/Authorize.vue";
import {useStore} from "./store";
import Header from "./components/Header.vue";

const store = useStore();
const openDrawer = ref(true)

</script>

<template>
  <q-layout view="hHh LpR fFf">

    <Header v-bind:model-value="openDrawer"/>

    <Drawer :visible="openDrawer"/>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>

  <Authorize/>

</template>

<style scoped>
</style>
