<script setup lang="ts">

import {useStore} from "@/store";
import {computed, onMounted, ref} from "vue";

const open = ref(false);
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

const password = computed({
  get() {
    return store.state.access.account.password;
  },
  set(value) {
    store.commit('SET_PASSWORD', value)
  }
})

onMounted(() => {
  store.commit('SET_PANEL_TITLE', 'Настройки пользователя');
})
</script>

<template>
  <q-menu v-model="open">
    <div class="row no-wrap q-pa-md">
      <q-card dense flat>
        <q-card-section>
          <q-input readonly v-model="username" v-if="username" label="Имя пользователя"/>
        </q-card-section>
        <q-card-section>
          <q-input type="password" v-model="password" label="Пароль"/>
        </q-card-section>
      </q-card>
      <q-separator vertical inset class="q-mx-lg"/>
      <q-card dense flat class="text-center">
        <q-card-section>
          <q-avatar icon="flutter_dash" color="info" size="128px"/>
        </q-card-section>
        <q-card-section>
          <q-input v-model="name" label="ФИО"/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn dense flat icon="logout" label="Выйти" @click="open=false;store.commit('LOGOUT')"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-menu>
</template>

<style scoped>

</style>