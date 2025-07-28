<script setup lang="ts">

import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();

const includes = (s: string) => route.fullPath.includes(s);


</script>

<template>
  <q-breadcrumbs active-color="white" class="text-caption">
    <q-breadcrumbs-el label="Задачи" icon="home" to="/tasks" v-if="includes('tasks')"/>
    <q-breadcrumbs-el label="Настройки" icon="o_settings" to="/settings" v-if="includes('settings')"/>
    <q-breadcrumbs-el label="Пользователи" icon="o_person" to="/settings/users" v-if="includes('users')"/>
    <q-breadcrumbs-el label="Группы" icon="o_groups" to="/settings/groups" v-if="includes('groups')"/>
    <q-breadcrumbs-el label="Параметры" icon="o_settings_applications" to="/settings/params" v-if="includes('params')"/>
  </q-breadcrumbs>
</template>

<style scoped>

</style>