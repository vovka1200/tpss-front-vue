<script setup lang="ts">
import BaseCard from "@/pages/BaseCard.vue";
import {computed, ref} from "vue";
import {User} from "@/models/access/users";
import {useRoute} from "vue-router";
import {useUsersStore} from "@/store/access/users";

const test = ref('');

const data = computed<User>(() => {
  const id = useRoute().params.id;
  return useUsersStore().list.find(user => user.id == id);
});

</script>

<template>
  <BaseCard drawer_head_height="5em">
    <template #card>
      <q-card>
        <q-card-section>
          <div class="text-h6">Редактирование пользователя</div>
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
          <q-btn flat color="positive" label="Сохранить" icon="save"/>
          <q-btn flat color="accent" label="Отмена" icon="cancel"/>
        </q-card-actions>
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