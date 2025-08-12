<script setup lang="ts">
import UserCard from '@/components/settings/access/users/Card.vue'
import {useRoute} from "vue-router";
import ConfirmSave from "@/components/ConfirmSave.vue";
import {ref} from "vue";
import {useUsersStore} from "@/store/access/users";
import app from "@/main";
import {User} from "@/models/access/users";

const id = useRoute().params.id as string;
const confirm = ref();

const store = useUsersStore();
let tmp = <User>{};

const onClose = () => {
  app.config.globalProperties.$router.go(-1);
};

const onSave = (item: User) => {
  tmp = item;
  confirm.value.show();
};

const onConfirm = () => {
  store.item = tmp;
  store.save();
};

</script>

<template>
  <UserCard :id="id" @on-save="onSave" @on-close="onClose"/>
  <ConfirmSave ref="confirm" @on-confirm="onConfirm"/>
</template>
<style scoped>

</style>