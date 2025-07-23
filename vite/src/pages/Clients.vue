<script setup lang="ts">

import {onMounted} from "vue";
import {useMainStore} from "@/store";
import Table from '@/components/clients/Table.vue';

const mainStore = useMainStore();

onMounted(() => {
  mainStore.panel = 'Клиенты';
});

</script>

<template>
  <q-page>
    <Table/>
  </q-page>
</template>

<style scoped>

</style>