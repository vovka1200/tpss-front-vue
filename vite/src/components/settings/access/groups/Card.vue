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
  <q-dialog v-bind:model-value="visible" class="text-dark" @hide="visible=false">
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
          <q-input v-bind:model-value="data?.name" label="Название" label-color="dark"/>
        </q-item>
      </q-card-section>

      <q-separator/>

      <q-card-actions align="right" class="text-dark">
        <q-btn flat class="bg-positive" label="Сохранить"/>
        <q-btn flat class="bg-accent" label="Отмена" @click="visible=false"/>
      </q-card-actions>

    </q-card>
  </q-dialog>

  <Objects v-model="objectsTable"/>
</template>

<style scoped>

</style>