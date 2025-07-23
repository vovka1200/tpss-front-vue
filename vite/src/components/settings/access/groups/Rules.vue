<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {Rule} from "@/models/access/maxrix";
import {useRulesStore} from "@/store/access/rules";

const tableRef = ref();
const loading = ref(false);

const props = defineProps({
  groupId: String,
});

const columns = [
  {
    name: 'object',
    required: true,
    label: 'Объект',
    align: 'left',
    field: (row: Rule) => row.object,
    sortable: true
  },
  {
    name: 'method',
    required: true,
    label: 'Метод',
    align: 'left',
    field: (row: Rule) => row.access.join(','),
    sortable: true
  },
];

const store = useRulesStore();
const rows = computed(() => {
  loading.value = false;
  return store.list;
});

onMounted(() => {
  loading.value = true;
  store.load(props.groupId);
});
</script>

<template>
  <q-table
      dense flat
      ref="tableRef"
      row-key="id"
      :rows="rows"
      :columns="columns"
      :loading="loading"
  />
</template>

<style scoped>

</style>