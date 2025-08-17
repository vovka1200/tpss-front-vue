<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Rule} from "@/models/access/maxrix";
import {useRulesStore} from "@/store/access/rules";
import {storeToRefs} from "pinia";

const tableRef = ref();

const methods = ref([
  'read', 'write'
]);

const props = defineProps({
  groupId: String,
});

const columns = [
  {
    name: 'description',
    required: true,
    label: 'Объект',
    align: 'left',
    field: (row: Rule) => row.description,
    sortable: true
  },
  {
    name: 'method',
    required: true,
    label: 'Доступ',
    align: 'left',
    field: (row: Rule) => row.access.join(','),
    sortable: true
  },
];

const store = useRulesStore();
const {list, loading} = storeToRefs(store);

onMounted(() => {
  store.load(props.groupId);
});

</script>

<template>
  <q-table
      dense flat
      ref="tableRef"
      row-key="id"
      :rows="list"
      :columns="columns"
      :loading="loading"
  >
    <template #body-cell-method="props">
      <q-td :props="props">
        <div class="row justify-around" style="width:80px;">
          <q-btn
              :color="props.row['access'].includes('read') ? 'positive' : 'negative'"
              icon="file_open"
              round
              dense
              unelevated
              push
              @click="props.row['access'].includes('read') ? props.row['access'].splice(props.row['access'].indexOf('read'),1) : props.row['access'].push('read')"
          >
            <q-tooltip>Чтение</q-tooltip>
          </q-btn>
          <q-btn
              :color="props.row['access'].includes('write') ? 'warning' : 'negative'"
              icon="save"
              round
              dense
              unelevated
              push
              @click="props.row['access'].includes('write') ? props.row['access'].splice(props.row['access'].indexOf('write'),1) : props.row['access'].push('write')"
          >
            <q-tooltip>Чтение</q-tooltip>
          </q-btn>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<style scoped>

</style>