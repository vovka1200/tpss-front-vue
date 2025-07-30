<script setup lang="ts">
import BaseCard from "@/pages/BaseCard.vue";
import {computed, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useUsersStore} from "@/store/access/users";
import CardParams from '@/components/params/Card.vue';
import {Param} from "@/models/params";
import {useWebsocketStore} from "@/store/websocket";

const test = ref('');

const id = useRoute().params.id as string;

const data = computed(() => useUsersStore().user(id));

watch(() => useWebsocketStore().authorized, (ok) => {
  if (ok && useUsersStore().list.length === 0) {
    useUsersStore().load(id);
  }
});

const params = ref<Param[]>([
  {name: 'test1', type: 'string'},
  {name: 'test2', type: 'string'},
  {name: 'test3', type: 'string'},
  {name: 'test6', type: 'string'},
  {name: 'test7', type: 'select'},
  {name: 'test6', type: 'string'},
  {name: 'test6', type: 'string'},
  {name: 'test6', type: 'string'},
  {name: 'test6', type: 'string'},
  {name: 'test6', type: 'string'},
  {name: 'test6', type: 'string'},
  {name: 'test6', type: 'string'},
  {name: 'test6', type: 'string'},
  {name: 'test6', type: 'string'},
  {name: 'test8', type: 'int'},
  {name: 'test9', type: 'float'},
  {name: 'test10', type: 'string'},
]);

</script>

<template>
  <BaseCard drawer_head_height="5em">
    <template #card>
      <q-card>
        <q-toolbar>
          <q-toolbar-title>Редактирование пользователя</q-toolbar-title>
          <q-space/>
          <q-btn flat color="positive" label="Сохранить" icon="save"/>
          <q-btn flat color="accent" label="Отмена" icon="cancel"/>
        </q-toolbar>

        <q-separator/>
        <div class="row" style="flex-wrap: nowrap;">
          <q-card-section style="flex-shrink: 0;">
            <q-item-label>Основные данные</q-item-label>
            <q-input v-bind:model-value="data?.username" label="Имя(логин)"/>
            <q-input type="password" model-value="" label="Пароль"/>
            <q-input v-bind:model-value="data?.name" label="ФИО"/>
          </q-card-section>

          <q-card-section>
            <q-item-label>Дополнительные параметры</q-item-label>
            <CardParams :params="params"/>
          </q-card-section>
        </div>

      </q-card>
    </template>
    <template #drawer_head>
      <q-select v-model="test" label="Статус" label-color="white" :options="[]" dark>
        <template v-slot:prepend>
          <q-icon name="workspace_premium"/>
        </template>
      </q-select>
    </template>
  </BaseCard>
</template>
<style scoped>

</style>