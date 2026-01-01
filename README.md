# vue-quilly

Tiny Vue component, that helps to create [Quill v2](https://quilljs.com/) based WYSIWYG editors in Vue-powered apps.

[![npm version](https://img.shields.io/npm/v/vue-quilly?logo=npm&logoColor=fff)](https://www.npmjs.com/package/vue-quilly)
[![npm bundle size](https://img.shields.io/bundlephobia/min/vue-quilly)](https://www.npmjs.com/package/vue-quilly?activeTab=code)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/alekswebnet/vue-quilly)
[![NPM Type Definitions](https://img.shields.io/npm/types/vue-quilly)](https://www.npmjs.com/package/vue-quilly?activeTab=code)
[![GitHub License](https://img.shields.io/github/license/alekswebnet/vue-quilly)](https://github.com/alekswebnet/vue-quilly?tab=readme-ov-file#license)

## Features

- 🚀 Built on top of [Quill v2](https://github.com/quilljs/quill) and Vue 3
- 📦 Uses `quill/core` to prevent importing all Quill modules (minimal bundle size)
- 🔄 Works with both HTML and Quill Delta format
- 🔷 TypeScript support
- ⚙️ Highly customizable - build your own editor
- ⚡ Framework ready - works with Vue 3 and Nuxt 4

## Documentation

📖 **[Full Documentation](https://vue-quilly-docs.vercel.app/)**

- [Getting Started](https://vue-quilly-docs.vercel.app/guide/getting-started)
- [Installation Guide](https://vue-quilly-docs.vercel.app/guide/installation)
- [Basic Usage](https://vue-quilly-docs.vercel.app/guide/basic-usage)
- [API Reference](https://vue-quilly-docs.vercel.app/api/component)
- [Examples](https://vue-quilly-docs.vercel.app/examples/)

## Quick Start

### Installation

```bash
npm install vue-quilly quill@2
# or
pnpm add vue-quilly quill@2
# or
yarn add vue-quilly quill@2
```

### Basic Usage

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const content = ref('<p>Hello Quilly!</p>')
let quill: Quill | undefined

const options = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image']
    ]
  }
}

onMounted(() => {
  quill = editor.value?.initialize(Quill)
})
</script>

<template>
  <QuillyEditor ref="editor" v-model="content" :options="options" />
</template>
```

## Live Demo

🎯 **[Try it live](https://vue-quilly.vercel.app/)** - See various editors built with `vue-quilly`

## Examples

- [Demo Source Code](https://github.com/alekswebnet/vue-quilly/tree/main/demo) - Complete examples with different configurations
- [Nuxt 4 Integration](https://github.com/alekswebnet/vue-quilly/tree/main/nuxt) - SSR setup example
- [Browser CDN Setup](https://codepen.io/redrobot753/pen/VwJwPLP) - CodePen example

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=alekswebnet/vue-quilly&type=date&legend=top-left)](https://www.star-history.com/#alekswebnet/vue-quilly&type=date&legend=top-left)

## Support

If you find `vue-quilly` useful and want to support its development:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/oleksandrshevchuk)

❤️ Your support helps with maintenance, bug fixes, and long-term improvements.

## License

[MIT](https://choosealicense.com/licenses/mit/)
