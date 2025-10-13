# Component API

The `QuillyEditor` component provides a Vue 3 wrapper for Quill v2 with full TypeScript support.

## Props

### modelValue

- **Type:** `string | null`
- **Default:** `null`
- **Required:** No

The HTML content of the editor. Used with `v-model` for two-way data binding.

```vue
<QuillyEditor v-model="content" />
```

The content is automatically synced bidirectionally:
- Changes in the editor update the `modelValue`
- External changes to `modelValue` update the editor content

### options

- **Type:** `QuillOptions`
- **Default:** `{}`
- **Required:** No

Quill editor initialization options. Supports all [Quill configuration options](https://quilljs.com/docs/configuration/).

```vue
<script setup lang="ts">
import type { QuillOptions } from 'quill/core'

const options: QuillOptions = {
  theme: 'snow',
  placeholder: 'Start writing...',
  readOnly: false,
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  }
}
</script>

<template>
  <QuillyEditor :options="options" />
</template>
```

**Common options:**

| Option | Type | Description |
|--------|------|-------------|
| `theme` | `string` | Theme name (`'snow'`, `'bubble'`, or custom) |
| `placeholder` | `string` | Placeholder text when editor is empty |
| `readOnly` | `boolean` | Whether editor is read-only |
| `modules` | `object` | Quill modules configuration (toolbar, clipboard, etc.) |
| `formats` | `string[]` | Allowed formats whitelist |
| `bounds` | `HTMLElement \| string` | DOM boundary for editor |
| `scrollingContainer` | `HTMLElement \| string` | Scrolling container element |

### isSemanticHtmlModel

- **Type:** `boolean`
- **Default:** `false`
- **Required:** No

When `true`, the component outputs clean semantic HTML without Quill-specific classes.

```vue
<QuillyEditor 
  v-model="content" 
  :is-semantic-html-model="true" 
/>
```

**Comparison:**

::: code-group

```html [Regular HTML]
<p class="ql-align-center">
  <strong class="ql-font-serif">Text</strong>
</p>
```

```html [Semantic HTML]
<p style="text-align: center;">
  <strong>Text</strong>
</p>
```

:::

**Benefits:**
- Better SEO
- Improved accessibility
- Cleaner HTML for external use
- Easier to style with custom CSS

## Methods

The component exposes methods via template refs.

### initialize(QuillClass)

Initializes the Quill editor instance. Must be called after component mount.

**Parameters:**
- `QuillClass`: `typeof Quill` - The Quill constructor class

**Returns:** `Quill` - The initialized Quill instance

**Example:**

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'

const editor = ref<InstanceType<typeof QuillyEditor>>()
let quill: Quill | null = null

onMounted(() => {
  quill = editor.value?.initialize(Quill)!
  
  // Now you can use Quill instance methods
  quill.setSelection(0, 10)
  quill.enable(false)
})
</script>

<template>
  <QuillyEditor ref="editor" />
</template>
```

## Usage Example

Complete example with all features:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import type { QuillOptions, Delta, Range, EmitterSource } from 'quill/core'
import 'quill/dist/quill.snow.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const content = ref('<p>Hello World!</p>')
let quill: Quill | null = null

const options: QuillOptions = {
  theme: 'snow',
  placeholder: 'Write something amazing...',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image']
    ]
  }
}

onMounted(() => {
  quill = editor.value?.initialize(Quill)!
})

// Event handlers
const onReady = (quillInstance: Quill) => {
  console.log('Editor is ready!', quillInstance)
}

const onTextChange = ({ 
  delta, 
  oldContent, 
  source 
}: { 
  delta: Delta
  oldContent: Delta
  source: EmitterSource 
}) => {
  console.log('Text changed:', delta, source)
}

const onSelectionChange = ({ 
  range, 
  oldRange, 
  source 
}: { 
  range: Range
  oldRange: Range
  source: EmitterSource 
}) => {
  console.log('Selection changed:', range, source)
}

const onEditorChange = (eventName: 'text-change' | 'selection-change') => {
  console.log('Editor event:', eventName)
}

const onFocus = (quillInstance: Quill) => {
  console.log('Editor focused')
}

const onBlur = (quillInstance: Quill) => {
  console.log('Editor blurred')
}
</script>

<template>
  <QuillyEditor
    ref="editor"
    v-model="content"
    :options="options"
    @ready="onReady"
    @text-change="onTextChange"
    @selection-change="onSelectionChange"
    @editor-change="onEditorChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
```

## TypeScript Support

The component is fully typed with TypeScript:

```typescript
import type { QuillyEditor } from 'vue-quilly'
import type { QuillOptions, Delta, Range, EmitterSource } from 'quill/core'

// Component type
const editor = ref<InstanceType<typeof QuillyEditor>>()

// Quill instance type
let quill: Quill | null = null
```

## See Also

- [Events](/api/events) - All available events
- [TypeScript Types](/api/types) - Type definitions
- [Examples](/examples/) - Practical examples
