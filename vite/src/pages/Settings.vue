<script setup lang="ts">
import GroupsTable from '@/components/settings/access/groups/Table.vue';
import UsersTable from '@/components/settings/access/users/Table.vue';
import {useMainStore} from '@/store';
import {onMounted, ref} from 'vue';
import {useAccountStore} from "@/store/access/account";
import {useUsersStore} from "@/store/access/users";
import {useGroupsStore} from "@/store/access/groups";
import ParamsTable from '@/components/settings/params/Table.vue';

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
      <q-tab name="users" label="Пользователи" icon="o_person" @click="usersStore.load()"/>
      <q-tab name="groups" label="Группы" icon="o_groups" @click="groupsStore.load()"/>
      <q-tab name="params" label="Параметры" icon="o_settings_applications"/>
    </q-tabs>

    <q-tab-panels v-model="tab" animated>

      <q-tab-panel name="users">
        <UsersTable/>
      </q-tab-panel>

      <q-tab-panel name="groups">
        <GroupsTable/>
      </q-tab-panel>

      <q-tab-panel name="params">
        <ParamsTable/>
      </q-tab-panel>

    </q-tab-panels>
  </div>
</template>

<style scoped>

</style>