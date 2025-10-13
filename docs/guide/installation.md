# Installation

This guide covers installing vue-quilly in different environments and setups.

## Package Managers

Install vue-quilly and Quill using your preferred package manager:

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

## Import Methods

### Full Build

Import the full Quill build if you need all modules:

```typescript
import Quill from 'quill'
import { QuillyEditor } from 'vue-quilly'
```

**Use when:**
- You need most Quill features
- Bundle size is not a primary concern
- Rapid prototyping

### Core Build (Recommended)

Import only the core build and register modules as needed:

```typescript
import Quill from 'quill/core'
import { QuillyEditor } from 'vue-quilly'
```

**Use when:**
- You want minimal bundle size
- You need specific features only
- Building for production

**Example with selective imports:**

```typescript
import Quill from 'quill/core'
import Toolbar from 'quill/modules/toolbar'
import Bold from 'quill/formats/bold'
import Italic from 'quill/formats/italic'
import Header from 'quill/formats/header'

Quill.register({
  'modules/toolbar': Toolbar,
  'formats/bold': Bold,
  'formats/italic': Italic,
  'formats/header': Header
})
```

## Styles

Import Quill CSS styles based on your needs:

### Core Styles (Required)

Always import the core styles:

```typescript
import 'quill/dist/quill.core.css'
```

### Theme Styles (Optional)

Import a theme if you're using one:

::: code-group

```typescript [Snow Theme]
import 'quill/dist/quill.snow.css'
```

```typescript [Bubble Theme]
import 'quill/dist/quill.bubble.css'
```

:::

**Complete import example:**

```typescript
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
```

## Component Registration

### Global Registration

Register globally in your main app file:

```typescript
// main.ts
import { createApp } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import App from './App.vue'

const app = createApp(App)
app.component('QuillyEditor', QuillyEditor)
app.mount('#app')
```

Then use it anywhere in your app:

```vue
<template>
  <QuillyEditor v-model="content" />
</template>
```

### Local Registration

Import and register in individual components:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const content = ref('')
let quill: Quill | undefined

onMounted(() => {
  quill = editor.value?.initialize(Quill)
})
</script>

<template>
  <QuillyEditor ref="editor" v-model="content" />
</template>
```

**Use local registration when:**
- You only need the editor in specific components
- You want to keep bundle size minimal with tree-shaking
- You prefer explicit imports over global registration

### Type Declarations

Types are automatically available when you import:

```typescript
import type { QuillyEditor } from 'vue-quilly'
import type { 
  QuillOptions, 
  Delta, 
  Range 
} from 'quill/core'
```

### Nuxt 3/4

Use dynamic imports with `import.meta.client` check since Quill is browser-only:

**Component (e.g., `components/Editor.vue`):**

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill, { Delta, Range } from 'quill/core'
import 'quill/dist/quill.snow.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const content = ref('<p>Hello Nuxt!</p>')
let quill: Quill | undefined

const options = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image']
    ]
  },
  placeholder: 'Insert text here...',
  readOnly: false
}

onMounted(async () => {
  if (import.meta.client) {
    const QuillClass = (await import('quill')).default
    quill = editor.value?.initialize(QuillClass) as Quill
  }
})
</script>

<template>
  <QuillyEditor ref="editor" v-model="content" :options="options" />
</template>
```

**App/Page (e.g., `app.vue` or `pages/index.vue`):**

```vue
<template>
  <div>
    <ClientOnly>
      <Editor />
    </ClientOnly>
  </div>
</template>
```

**Key points:**
- Wrap the editor component in `<ClientOnly>` in your app/page, not in the component itself
- Use `import.meta.client` check before dynamic import in the component
- Import Quill dynamically in `onMounted` hook
- Import types from `quill/core`: `import Quill, { Delta, Range } from 'quill/core'`

See our [Nuxt example](https://github.com/alekswebnet/vue-quilly/tree/main/nuxt) for a complete implementation.

## Additional Modules

### KaTeX (for formulas)

Install KaTeX for formula support:

```bash
pnpm add katex
```

```typescript
import katex from 'katex'
import 'katex/dist/katex.min.css'

// Make KaTeX available globally
(window.katex as typeof katex) = katex
```

### Image Resize

Install the image resize module:

```bash
pnpm add quill-image-resize-module
```

```typescript
import 'quill-image-resize-module'

const options = {
  modules: {
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar']
    }
  }
}
```

## CDN Usage

For quick prototyping or simple pages, use CDN:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Quill CSS -->
  <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet">
</head>
<body>
  <div id="app">
    <quilly-editor ref="editor" v-model="content" :options="options" />
  </div>

  <!-- Quill JS -->
  <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>
  
  <!-- Vue 3 -->
  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js",
        "vue-quilly": "https://unpkg.com/vue-quilly@latest/dist/vue-quilly.js"
      }
    }
  </script>

  <script type="module">
    import { createApp, ref, onMounted } from 'vue'
    import { QuillyEditor } from 'vue-quilly'

    createApp({
      components: { QuillyEditor },
      setup() {
        const editor = ref()
        const content = ref('<p>Hello!</p>')
        const options = {
          theme: 'snow',
          modules: { toolbar: true }
        }

        onMounted(() => {
          editor.value.initialize(Quill)
        })

        return { editor, content, options }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

[Try on CodePen](https://codepen.io/redrobot753/pen/VwJwPLP)

## Troubleshooting

### Module Not Found

If you get module not found errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- [Basic Usage](/guide/basic-usage) - Learn how to use the editor
- [Examples](/examples/) - See practical implementations
- [API Reference](/api/component) - Detailed documentation

## Version Compatibility

| vue-quilly | Quill | Vue |
|-----------|-------|-----|
| 1.x | 2.x | 3.x |

Always use Quill v2 with vue-quilly.
