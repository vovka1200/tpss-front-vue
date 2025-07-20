<script setup lang="ts">
import {RouterView} from 'vue-router'
import Drawer from './components/Drawer.vue'
import {ref, computed} from "vue";
import Authorize from "./components/Authorize.vue";
import {useStore} from "@/store";

const openDrawer = ref(true)

const store = useStore();
const panel = computed(() => {
  return store.state.panel
});

</script>

<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="text-dark bg-secondary">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="openDrawer=!openDrawer"/>
        <q-toolbar-title shrink>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg">
          </q-avatar>
          T.P.S.S.
        </q-toolbar-title>
        <q-toolbar-title>{{ panel }}</q-toolbar-title>
        <q-space/>
        <q-btn dense flat icon="o_account_circle" @click="$router.push('/account')">
          <q-tooltip> Настройки пользователя</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="o_info" @click="$router.push('/about')">
          <q-tooltip>О программе</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="o_settings" @click="$router.push('/settings')" v-if="store.getters.allowed('settings')">
          <q-tooltip>Панель управления</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <Drawer :visible="openDrawer"/>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>

  <Authorize/>

</template>

<style scoped>
</style>
