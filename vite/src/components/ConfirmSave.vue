<script setup lang="ts">

import {ref} from "vue";

const dialog = ref();

defineExpose({
  show: () => {
    dialog.value.show();
  },
});

</script>

<template>
  <q-dialog ref="dialog" persistent>
    <q-card>
      <q-toolbar>
        <q-toolbar-title>Сохранить изменения?</q-toolbar-title>
      </q-toolbar>
      <q-separator/>
      <q-card-actions align="around">
        <q-btn @click="dialog.hide();$emit('onConfirm');" color="positive">Да</q-btn>
        <q-btn @click="dialog.hide();$emit('onCancel');" color="negative">Нет</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>