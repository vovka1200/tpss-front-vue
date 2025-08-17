<script setup lang="ts">

import {useAccountStore} from "@/store/access/account";
import {computed, ref} from "vue";

const open = ref(false);
const store = useAccountStore();

const username = computed(() => {
  return store.account.username;
})

const name = computed({
  get() {
    return store.account.name;
  },
  set(value) {
    store.account.name = value;
  }
})

const password = computed({
  get() {
    return store.account.password;
  },
  set(value) {
    store.account.password = value;
  }
})

const avatar = computed(() => store.account.avatar);

const logout = () => {
  open.value = false;
  store.logout();
};

const pwdVisible = ref(false);
const passwordRetype = ref('');
const retypePassword = ref(false);

const pwdIcon = computed(() => pwdVisible.value ? 'visibility_off' : 'visibility');

const getAvatarURL = computed(() => `/file/${store.account.avatar}`);

</script>

<template>
  <q-menu v-model="open">
    <div class="row no-wrap q-pa-md">
      <q-card dense flat>
        <q-card-section>
          <q-input readonly v-model="username" v-if="username" label="Имя пользователя"/>
        </q-card-section>
        <q-card-section>
          <q-input :type="pwdVisible ? 'text' : 'password'" v-model="password" label="Пароль">
            <template v-slot:append>
              <q-btn flat dense :icon="pwdIcon" @click="pwdVisible = !pwdVisible"/>
              <q-btn flat dense icon="save">
                <q-tooltip>Сохранить пароль</q-tooltip>
                <q-menu v-model="retypePassword">
                  <q-card>
                    <q-card-section>
                      <q-input
                          v-model="passwordRetype"
                          :type="pwdVisible ? 'text' : 'password'"
                          hint="Введите пароль повторно"
                          dense
                          autofocus
                      >
                        <template v-slot:append>
                          <q-btn flat dense :icon="pwdIcon" @click="pwdVisible = !pwdVisible"/>
                        </template>
                      </q-input>
                    </q-card-section>
                    <q-separator/>
                    <q-card-actions align="right">
                      <q-btn icon="save" label="Сохранить" color="positive"/>
                    </q-card-actions>
                  </q-card>
                </q-menu>
              </q-btn>
            </template>
          </q-input>
        </q-card-section>
      </q-card>
      <q-separator vertical inset class="q-mx-lg"/>
      <q-card dense flat class="text-center">
        <q-card-section>
          <q-avatar color="info" size="128px">
            <q-img :src="getAvatarURL" v-if="avatar"/>
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <q-input v-model="name" label="ФИО"/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn dense flat icon="logout" label="Выйти" @click="logout"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-menu>
</template>

<style scoped>

</style>