<script setup lang="ts">

import {computed} from "vue";
import {useAccountStore} from "@/store/access/account";
import {useMainStore} from "@/store";

const accountStore = useAccountStore();
const mainStore = useMainStore();

const visible = computed(() => mainStore.authDialogVisible);
const shaking = computed(() => mainStore.authShake ? 'shake' : '');

const username = computed({
  get() {
    return accountStore.username;
  },
  set(value) {
    accountStore.username = value;
  }
})

const password = computed({
  get() {
    return accountStore.password;
  },
  set(value) {
    accountStore.password = value;
  }
})

const login = () => {
  mainStore.showAuthorizationDialog();
  accountStore.login();
};

</script>

<template>
  <q-dialog v-bind:model-value="visible" persistent :class="shaking">
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