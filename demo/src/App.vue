<script setup lang="ts">
import { computed } from 'vue';
import BasicEditor from './components/BasicEditor.vue'
import CompleteEditor from './components/CompleteEditor.vue'
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams('hash-params')

const isBasicTab = computed(() => !params.tab || params.tab === 'basic')
const isCompleteTab = computed(() => params.tab === 'complete')
</script>

<template>
  <div class="container">
    <h1>vue-quilly</h1>
    <div class="pure-menu pure-menu-horizontal">
      <a href="https://github.com/alekswebnet/vue-quilly/tree/main/demo" target="_blank" class="pure-menu-heading pure-menu-link">Github 🔗</a>
      <ul class="pure-menu-list">
          <li class="pure-menu-item" :class="{ 'pure-menu-selected': isBasicTab }">
              <a href="#tab=basic" class="pure-menu-link">Basic Editor</a>
          </li>
          <li class="pure-menu-item" :class="{ 'pure-menu-selected': isCompleteTab }">
              <a href="#tab=complete" class="pure-menu-link">Complete Editor</a>
          </li>
      </ul>
    </div>
    <hr>
    <BasicEditor v-if="isBasicTab" />
    <CompleteEditor v-if="isCompleteTab" />
  </div>
</template>

<style>
html,
button,
input,
textarea {
  font-family: system-ui, sans-serif;
  font-size: 14px;
}
body {
  margin: 0;
  padding: 0;
  padding: 30px;
  font-size: 14px;
  text-rendering: optimizeSpeed;
}
.container {
  max-width: 1060px;
  width: 100%;
  margin: auto;
}
.text-label {
  text-transform: uppercase;
  color: slategray;
}
button + button {
  margin-left: 10px;
}
</style>
