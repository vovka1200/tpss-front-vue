<script setup lang="ts">
import {useMainStore} from '@/store';
import {onMounted, ref} from 'vue';
import {useAccountStore} from "@/store/access/account";
import {useUsersStore} from "@/store/access/users";
import {useGroupsStore} from "@/store/access/groups";

const tab = ref('users');

const mainStore = useMainStore();
const accountStore = useAccountStore();
const usersStore = useUsersStore();
const groupsStore = useGroupsStore();

onMounted(() => {
  mainStore.panel = 'Панель управления';
  if (accountStore.allowed('settings')) {
    usersStore.load();
  }
})

</script>

<template>
  <div class="q-py-md" v-if="accountStore.allowed('settings')">
    <q-tabs
        v-model="tab"
        dense
        active-color="text-dark"
        indicator-color="text-grey"
        align="left"
        narrow-indicator
    >
      <q-route-tab label="Пользователи" icon="o_person" to="/settings/users"/>
      <q-route-tab label="Группы" icon="o_groups" to="/settings/groups"/>
      <q-route-tab label="Параметры" icon="o_settings_applications" to="/settings/params"/>
    </q-tabs>

    <router-view/>

  </div>
</template>

<style scoped>

</style>