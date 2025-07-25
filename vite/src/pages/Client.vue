<script setup lang="ts">

import {useRoute} from "vue-router";
import {ref} from "vue";
import {useMainStore} from "@/store";
import BaseCard from "@/pages/BaseCard.vue";

const route = useRoute();
const id = ref(route.params.id);

const mainStore = useMainStore();
mainStore.panel = 'Клиент';

const options = ref([
  'Активен', 'Удалён'
]);

const status = ref(null);

</script>

<template>
  <BaseCard drawer_head_height="5em">
    <template #drawer_head>
      <q-select v-model="status" label="Статус" label-color="white" :options="options" dark>
        <template v-slot:prepend>
          <q-icon name="workspace_premium"/>
        </template>
      </q-select>
    </template>
    <template #drawer_list>
      <q-item>test1</q-item>
      <q-item>test2</q-item>
      <q-item>test3</q-item>
      <q-item>test4</q-item>
      <q-item>test5</q-item>
      <q-item>test6</q-item>
      <q-item>test7</q-item>
      <q-item>test8</q-item>
      <q-item>test9</q-item>
      <q-item>test0</q-item>
      <q-item>test1</q-item>
      <q-item>test2</q-item>
      <q-item>test3</q-item>
      <q-item>test4</q-item>
      <q-item>test5</q-item>
      <q-item>test6</q-item>
      <q-item>test7</q-item>
      <q-item>test8</q-item>
      <q-item>test9</q-item>
      <q-item>test0</q-item>
      <q-item>test1</q-item>
      <q-item>test2</q-item>
      <q-item>test3</q-item>
      <q-item>test4</q-item>
      <q-item>test5</q-item>
      <q-item>test6</q-item>
      <q-item>test7</q-item>
      <q-item>test8</q-item>
      <q-item>test9</q-item>
      <q-item>test0</q-item>
      <q-item>test1</q-item>
      <q-item>test2</q-item>
      <q-item>test3</q-item>
      <q-item>test4</q-item>
      <q-item>test5</q-item>
      <q-item>test6</q-item>
      <q-item>test7</q-item>
      <q-item>test8</q-item>
      <q-item>test9</q-item>
      <q-item>test011</q-item>
    </template>
  </BaseCard>
</template>

<style scoped>

</style>