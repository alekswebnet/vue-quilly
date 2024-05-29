<script setup lang="ts">
import { computed } from 'vue';
import CustomEditor from './components/CustomEditor.vue'
import DefaultEditorSnow from './components/DefaultEditorSnow.vue'
import DefaultEditorBubble from './components/DefaultEditorBubble.vue'
import VueMarkdown from 'vue-markdown-render'
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams('hash-params')

const isCustomTab = computed(() => params.tab === 'custom')
const isDefaultSnowTab = computed(() => !params.tab || params.tab === 'snow')
const isDefaultBubbleTab = computed(() => !params.tab || params.tab === 'bubble')

const mdSrc = `
[![GitHub Release](https://img.shields.io/github/v/release/alekswebnet/vue-quilly)](https://github.com/alekswebnet/vue-quilly/releases)
[![npm version](https://img.shields.io/npm/v/vue-quilly?logo=npm&logoColor=fff)](https://www.npmjs.com/package/vue-quilly)
[![npm bundle size](https://img.shields.io/bundlephobia/min/vue-quilly)](https://www.npmjs.com/package/vue-quilly?activeTab=code)
[![NPM Type Definitions](https://img.shields.io/npm/types/vue-quilly)](https://www.npmjs.com/package/vue-quilly?activeTab=code)
[![GitHub License](https://img.shields.io/github/license/alekswebnet/vue-quilly)](https://github.com/alekswebnet/vue-quilly?tab=readme-ov-file#license)
`
</script>

<template>
  <div class="container">
    <h1>vue-quilly</h1>
    <p>Tiny Vue component, that helps to create Quill v2 based WYSIWYG editors</p>
    <vue-markdown :source="mdSrc" />
    <div class="pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
        <li class="pure-menu-item" :class="{ 'pure-menu-selected': isDefaultSnowTab }">
            <a href="#tab=snow" class="pure-menu-link">Default Editor (Snow theme)</a>
        </li>
        <li class="pure-menu-item" :class="{ 'pure-menu-selected': isDefaultBubbleTab }">
            <a href="#tab=bubble" class="pure-menu-link">Default Editor (Bubble theme)</a>
        </li>
        <li class="pure-menu-item" :class="{ 'pure-menu-selected': isCustomTab }">
            <a href="#tab=custom" class="pure-menu-link">Custom Editor</a>
        </li>
      </ul>
    </div>
    <hr>
    <DefaultEditorSnow v-if="isDefaultSnowTab" />
    <DefaultEditorBubble v-if="isDefaultBubbleTab" />
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