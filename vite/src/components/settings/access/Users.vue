<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {User} from "@/store/state";
import {useStore} from "@/store";

const tableRef = ref();
const filter = ref('');
const loading = ref(false);
const columns = [
  {
    name: 'name',
    required: true,
    label: 'ФИО',
    align: 'left',
    field: (row: User) => row.name,
    sortable: true
  },
  {
    name: 'groups',
    required: true,
    label: 'Группы',
    align: 'center',
    field: (row: User) => row.groups.join(','),
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

const store = useStore();
const rows = computed(() => {
  loading.value = false;
  return store.state.settings.access.users.list;
});

const onRequest = (props) => {
  if (props.filter !== '') {
    loading.value = true;
    store.dispatch('loadUsers', props.filter);
  }
};

</script>

<template>
  <q-toolbar>
    <q-btn flat round dense icon="o_add">
      <q-tooltip>Добавить пользователя</q-tooltip>
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
  />
</template>

<style scoped>

</style>