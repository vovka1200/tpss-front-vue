<script setup lang="ts">

import {User} from "@/models/access/users";
import {PropType} from "vue";

const visible = defineModel<Boolean>();

defineProps({
  data: {
    type: Object as PropType<User>,
    required: true,
  },
})

</script>

<template>
  <q-dialog v-bind:model-value="visible" class="text-dark" @hide="visible=false">
    <q-card>

      <q-card-section>
        <div class="text-h6">Пользователь</div>
      </q-card-section>

      <q-separator/>

      <q-card-section>
        <q-item>
          <q-input v-bind:model-value="data?.username" label="Имя(логин)" label-color="dark"/>
        </q-item>
        <q-item>
          <q-input type="password" model-value="" label="Пароль" label-color="dark"/>
        </q-item>
        <q-item>
          <q-input v-bind:model-value="data?.name" label="ФИО" label-color="dark"/>
        </q-item>
      </q-card-section>

      <q-card-actions align="right" class="text-dark">
        <q-btn flat class="bg-positive" label="Сохранить"/>
        <q-btn flat class="bg-accent" label="Отмена" @click="visible=false"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>