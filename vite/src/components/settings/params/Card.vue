<script setup lang="ts">
import {Ref, ref} from "vue";
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
    <q-card>
      <q-toolbar>
        <q-toolbar-title>Редактирование параметра</q-toolbar-title>
        <q-space/>
      </q-toolbar>

      <q-separator/>

      <q-card-section>
        <q-item>
          <q-input
              class="fit"
              v-model="cloned.name"
              label="Название"
          />
        </q-item>
        <q-item>
          <q-select
              class="fit"
              label="Тип"
              v-model="cloned.type"
              :options="types"
          />
        </q-item>
      </q-card-section>

      <q-separator/>

      <q-card-actions align="right">
        <q-btn flat color="positive" label="Сохранить" icon="save" @click="save();dialog.hide()"/>
        <q-btn flat color="accent" label="Отмена" icon="cancel" @click="sync();dialog.hide()"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>