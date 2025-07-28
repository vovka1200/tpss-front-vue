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
    <q-card>
      <q-toolbar>
        <q-toolbar-title>Группа</q-toolbar-title>
        <q-space/>
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

      <q-separator/>

      <q-card-actions align="right">
        <q-btn flat color="positive" label="Сохранить" icon="save"/>
        <q-btn flat color="accent" label="Отмена" icon="cancel" @click="visible=false"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>