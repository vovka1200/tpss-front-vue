<script setup lang="ts">

import {PropType} from "vue";
import {Group} from "@/models/access/groups";
import Rules from "@/components/settings/access/groups/Rules.vue";

const visible = defineModel<Boolean>();

defineProps({
  data: {
    type: Object as PropType<Group>,
    required: true,
  },
});

</script>

<template>
  <q-dialog v-bind:model-value="visible" @hide="visible=false">
    <q-card style="min-width: 50vw; min-height: 54vh;">
      <q-toolbar>
        <q-toolbar-title>Редактирование группы</q-toolbar-title>
        <q-space/>
        <q-btn flat dense color="positive" icon="o_save">
          <q-tooltip>Сохранить</q-tooltip>
        </q-btn>
        <q-btn flat dense color="accent" icon="o_refresh">
          <q-tooltip>Отменить</q-tooltip>
        </q-btn>
        <q-btn flat dense color="negative" icon="o_cancel">
          <q-tooltip>Закрыть</q-tooltip>
        </q-btn>
      </q-toolbar>

      <q-separator/>

      <q-card-section>
        <q-item>
          <q-input v-bind:model-value="data?.name" label="Название"/>
        </q-item>
      </q-card-section>

      <q-separator/>

      <q-card-section>
        <q-item-label>Правила доступа</q-item-label>
        <Rules v-bind:group-id="data.id"/>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>