<script setup lang="ts">
import Groups from "@/components/settings/access/Groups.vue";
import Users from "@/components/settings/access/Users.vue";
import {useStore} from "@/store";
import {onMounted, ref} from "vue";

const tab = ref('users');

const store = useStore();
onMounted(() => {
  store.commit('SET_PANEL_TITLE', 'Панель управления');
})

</script>

<template>
  <div class="q-py-md text-dark">
    <q-tabs
        v-model="tab"
        dense
        class="primary"
        active-color="text-dark"
        indicator-color="text-grey"
        align="left"
        narrow-indicator
    >
      <q-tab name="users" label="Пользователи" icon="o_person"/>
      <q-tab name="groups" label="Группы" icon="o_groups"/>
      <q-tab name="variables" label="Переменные" icon="o_settings_applications"/>
    </q-tabs>

    <q-tab-panels v-model="tab" animated>

      <q-tab-panel name="users">
        <Users/>
      </q-tab-panel>

      <q-tab-panel name="groups">
        <Groups/>
      </q-tab-panel>

      <q-tab-panel name="variables">
        TEST
      </q-tab-panel>

    </q-tab-panels>
  </div>
</template>

<style scoped>

</style>