<script setup lang="ts">

import {useMainStore} from "@/store";

const mainStore = useMainStore();

</script>

<template>
  <q-page padding>
    <div class="text-subtitle1">Task Tracker for Production, Sale and Support</div>
    <p>Система управления заданиями по производству, продажи и сопровождения</p>
    <q-card>
      <q-card-section>
        <ul>
          <li>Версия GUI:&nbsp;1.0.0</li>
          <li>Версия API:&nbsp;{{ mainStore.apiVersion }}</li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
</style>