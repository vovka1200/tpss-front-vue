<script setup lang="ts">
import Drawer from "@/components/Drawer.vue";
import {RouterView} from "vue-router";
import {computed, ref} from "vue";
import {useStore} from "@/store";
import UserMenu from "@/components/UserMenu.vue";

const openDrawer = ref(true);
const store = useStore();
const panel = computed(() => {
  return store.state.panel
});

</script>

<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="openDrawer=!openDrawer"/>
        <q-toolbar-title shrink>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg" alt="">
          </q-avatar>
          T.P.S.S.
        </q-toolbar-title>
        <q-toolbar-title>{{ panel }}</q-toolbar-title>
        <q-space/>
        <q-btn dense flat icon="o_account_circle">
          <q-tooltip> Настройки пользователя</q-tooltip>
          <UserMenu/>
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
</template>

<style scoped>

</style>