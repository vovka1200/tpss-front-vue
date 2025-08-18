<script setup lang="ts">

import {computed, ref, watch} from "vue";
import Rules from "@/components/settings/access/groups/Rules.vue";
import BaseCard from "@/pages/BaseCard.vue";
import {useAccountStore} from "@/store/access/account";
import {Method} from "@/models/access/maxrix";
import {storeToRefs} from "pinia";
import {useCloned} from "@vueuse/core";
import {useWebsocketStore} from "@/store/websocket";
import {Notify} from "quasar";
import {useGroupsStore} from "@/store/access/groups";
import {accessDenied, accessReadOnly} from "@/helpers/notify";

const tab = ref('rules');
const store = useGroupsStore();
const {item} = storeToRefs(store);
const {cloned, sync} = useCloned(item);

const props = defineProps({
  id: String,
});

const readAllowed = computed(() => useAccountStore().allowed('Group') || true);
const writeAllowed = computed(() => useAccountStore().allowed('Group', Method.write));

watch(() => useWebsocketStore().authorized, (ok) => {
  if (ok) {
    if (!readAllowed.value) {
      accessDenied();
      return;
    }
    if (!writeAllowed.value) {
      accessReadOnly();
    }
    store.load(props.id);
  }
});

</script>

<template>
  <BaseCard drawer_head_height="5em" v-if="readAllowed">
    <template #card>
      <q-card>
        <q-toolbar>
          <q-toolbar-title>Редактирование группы</q-toolbar-title>
          <q-space/>
          <q-btn flat dense color="positive" icon="o_save">
            <q-tooltip>Сохранить</q-tooltip>
          </q-btn>
          <q-btn flat dense color="accent" icon="o_refresh">
            <q-tooltip>Отменить</q-tooltip>
          </q-btn>
          <q-btn flat dense color="negative" icon="o_cancel" @click="$emit('onClose')">
            <q-tooltip>Закрыть</q-tooltip>
          </q-btn>
        </q-toolbar>

        <q-separator/>

        <q-card-section>
          <q-item>
            <q-input v-bind:model-value="cloned?.name" label="Название"/>
          </q-item>
        </q-card-section>

      </q-card>
    </template>
    <template #bottom>
      <q-card>
        <q-tabs
            v-model="tab"
            dense
            active-color="text-dark"
            indicator-color="text-grey"
            align="left"
            narrow-indicator
        >
          <q-tab name="rules" label="Правила доступа"/>
        </q-tabs>
        <q-separator/>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="rules">
            <Rules v-bind:id="cloned.id"/>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </template>
  </BaseCard>
</template>

<style scoped>

</style>