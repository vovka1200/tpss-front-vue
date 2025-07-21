<script setup lang="ts">
import GroupsTable from '@/components/settings/access/groups/Table.vue';
import UsersTable from '@/components/settings/access/users/Table.vue';
import {useStore} from '@/store';
import {onMounted, ref} from 'vue';

const tab = ref('users');

const store = useStore();
onMounted(() => {
  store.commit('SET_PANEL_TITLE', 'Панель управления');
})

</script>

<template>
  <div class="q-py-md" v-if="store.getters.allowed('settings')">
    <q-tabs
        v-model="tab"
        dense
        active-color="text-dark"
        indicator-color="text-grey"
        align="left"
        narrow-indicator
    >
      <q-tab name="users" label="Пользователи" icon="o_person" @click="store.dispatch('loadUsers')"/>
      <q-tab name="groups" label="Группы" icon="o_groups" @click="store.dispatch('loadGroups')"/>
      <q-tab name="variables" label="Переменные" icon="o_settings_applications"/>
    </q-tabs>

    <q-tab-panels v-model="tab" animated>

      <q-tab-panel name="users">
        <UsersTable/>
      </q-tab-panel>

      <q-tab-panel name="groups">
        <GroupsTable/>
      </q-tab-panel>

      <q-tab-panel name="variables">
        TEST
      </q-tab-panel>

    </q-tab-panels>
  </div>
</template>

<style scoped>

</style>