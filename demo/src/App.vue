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
const isDefaultBubbleTab = computed(() => params.tab === 'bubble')

const mdSrc = `
[![GitHub Release](https://img.shields.io/github/v/release/alekswebnet/vue-quilly)](https://github.com/alekswebnet/vue-quilly/releases)
[![npm version](https://img.shields.io/npm/v/vue-quilly?logo=npm&logoColor=fff)](https://www.npmjs.com/package/vue-quilly)
[![npm bundle size](https://img.shields.io/bundlephobia/min/vue-quilly)](https://www.npmjs.com/package/vue-quilly?activeTab=code)
[![NPM Type Definitions](https://img.shields.io/npm/types/vue-quilly)](https://www.npmjs.com/package/vue-quilly?activeTab=code)
[![GitHub License](https://img.shields.io/github/license/alekswebnet/vue-quilly)](https://github.com/alekswebnet/vue-quilly?tab=readme-ov-file#license)
`

const menuItems = computed(() => [
  {
    title: 'Default Editor (Snow theme)',
    tabKey: 'snow',
    selected: isDefaultSnowTab.value
  },
  {
    title: 'Default Editor (Bubble theme)',
    tabKey: 'bubble',
    selected: isDefaultBubbleTab.value
  },
  {
    title: 'Custom Editor',
    tabKey: 'custom',
    selected: isCustomTab.value
  }
])
</script>

<template>
  <div class="container">
    <h1>vue-quilly</h1>
    <p>Tiny Vue component, that helps to create Quill v2 based WYSIWYG editors</p>
    <vue-markdown :source="mdSrc" />
    <div class="pure-menu pure-menu-horizontal flex items-center">
      <ul class="pure-menu-list">
        <li class="pure-menu-item" v-for="item in menuItems" :class="{ 'pure-menu-selected': item.selected }">
          <a :href="`#tab=${item.tabKey}`" class="pure-menu-link">{{ item.title }}</a>
        </li>
        <li class="pure-menu-item" style="margin-left: auto">
          <a href="https://github.com/alekswebnet/vue-quilly/tree/main/demo" target="_blank" class="pure-menu-link" style="color: #0078e7">
            <span>Source code &nbsp;</span>
            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" stroke="#0078e7" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </a>
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
.pure-menu-link {
  display: inline-flex;
  align-items: center;
}
.pure-menu-horizontal .pure-menu-list {
  display: flex;
  overflow-y: auto;
  width: 100%;
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
.flex {
  display: flex;
}
.items-center {
  align-items: center!;
}
</style>