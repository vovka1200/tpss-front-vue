<script setup lang="ts">

import {ref} from "vue";

const openDrawer = ref(true)

</script>

<template>
  <q-header elevated class="text-dark bg-secondary">
    <q-toolbar>
      <q-btn dense flat round icon="menu"
             @click="openDrawer=!openDrawer"/>
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg">
        </q-avatar>
        T.P.S.S.
      </q-toolbar-title>
      <q-btn dense flat icon="o_account_circle" @click="$router.push('/account')"/>
      <q-btn dense flat icon="o_info" @click="$router.push('/about')"/>
    </q-toolbar>
  </q-header>
</template>

<style scoped>

</style>