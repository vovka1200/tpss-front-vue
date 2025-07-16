<script setup lang="ts">
import {useStore} from "../store";
import {computed, onMounted} from "vue";

const store = useStore();
const version = computed(() => {
  return store.state.apiVersion;
})

onMounted(() => {
  store.commit('SET_PANEL_TITLE', 'О программе');
})
</script>

<template>
  <q-page padding class="text-black">
    <div class="text-subtitle1">Task Tracker for Production, Sale and Support</div>
    <p>Система управления заданиями по производству, продажи и сопровождения</p>
    <q-card>
      <q-card-section>
        <ul>
          <li>Версия GUI:&nbsp;1.0.0</li>
          <li>Версия API:&nbsp;{{ version }}</li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
</style>