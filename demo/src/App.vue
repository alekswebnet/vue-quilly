<script setup lang="ts">
import { computed } from 'vue';
import CustomEditor from './components/CustomEditor.vue'
import DefaultEditor from './components/DefaultEditor.vue'
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams('hash-params')

const isCustomTab = computed(() => params.tab === 'custom')
const isDefaultTab = computed(() => !params.tab || params.tab === 'default')
</script>

<template>
  <div class="container">
    <h1>vue-quilly</h1>
    <div class="pure-menu pure-menu-horizontal">
      <a href="https://github.com/alekswebnet/vue-quilly/tree/main/demo" target="_blank" class="pure-menu-heading pure-menu-link">Github 🔗</a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item" :class="{ 'pure-menu-selected': isDefaultTab }">
            <a href="#tab=default" class="pure-menu-link">Default Editor</a>
        </li>
        <li class="pure-menu-item" :class="{ 'pure-menu-selected': isCustomTab }">
            <a href="#tab=custom" class="pure-menu-link">Custom Editor</a>
        </li>
      </ul>
    </div>
    <hr>
    <DefaultEditor v-if="isDefaultTab" />
    <CustomEditor v-if="isCustomTab" />
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
  margin-left: 2px;
}
.button-xsmall {
  font-size: 70%;
 }
</style>
./components/CustomEditor.vue./components/DefaultEditor.vue