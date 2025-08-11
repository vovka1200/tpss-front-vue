<script setup lang="ts">
import BaseCard from "@/pages/BaseCard.vue";
import {computed, ref, shallowRef, watch} from "vue";
import {useRoute} from "vue-router";
import {useUsersStore} from "@/store/access/users";
import ParamsSection from '@/components/params/CardSection.vue';
import {useWebsocketStore} from "@/store/websocket";
import {useAccountStore} from "@/store/access/account";
import {Method} from "@/models/access/maxrix";
import {Notify} from "quasar";
import {date} from 'quasar'
import {useCloned} from "@vueuse/core";
import {storeToRefs} from "pinia";
import app from "@/main";

const tab = ref('tasks');

const id = useRoute().params.id as string;
const store = useUsersStore();
const {item} = storeToRefs(store);
const {cloned, sync} = useCloned(item);

const readAllowed = computed(() => useAccountStore().allowed('User'));
const writeAllowed = computed(() => useAccountStore().allowed('User', Method.write));

watch(() => useWebsocketStore().authorized, (ok) => {
  if (ok) {
    if (!readAllowed.value) {
      Notify.create({
        icon: 'block',
        color: 'negative',
        message: `Доступ ограничен`,
      });
      return;
    }
    if (!writeAllowed.value) {
      Notify.create({
        icon: 'block',
        color: 'warning',
        message: `Доступ ограничен`,
      });
    }
    if (useUsersStore().list.length === 0) {
      useUsersStore().load(id);
    }
  }
});

const onClose = () => {
  app.config.globalProperties.$router.go(-1);
};

</script>

<template>
  <BaseCard drawer_head_height="5em" v-if="readAllowed">
    <template #card>
      <q-card>
        <q-toolbar>
          <q-toolbar-title>Редактирование пользователя</q-toolbar-title>
          <q-space/>
          <q-btn flat icon="o_settings_suggest" v-if="writeAllowed">
            <q-tooltip>Добавить параметр</q-tooltip>
          </q-btn>
          <q-separator vertical/>
          <q-btn flat color="positive" icon="o_save" v-if="writeAllowed">
            <q-tooltip>Сохранить</q-tooltip>
          </q-btn>
          <q-btn flat color="accent" icon="o_refresh" @click="sync();">
            <q-tooltip>Отменить</q-tooltip>
          </q-btn>
          <q-btn flat color="negative" icon="o_cancel" @click="onClose">
            <q-tooltip>Закрыть</q-tooltip>
          </q-btn>
        </q-toolbar>

        <q-separator/>
        <div class="row" style="flex-wrap: nowrap;">
          <q-card-section style="flex-shrink: 0;">
            <q-item-label>Основные данные</q-item-label>
            <q-input v-model="cloned.username" label="Имя(логин)"/>
            <q-input v-model="cloned.password" label="Пароль" type="password"/>
            <q-input v-model="cloned.name" label="ФИО"/>
          </q-card-section>
          <q-separator vertical/>
          <q-card-section>
            <q-item-label>Дополнительные параметры</q-item-label>
            <ParamsSection :params="cloned.params"/>
          </q-card-section>
        </div>

      </q-card>
    </template>
    <template #drawer_head>
      <q-select dark
                v-model="cloned.statusId"
                option-label="name"
                option-value="id"
                label="Статус"
                label-color="white"
                :options="[]"
      >
        <template v-slot:prepend>
          <q-icon name="workspace_premium"/>
        </template>
      </q-select>
    </template>
    <template #drawer_list>
      <q-input readonly :model-value="date.formatDate(cloned?.created,'DD.MM.YYYY')" label="Создан">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date :model-value="date.formatDate(cloned?.created,'YYYY/MM/DD')">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Закрыть" color="primary" flat/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input readonly :model-value="date.formatDate(cloned?.updated,'DD.MM.YYYY')" label="Обновлён">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date :model-value="date.formatDate(cloned?.updated,'YYYY/MM/DD')">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Закрыть" color="primary" flat/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
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
          <q-tab name="tasks" label="Задачи"/>
          <q-tab name="location" label="Геолокация"/>
        </q-tabs>
        <q-separator/>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="tasks">tests</q-tab-panel>
          <q-tab-panel name="location">test2222</q-tab-panel>
        </q-tab-panels>
      </q-card>
    </template>

  </BaseCard>
</template>
<style scoped>

</style>