<script setup lang="ts">

import {computed, ref, shallowReactive} from "vue";
import {Group} from "@/models/access/groups";
import Card from "@/components/settings/access/groups/Card.vue";
import {useGroupsStore} from "@/store/access/groups";

const tableRef = ref();
const card = ref(false);
const rowData = shallowReactive(new Group());
const loading = ref(false);
const columns = [
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
  rowsPerPage: 3,
  rowsNumber: 10
});

const store = useGroupsStore();
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
      @row-click="(env,row)=>{rowData=row;card=true}"
  />
  <Card v-model="card" :data="rowData"/>
</template>

<style scoped>

</style>