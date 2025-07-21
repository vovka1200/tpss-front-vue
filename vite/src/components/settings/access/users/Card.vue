<script setup lang="ts">

import {User} from "@/models/access/users";
import {PropType} from "vue";

const visible = defineModel<boolean>();

defineProps({
  data: {
    type: Object as PropType<User>,
    required: true,
  },
})

</script>

<template>
  <q-dialog v-bind:model-value="visible" @hide="visible=false">
    <q-card>

      <q-card-section>
        <div class="text-h6">Пользователь</div>
      </q-card-section>

      <q-separator/>

      <q-card-section>
        <q-item>
          <q-input v-bind:model-value="data?.username" label="Имя(логин)"/>
        </q-item>
        <q-item>
          <q-input type="password" model-value="" label="Пароль"/>
        </q-item>
        <q-item>
          <q-input v-bind:model-value="data?.name" label="ФИО"/>
        </q-item>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat class="bg-positive" label="Сохранить"/>
        <q-btn flat class="bg-accent" label="Отмена" @click="visible=false"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>