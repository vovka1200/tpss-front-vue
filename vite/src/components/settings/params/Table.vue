<script setup lang="ts">

import {computed, ref, shallowReactive} from "vue";
import {Param} from "@/models/params";
import {useParamsStore} from "@/store/settings/params";

const tableRef = ref();
const card = ref(false);
const rowData = shallowReactive(new Param());
const loading = ref(false);
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Название',
    align: 'left',
    field: (row: Param) => row.name,
    sortable: true,
    width: '',
  },
  {
    name: 'type',
    required: true,
    label: 'Тип',
    align: 'center',
    field: (row: Param) => row.type,
    sortable: true
  },
  {
    name: 'default',
    required: true,
    label: 'Значение по умолчанию',
    align: 'center',
    field: (row: Param) => row.default,
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

const store = useParamsStore();
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
})

const onRequest = () => {
  loading.value = true;
  store.load();
};

</script>

<template>
  <q-toolbar>
    <q-btn flat round dense icon="o_add">
      <q-tooltip>Добавить параметр</q-tooltip>
    </q-btn>
    <q-space/>
    <q-input flat dense debounce="500" v-model="filter" placeholder="Поиск" type="search">
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
      @row-click="(env,row)=>{rowData=row;card=true}"
  />
</template>

<style scoped>

</style>