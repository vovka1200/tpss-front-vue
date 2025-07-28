<script setup lang="ts">

import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();

const currentRoute = ref(route.fullPath);

const includes = (s: string | string[]) => {
  if (Array.isArray(s)) {
    for (let i = 0; i < s.length; i++) {
      if (route.fullPath.includes(s[i])) {
        return true;
      }
    }
    return false;
  } else {
    return route.fullPath.includes(s)
  }
};

</script>

<template>
  <q-breadcrumbs active-color="white" class="text-caption">
    <q-breadcrumbs-el
        label="Задачи"
        icon="home"
        to="/tasks"
        v-if="includes('tasks')"
    />
    <q-breadcrumbs-el
        label="Настройки"
        icon="o_settings"
        to="/settings"
        v-if="includes(['settings','user','groups'])"
    />
    <q-breadcrumbs-el
        label="Пользователи"
        icon="o_person"
        to="/settings/users"
        v-if="includes('users')"
    />
    <q-breadcrumbs-el
        label="Пользователь"
        icon="o_person"
        :to="currentRoute"
        v-if="includes('users/')"
    />
    <q-breadcrumbs-el
        label="Группы"
        icon="o_groups"
        to="/settings/groups"
        v-if="includes('groups')"
    />
    <q-breadcrumbs-el
        label="Параметры"
        icon="o_settings_applications"
        to="/settings/params"
        v-if="includes('params')"
    />
  </q-breadcrumbs>
</template>

<style scoped>

</style>