<script setup lang="ts">
import {useStore} from "../store";
import {computed} from "vue";

const store = useStore();

const username = computed(() => {
  return store.state.access.account.username;
})

const name = computed({
  get() {
    return store.state.access.account.name;
  },
  set(value) {
    store.commit('SET_ACCOUNT_NAME', value)
  }
})

</script>

<template>
  <q-page padding class="text-black">
    <h5>Пользователь</h5>
    <q-card class="q-my-md">
      <q-card-section>
        <q-item-label>Имя пользователя</q-item-label>
        <q-input readonly v-model="username"/>
      </q-card-section>
      <q-card-section>
        <q-item-label>Пароль</q-item-label>
        <q-input type="password" model-value=""/>
      </q-card-section>
      <q-card-section>
        <q-item-label>ФИО</q-item-label>
        <q-input v-model="name"/>
      </q-card-section>
    </q-card>
    <div class="row justify-end">
      <q-btn outline class="bg-primary q-ml-md">Сохранить</q-btn>
    </div>
  </q-page>
</template>

<style scoped>

</style>