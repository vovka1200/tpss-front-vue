<script setup lang="ts">

import Objects from "@/components/settings/access/groups/Objects.vue";
import {PropType, ref} from "vue";
import {Group} from "@/models/access/groups";

const visible = defineModel<Boolean>();
const objectsTable = ref(false);
defineProps({
  data: {
    type: Object as PropType<Group>,
    required: true,
  },
});

</script>

<template>
  <q-dialog v-bind:model-value="visible" @hide="visible=false">
    <q-card>
      <q-toolbar>
        <q-toolbar-title>Группа</q-toolbar-title>
        <q-space/>
        <q-btn flat dense icon="o_lock_reset" @click="objectsTable=true">
          <q-tooltip>Настройки доступа</q-tooltip>
        </q-btn>
      </q-toolbar>

      <q-separator/>

      <q-card-section>
        <q-item>
          <q-input v-bind:model-value="data?.name" label="Название"/>
        </q-item>
      </q-card-section>

      <q-separator/>

      <q-card-actions align="right">
        <q-btn flat color="positive" label="Сохранить" icon="save"/>
        <q-btn flat color="accent" label="Отмена" icon="cancel" @click="visible=false"/>
      </q-card-actions>

    </q-card>
  </q-dialog>

  <Objects v-model="objectsTable"/>
</template>

<style scoped>

</style>