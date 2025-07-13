<script setup lang="ts">
import {useStore} from "../store";
import {computed} from "vue";

const store = useStore();
const version = computed(() => {
  return store.state.apiVersion;
})
</script>

<template>
  <q-page padding class="text-black">
    <h5>Task Tracker for Production, Sale and Support</h5>
    <p>Система управления заданиями по производству, продажи и сопровождения</p>
    <q-separator class="q-my-md"/>
    <ul>
      <li>Версия API:&nbsp;{{ version }}</li>
    </ul>
  </q-page>
</template>

<style scoped>
</style>