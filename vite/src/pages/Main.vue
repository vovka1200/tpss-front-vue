<script setup lang="ts">

import {RouterView} from "vue-router";
import {ref} from "vue";
import {useMainStore} from "@/store";
import UserMenu from "@/components/UserMenu.vue";
import {useAccountStore} from "@/store/access/account";
import MainMenu from "@/components/MainMenu.vue";
import Navigator from "@/components/Navigator.vue";

const miniMenu = ref(false);
const mainStore = useMainStore();
const accountStore = useAccountStore();

</script>

<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="miniMenu=!miniMenu"/>
        <q-toolbar-title shrink>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg" alt="">
          </q-avatar>
          T.P.S.S.
        </q-toolbar-title>
        <q-toolbar-title>
          <Navigator/>
        </q-toolbar-title>
        <q-space/>
        <q-btn dense flat icon="o_account_circle" v-if="accountStore.token!=''">
          <q-tooltip> Настройки пользователя</q-tooltip>
          <UserMenu/>
        </q-btn>
        <q-btn dense flat icon="o_info" @click="$router.push('/about')">
          <q-tooltip>О программе</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="o_settings" @click="$router.push('/settings')" v-if="accountStore.allowed('settings')">
          <q-tooltip>Панель управления</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <MainMenu :mini="!miniMenu"/>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<style scoped>

</style>