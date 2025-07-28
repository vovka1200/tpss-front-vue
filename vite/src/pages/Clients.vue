<script setup lang="ts">

import {useMainStore} from "@/store";
import Table from '@/components/clients/Table.vue';

const mainStore = useMainStore();

</script>

<template>
  <q-page>
    <Table/>
  </q-page>
</template>

<style scoped>

</style>