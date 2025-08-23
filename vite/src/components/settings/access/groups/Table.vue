<script setup lang="ts">

import {computed, ref, watch} from "vue";
import {Group} from "@/models/access/groups";
import {useGroupsStore} from "@/store/access/groups";
import app from "@/main";
import {useWebsocketStore} from "@/store/websocket";
import {QTableColumn} from 'quasar';

const tableRef = ref();
const columns = <QTableColumn[]>[
  {
    name: 'name',
    required: true,
    label: 'Название',
    align: 'left',
    field: (row: Group) => row.name,
    sortable: true
  },
  {
    name: 'groups',
    required: true,
    label: 'Участники',
    align: 'center',
    field: (row: Group) => row.members.join(','),
    sortable: true
  },
];
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

const store = useGroupsStore();
const rows = computed(() => store.list);
const loading = computed(() => store.loading);

const filter = computed({
  get() {
    return store.filter;
  },
  set(value) {
    store.filter = value;
  }
})

watch(() => useWebsocketStore().authorized, (ok) => {
  if (ok) {
    if (store.list.length === 0) {
      store.load();
    }
  }
}, {immediate: true});

const onRequest = () => {
  store.load();
};

const onClick = (evt: Event, row: Group) => {
  app.config.globalProperties.$router.push({name: 'Группа', params: {id: row.id}});
};

</script>

<template>
  <q-toolbar>
    <q-btn flat round dense icon="o_add">
      <q-tooltip>Добавить группу</q-tooltip>
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
      @row-click="onClick"
  />
</template>

<style scoped>

</style>