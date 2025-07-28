<script setup lang="ts">
import {computed, ref, shallowReactive} from "vue";
import {User} from "@/models/access/users";
import {useUsersStore} from "@/store/access/users";
import app from "@/main";

const tableRef = ref();
const rowData = shallowReactive(new User());
const card = ref(false);
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
    name: 'username',
    required: true,
    label: 'Имя пользователя',
    align: 'left',
    field: (row: User) => row.username,
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

const store = useUsersStore();
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

const onClick = (evt, row) => {
  app.config.globalProperties.$router.push({name: 'Пользователь', params: {id: <User>row.id}});
};

</script>

<template>
  <q-toolbar>
    <q-btn flat round dense icon="o_add" @click="onClick">
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
      @row-click="onClick"
  />
</template>

<style scoped>

</style>