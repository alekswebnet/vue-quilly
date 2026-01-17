<script setup lang="ts">
import { computed } from 'vue';
import CustomEditor from './components/CustomEditor.vue'
import DefaultEditorSnow from './components/DefaultEditorSnow.vue'
import DefaultEditorBubble from './components/DefaultEditorBubble.vue'
import VueMarkdown from 'vue-markdown-render'
import { useUrlSearchParams } from '@vueuse/core'
import ImageResizeEditor from './components/ImageResizeEditor.vue'
import SemanticHTMLEditor from './components/SemanticHTMLEditor.vue'
import { Analytics } from '@vercel/analytics/vue'

const params = useUrlSearchParams('hash-params')

const isSemanticTab = computed(() => params.tab === 'semantic')
const isCustomTab = computed(() => params.tab === 'custom')
const isDefaultSnowTab = computed(() => !params.tab || params.tab === 'snow')
const isImageResizeTab = computed(() => params.tab === 'image-resize')
const isDefaultBubbleTab = computed(() => params.tab === 'bubble')

const mdSrc = `
[![npm version](https://img.shields.io/npm/v/vue-quilly?logo=npm&logoColor=fff)](https://www.npmjs.com/package/vue-quilly)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/alekswebnet/vue-quilly)
[![npm downloads](https://img.shields.io/npm/dm/vue-quilly?color=green)](https://npm.chart.dev/vue-quilly)
[![NPM Type Definitions](https://img.shields.io/npm/types/vue-quilly)](https://www.npmjs.com/package/vue-quilly?activeTab=code)
[![GitHub License](https://img.shields.io/github/license/alekswebnet/vue-quilly)](https://github.com/alekswebnet/vue-quilly?tab=readme-ov-file#license)

- [Full Documentation](https://vue-quilly-docs.vercel.app/) - Comprehensive guide and API reference
- [Demo Source Code](https://github.com/alekswebnet/vue-quilly/tree/main/demo) - Complete examples with different configurations
- [Nuxt 4 Integration](https://github.com/alekswebnet/vue-quilly/tree/main/nuxt) - SSR setup example
- [Browser CDN Setup](https://codepen.io/redrobot753/pen/VwJwPLP) - CodePen example
`

const menuItems = computed(() => [
  {
    title: 'Snow theme',
    tabKey: 'snow',
    selected: isDefaultSnowTab.value
  },
  {
    title: 'Bubble theme',
    tabKey: 'bubble',
    selected: isDefaultBubbleTab.value
  },
  {
    title: 'Semantic HTML',
    tabKey: 'semantic',
    selected: isSemanticTab.value
  },
  {
    title: 'Default Editor + Image Resize',
    tabKey: 'image-resize',
    selected: isImageResizeTab.value
  },
  {
    title: 'Custom Editor',
    tabKey: 'custom',
    selected: isCustomTab.value
  }
])
</script>

<template>
  <div class="container" style="padding-top: 1rem; padding-bottom: 10rem;">
    <nav class="nav">
      <div class="nav-left">
        <h1>🪶 vue-quilly</h1>
      </div>
      <div class="nav-right">
        <a href="https://github.com/alekswebnet/vue-quilly" target="_blank" class="button icon-only clear">
          <img src="https://icongr.am/devicon/github-original.svg?size=24&color=currentColor">
        </a>
        <a href="https://www.npmjs.com/package/vue-quilly" target="_blank" class="button icon-only clear">
          <img src="https://icongr.am/devicon/npm-original-wordmark.svg?size=24&color=currentColor">
        </a>
        <a href="https://ko-fi.com/oleksandrshevchuk" target="_blank" class="button icon-only clear">
          <img src="https://icongr.am/simple/buymeacoffee.svg?size=24&colored=true">
        </a>
      </div>
    </nav>
    <p>Tiny Vue component, that helps to create Quill v2 based WYSIWYG editors</p>
    <vue-markdown :source="mdSrc" />
    <nav class="tabs" style="flex-wrap: wrap; margin-bottom: 3rem; row-gap: 1rem;">
        <a 
          v-for="item in menuItems" 
          :href="`#tab=${item.tabKey}`" 
          :class="{'active text-primary': item.selected }">
          {{ item.title }}
        </a>
    </nav>

    <DefaultEditorSnow v-if="isDefaultSnowTab" />
    <DefaultEditorBubble v-if="isDefaultBubbleTab" />
    <SemanticHTMLEditor v-if="isSemanticTab" />
    <ImageResizeEditor v-if="isImageResizeTab" />
    <CustomEditor v-if="isCustomTab" />
  </div>
  <Analytics />
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  word-break: break-all;
}
:root {
  --bg-color: #ffffff;
  --bg-secondary-color: #2d2d2d;
  --color-primary: #3ca877;
  --color-lightGrey: #d2d6dd;
  --color-grey: #747681;
  --color-darkGrey: #3f4144;
  --color-error: #d43939;
  --color-success: #28bd14;
  --grid-maxWidth: 120rem;
  --grid-gutter: 2rem;
  --font-size: 16px;
  --font-color: #333333;
  --font-family-sans: sans-serif;
  --font-family-mono: monaco, "Consolas", "Lucida Console", monospace;
}
</style>