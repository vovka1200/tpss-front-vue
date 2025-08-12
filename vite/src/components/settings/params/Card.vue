<script setup lang="ts">
import {ref} from "vue";
import {useParamsStore} from "@/store/settings/params";
import {storeToRefs} from "pinia";
import {useCloned} from '@vueuse/core'

const dialog = ref();

const store = useParamsStore();
const {item} = storeToRefs(store);
const {cloned, sync} = useCloned(item);

const types = ref([
  'string', 'int', 'float'
]);

defineExpose({
  show: () => {
    dialog.value.show();
  },
});

const save = () => {
  store.item.name = cloned.value.name;
  store.item.type = cloned.value.type;
};

</script>

<template>
  <q-dialog ref="dialog">
    <q-card style="width:50vw">
      <q-toolbar>
        <q-toolbar-title>Редактирование параметра</q-toolbar-title>
        <q-space/>
        <q-btn flat dense color="positive" icon="save" @click="save();dialog.hide()">
          <q-tooltip>Сохранить</q-tooltip>
        </q-btn>
        <q-btn flat dense color="accent" icon="cancel" @click="sync();dialog.hide()">
          <q-tooltip>Закрыть</q-tooltip>
        </q-btn>
      </q-toolbar>

      <q-separator/>

      <q-card-section>
        <div class="row">
          <div class="col-9">
            <q-input
                v-model="cloned.name"
                label="Название"
            />
          </div>
          <div class="col-2 offset-1">
            <q-select
                label="Тип"
                v-model="cloned.type"
                :options="types"
            />
          </div>
        </div>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>