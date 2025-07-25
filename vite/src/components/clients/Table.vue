<script setup lang="ts">

import {computed, ref, shallowReactive} from "vue";
import {Client} from "@/models/crm/clients";
import {useClientsStore} from "@/store/crm/clients";
import app from "@/main";

const tableRef = ref();
const loading = ref(false);
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Имя/Название',
    align: 'left',
    field: (row: Client) => row.name,
    sortable: true
  },
];
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 3,
  rowsNumber: 10
});

const store = useClientsStore();
const rows = computed(() => {
  loading.value = false;
  return store.list;
});

const filter = computed({
  get() {
    return store.filter;
  },
  set(value) {
    store.filter = value;
  }
});
const onRequest = () => {
  loading.value = true;
  store.load();
};

const onRowClick = (event, row: Client) => {
  app.config.globalProperties.$router.push(`/clients/${row.id}`);
};
</script>

<template>
  <q-toolbar>
    <q-btn flat round dense icon="o_add">
      <q-tooltip>Добавить клиента</q-tooltip>
    </q-btn>
    <q-space/>
    <q-input flat dense debounce="500" v-model="filter" placeholder="Поиск">
      <template v-slot:append>
        <q-icon name="o_search"/>
      </template>
    </q-input>
  </q-toolbar>
  <q-table
      dense flat
      ref="tableRef"
      row-key="id"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      v-model:pagination="pagination"
      @row-click="onRowClick"
  />
</template>

<style scoped>

</style>