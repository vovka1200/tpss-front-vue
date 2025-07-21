<script setup lang="ts">
import {computed} from "vue";
import {useStore} from "@/store";

const store = useStore();
const visible = computed(() => {
  return store.state.authDialogVisible;
})

const username = computed({
  get() {
    return store.state.access.account.username;
  },
  set(value) {
    store.commit('SET_USERNAME', value)
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

const login = () => {
  store.commit('SET_AUTH_DIALOG_VISIBLE', false);
  store.dispatch('login', {
    username: store.state.access.account.username,
    password: store.state.access.account.password
  });
};

</script>

<template>
  <q-dialog v-bind:model-value="visible" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Аутентификация</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense autofocus v-model="username" label="Пользователь"/>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="password" type="password" label="Пароль"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat class="bg-accent" label="Войти" @click="login"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>