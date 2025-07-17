<script setup lang="ts">

defineProps({
  visible: {
    type: Boolean,
    required: true,
    default: true,
  },
})
</script>

<template>
  <q-drawer
      show-if-above
      v-bind:mini="visible"
      side="left"
      bordered
      :width="180"
      :breakpoint="500"
      class="text-dark bg-primary"
  >
    <q-scroll-area class="fit">
      <q-list padding class="menu-list">

        <q-item clickable @click="$router.push('/clients')">
          <q-item-section avatar>
            <q-icon name="o_people"/>
            <q-tooltip>Клиенты</q-tooltip>
          </q-item-section>
          <q-item-section>Клиенты</q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="o_article"/>
            <q-tooltip>Контракты</q-tooltip>
          </q-item-section>
          <q-item-section>Контракты</q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="o_location_on"/>
            <q-tooltip>Адреса</q-tooltip>
          </q-item-section>
          <q-item-section>Адреса</q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="o_widgets"/>
            <q-tooltip>Объекты</q-tooltip>
          </q-item-section>
          <q-item-section>Объекты</q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="o_task"/>
            <q-tooltip>Задачи</q-tooltip>
          </q-item-section>
          <q-item-section>Задачи</q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="o_account_tree"/>
            <q-tooltip>Сценарии</q-tooltip>
          </q-item-section>
          <q-item-section>Сценарии</q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="o_analytics"/>
            <q-tooltip>Отчёты</q-tooltip>
          </q-item-section>
          <q-item-section>Отчёты</q-item-section>
        </q-item>

      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped>

</style>