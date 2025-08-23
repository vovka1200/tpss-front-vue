<script setup lang="ts">
import {User} from "@/models/access/users";
import {ref} from "vue";
import {QTableColumn} from 'quasar';

const filter = ref('');
const loading = ref(false);
const columns = <QTableColumn[]>[
  {
    name: 'name',
    required: true,
    label: 'Имя',
    align: 'left',
    field: (row: User) => row.name,
    sortable: true
  }
];
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
});

const rows = [];

</script>

<template>
  <q-table
      dense flat
      ref="tableRef"
      row-key="id"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      v-model:pagination="pagination"
      style="min-width: 600px"
  >
    <template v-slot:top-left>
      <div class="q-table__title">Объекты доступа</div>
      <q-space/>
      <q-btn flat dense :disable="loading" icon="add"/>
      <q-btn flat dense :disable="loading" icon="delete"/>
    </template>
    <template v-slot:top-right>
      <q-input flat dense debounce="500" v-model="filter" placeholder="Поиск" type="search">
        <template v-slot:append>
          <q-icon name="o_search"/>
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<style scoped>

</style>