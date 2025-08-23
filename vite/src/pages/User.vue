<script setup lang="ts">
import UserCard from '@/components/settings/access/users/Card.vue'
import {useRoute} from "vue-router";
import {useUsersStore} from "@/store/access/users";
import app from "@/main";
import {User} from "@/models/access/users";

const id = useRoute().params.id as string;

const store = useUsersStore();

const onClose = () => {
  app.config.globalProperties.$router.go(-1);
};

const onSave = (user: User) => {
  store.item = user;
  store.save();
};

</script>

<template>
  <UserCard :id="id" @on-save="onSave" @on-close="onClose"/>
</template>

<style scoped>

</style>