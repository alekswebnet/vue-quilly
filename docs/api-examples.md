---
outline: deep
---

# Examples

This page showcases different editor configurations and use cases built with vue-quilly. Each example demonstrates specific features and integration patterns.

## Snow Theme Editor

The classic Quill editor with the Snow theme, featuring a full toolbar with all formatting options.

**Features:**
- Complete toolbar with all formatting options
- Formula support with KaTeX
- Image and video embedding
- Font, size, and color customization
- Headers, lists, and alignment

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import { Delta, Range } from 'quill/core'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'

// Enable formula support
(window.katex as typeof katex) = katex

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref<string>('<h1>Hello World!</h1><p>Start writing...</p>')
const editorDelta = ref<Delta>()
const editorRange = ref<Range>()

let quill: Quill | null = null

const options = ref({
  theme: 'snow',
  modules: {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'super' }, { script: 'sub' }],
      [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['direction', { align: [] }],
      ['link', 'image', 'video', 'formula'],
      ['clean']
    ]
  },
  placeholder: 'Insert text here ...',
  readOnly: false
})

onMounted(() => {
  quill = editor.value?.initialize(Quill)!
})

const onTextChange = ({ delta }: { delta: Delta }) => (editorDelta.value = delta)
const onSelectionChange = ({ range }: { range: Range }) => (editorRange.value = range)
</script>

<template>
  <QuillyEditor
    ref="editor"
    v-model="model"
    :options="options"
    @text-change="onTextChange"
    @selection-change="onSelectionChange"
  />
</template>
```

[View Source](https://github.com/alekswebnet/vue-quilly/blob/main/demo/src/components/DefaultEditorSnow.vue)

---

## Bubble Theme Editor

Lightweight editor with the Bubble theme that shows toolbar on text selection.

**Features:**
- Medium-style inline toolbar
- Appears on text selection
- Same formatting capabilities as Snow theme
- Cleaner, more minimalist interface

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'

(window.katex as typeof katex) = katex

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref<string>('<p>Select text to see the bubble toolbar!</p>')

const options = ref({
  theme: 'bubble',
  modules: {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video', 'formula'],
      ['clean']
    ]
  },
  placeholder: 'Insert text here ...',
  readOnly: false
})

onMounted(() => {
  editor.value?.initialize(Quill)
})
</script>

<template>
  <QuillyEditor
    ref="editor"
    v-model="model"
    :options="options"
  />
</template>
```

[View Source](https://github.com/alekswebnet/vue-quilly/blob/main/demo/src/components/DefaultEditorBubble.vue)

---

## Semantic HTML Editor

Editor configured to output clean, semantic HTML without Quill-specific classes.

**Features:**
- Clean HTML output (e.g., `<h1>` instead of `<p class="ql-header-1">`)
- Better for SEO and accessibility
- Easy content portability
- Ideal for CMS and blog posts

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref<string>('<h1>Semantic HTML</h1><p>Clean output!</p>')

const options = ref({
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image']
    ]
  },
  placeholder: 'Insert text here ...',
  readOnly: false
})

onMounted(() => {
  editor.value?.initialize(Quill)
})
</script>

<template>
  <QuillyEditor
    ref="editor"
    v-model="model"
    :options="options"
    :is-semantic-html-model="true"
  />
</template>
```

**Output comparison:**

::: code-group

```html [Regular HTML]
<p class="ql-header-1">Heading</p>
<ul>
  <li class="ql-list-item">Item</li>
</ul>
```

```html [Semantic HTML]
<h1>Heading</h1>
<ul>
  <li>Item</li>
</ul>
```

:::

[View Source](https://github.com/alekswebnet/vue-quilly/blob/main/demo/src/components/SemanticHTMLEditor.vue)

---

## Image Resize Editor

Editor with image resize functionality using the `quill-image-resize-module`.

**Features:**
- Drag to resize images
- Display size indicator
- Resize handles on images
- Image alignment toolbar

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

// Expose Quill to window for the resize module
window.Quill = Quill

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref<string>('<p>Add an image and resize it!</p>')

const options = ref({
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['image'],
      ['clean']
    ],
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  },
  placeholder: 'Insert text here ...',
  readOnly: false
})

onMounted(async () => {
  window.Quill.imports.parchment.Attributor.Style = 
    window.Quill.imports.parchment.StyleAttributor
  
  // Dynamically import resize module
  await import('quill-image-resize-module')
  
  editor.value?.initialize(window.Quill)
})
</script>

<template>
  <QuillyEditor
    ref="editor"
    v-model="model"
    :options="options"
  />
</template>
```

**Installation:**

```bash
pnpm add quill-image-resize-module
```

[View Source](https://github.com/alekswebnet/vue-quilly/blob/main/demo/src/components/ImageResizeEditor.vue)

---

## Custom Editor (Core Build)

Minimal custom editor using `quill/core` with only specific blots registered.

**Features:**
- Minimal bundle size (uses `quill/core`)
- Custom blots (Bold, Italic, Headers)
- External toolbar controls
- Perfect for custom implementations

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill, { Delta, Range } from 'quill/core'
import { type BlotConstructor } from 'parchment'
import 'quill/dist/quill.core.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref<string>('<h1>Custom Editor</h1><p>Minimal setup!</p>')

let quill: Quill | null = null

// Import base blots
const Inline = Quill.import('blots/inline') as BlotConstructor
const Block = Quill.import('blots/block') as BlotConstructor

// Define custom blots
class BoldBlot extends Inline {}
BoldBlot.blotName = 'bold'
BoldBlot.tagName = 'strong'

class ItalicBlot extends Inline {}
ItalicBlot.blotName = 'italic'
ItalicBlot.tagName = 'em'

class HeaderBlot extends Block {
  static formats(node: Element) {
    return HeaderBlot.tagName.indexOf(node.tagName) + 1
  }
}
HeaderBlot.blotName = 'header'
HeaderBlot.tagName = ['H1', 'H2']

// Register blots
Quill.register(BoldBlot)
Quill.register(ItalicBlot)
Quill.register(HeaderBlot)

const options = {
  placeholder: 'Start your story here...',
  readOnly: false
}

onMounted(() => {
  quill = editor.value!.initialize(Quill)
})
</script>

å<template>
  <div id="toolbar">
    <button @click="quill?.format('bold', true)">Bold</button>
    <button @click="quill?.format('italic', true)">Italic</button>
    <button @click="quill?.format('header', 1)">H1</button>
    <button @click="quill?.format('header', 2)">H2</button>
  </div>
  
  <QuillyEditor
    ref="editor"
    v-model="model"
    :options="options"
  />
</template>
```

[View Source](https://github.com/alekswebnet/vue-quilly/blob/main/demo/src/components/CustomEditor.vue)

---

## Live Demo

Try all these examples live: [vue-quilly.vercel.app](https://vue-quilly.vercel.app/)

## More Examples

- [Nuxt 4 Integration](https://github.com/alekswebnet/vue-quilly/tree/main/nuxt) - SSR setup with Nuxt
- [Complete Demo Source](https://github.com/alekswebnet/vue-quilly/tree/main/demo) - All examples with styling
