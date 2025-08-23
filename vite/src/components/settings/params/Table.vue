<script setup lang="ts">
import {ref, watch} from "vue";
import {Param} from "@/models/params";
import {useParamsStore} from "@/store/settings/params";
import Card from "@/components/settings/params/Card.vue";
import {storeToRefs} from "pinia";
import {useWebsocketStore} from "@/store/websocket";
import {QTableColumn} from 'quasar';

const tableRef = ref();
const card = ref();
const columns = <QTableColumn[]>[
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
  rowsPerPage: 10,
});

const store = useParamsStore();
const {list, loading, filter, item} = storeToRefs(store);

watch(() => useWebsocketStore().authorized, (ok) => {
  if (ok) {
    if (store.list.length === 0) {
      store.load();
    }
  }
}, {immediate: true});

const onRequest = () => useParamsStore().load();

const onRowClick = (env, row) => {
  item.value = row;
  card.value.show();
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
      :rows="list"
      :columns="columns"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      v-model:pagination="pagination"
      @row-click="onRowClick"
  />
  <Card ref="card"/>
</template>

<style scoped>

</style>