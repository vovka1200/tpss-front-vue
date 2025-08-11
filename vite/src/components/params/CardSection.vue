<script setup lang="ts">

import {Param} from "@/models/params";

const props = defineProps<{
  params: Param[] | undefined
}>();

function isInteger(val: string) {
  return val == undefined || val.length === 0 || /^\d+$/.test(val);
}

function isFloat(val: string) {
  return val == undefined || val.length === 0 || /^\d+\.\d+$/.test(val);
}

</script>

<template>
  <div class="row" v-if="props.params?.length">
    <div v-for="param in props.params" class="q-px-xs col" style="flex: 0 0 25%;">
      <q-input v-if="param.type==='string'"
               v-model="(<ParamString>param).value"
               :label="param.name"
               type="text"
      />
      <q-input v-if="param.type==='int'"
               v-model="(<ParamNumber>param).value"
               :label="param.name"
               type="number"
               :rules="[val => isInteger(val) || 'Введите целое число']"
      />
      <q-input v-if="param.type==='float'"
               v-model="(<ParamNumber>param).value"
               :label="param.name"
               type="number"
               mask="#.##"
               :rules="[val => isFloat(val) || 'Введите дробное число']"
      />
      <q-select v-if="param.type==='select'"
                v-model="(<ParamSelect>param).value"
                :label="param.name"
                use-input
      />
    </div>
  </div>
</template>

<style scoped>

</style>