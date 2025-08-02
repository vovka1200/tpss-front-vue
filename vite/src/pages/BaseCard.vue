<script setup lang="ts">

defineProps({
  drawer_head_height: String
})

</script>

<template>
  <q-page class="q-pa-sm">
    <div class="cols">
      <div class="q-pa-sm">
        <slot name="card"/>
        <div class="q-mt-sm">
          <slot name="bottom"/>
        </div>
      </div>
      <q-drawer show-if-above side="right" bordered>
        <div class="absolute-top bg-accent q-pa-sm base-drawer-head">
          <slot name="drawer_head"/>
        </div>
        <q-scroll-area class="text-dark base-drawer-scroll">
          <q-list class="q-px-sm">
            <slot name="drawer_list"/>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </div>
  </q-page>
</template>

<style scoped>

.base-drawer-head {
  color: var(--vt-c-white-soft);
  height: v-bind('drawer_head_height');
}

.base-drawer-scroll {
  height: calc(100% - v-bind('drawer_head_height') - 8px);
  margin-top: calc(v-bind('drawer_head_height') + 8px);
}

</style>