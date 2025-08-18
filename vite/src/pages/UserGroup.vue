<script setup lang="ts">

import GroupCard from "@/components/settings/access/groups/Card.vue";
import ConfirmSave from "@/components/ConfirmSave.vue";
import app from "@/main";
import {ref} from "vue";
import {useGroupsStore} from "@/store/access/groups";
import {useRoute} from "vue-router";
import {Group} from "@/models/access/groups";

const id = useRoute().params.id as string;
const confirm = ref();

const store = useGroupsStore();
let tmp = <Group>{};

const onClose = () => {
  app.config.globalProperties.$router.go(-1);
};

const onSave = (item: Group) => {
  confirm.value.show();
};

const onConfirm = () => {
  store.item = tmp;
  store.save();
};

</script>

<template>
  <GroupCard :id="id" @on-save="onSave" @on-close="onClose"/>
  <ConfirmSave ref="confirm" @on-confirm="onConfirm"/>
</template>

<style scoped>

</style>