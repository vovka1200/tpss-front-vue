<script setup lang="ts">
import {RouterView} from 'vue-router'
import Drawer from './components/Drawer.vue'
import {ref} from "vue";

const openDrawer = ref(true)

</script>

<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="openDrawer=!openDrawer"/>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg">
          </q-avatar>
          T.P.S.S.
        </q-toolbar-title>
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
