---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "vue-quilly"
  text: ""
  tagline: Tiny Vue component for creating Quill v2 based WYSIWYG editors
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/alekswebnet/vue-quilly

features:
  - title: 🚀 Quill v2 Support
    details: Built on top of Quill v2 and Vue 3, providing modern rich text editing capabilities with the latest features.
  - title: 📦 Minimal Bundle Size
    details: Uses quill/core to prevent importing all Quill modules. Import only what you need to keep your bundle small.
  - title: 🔷 TypeScript Support
    details: Full TypeScript definitions included for better development experience, type safety, and IntelliSense support.
  - title: 🔄 Dual Format Support
    details: Works with both HTML and Quill Delta format. Use one or both formats to manipulate editor content.
  - title: ⚙️ Customizable
    details: Not an all-in-one solution. Build your own editor that matches your exact needs with flexible configuration.
  - title: ⚡ Framework Ready
    details: Works seamlessly with Vue 3 and Nuxt 4. SSR compatible with proper client-side initialization setup.
---

## Quick Start

Install vue-quilly and Quill v2:

::: code-group

```bash [npm]
npm install vue-quilly quill@2
```

```bash [pnpm]
pnpm add vue-quilly quill@2
```

```bash [yarn]
yarn add vue-quilly quill@2
```

:::

Use in your Vue component:

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

## Why vue-quilly?

vue-quilly is designed to be a flexible foundation for building custom Quill editors in Vue applications:

- **Customizable** - Requires Quill configuration, giving you full control over features.
- **Minimal footprint** - Import only the Quill modules you need to keep bundle size small
- **Flexible formats** - Work with HTML or Delta format, or use both for maximum flexibility
- **Full control** - Access the Quill instance directly for advanced customization and features

## Examples

Check out live examples and learn from real implementations:

- 🚀 [Live Demo](https://vue-quilly.vercel.app/) - See various editors built with vue-quilly
- 📚 [Demo Source Code](https://github.com/alekswebnet/vue-quilly/tree/main/demo) - Complete examples with source code
- ⚡ [Nuxt 4 Example](https://github.com/alekswebnet/vue-quilly/tree/main/nuxt) - SSR integration guide

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=alekswebnet/vue-quilly&type=date&legend=top-left)](https://www.star-history.com/#alekswebnet/vue-quilly&type=date&legend=top-left)

## Support the Project

If you find vue-quilly useful and want to support its development:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/oleksandrshevchuk)

❤️ Your support helps with maintenance, bug fixes, and long-term improvements.

