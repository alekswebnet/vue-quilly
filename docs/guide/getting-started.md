# Getting Started

Welcome to vue-quilly! This guide will help you get started with building rich text editors in your Vue 3 applications.

## What is vue-quilly?

vue-quilly is a lightweight Vue 3 component that wraps [Quill v2](https://quilljs.com/), the powerful rich text editor. It provides:

- 🎯 **Simple integration** - Easy to add to any Vue 3 project
- 📦 **Minimal bundle** - Uses `quill/core` for tree-shaking
- 🔷 **TypeScript support** - Full type definitions included
- 🔄 **Dual format** - Works with HTML and Delta formats
- ⚙️ **Highly customizable** - Build exactly what you need

## Philosophy

vue-quilly is **not** an all-in-one editor solution. Instead, it's a flexible foundation that lets you:

- Import only the Quill modules you need
- Build custom editors tailored to your use case
- Maintain full control over features and styling
- Keep your bundle size minimal

## Quick Example

Here's a minimal example to get you started:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const content = ref('<p>Hello World!</p>')
let quill: Quill | undefined

const options = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  }
}

onMounted(() => {
  quill = editor.value?.initialize(Quill)
})
</script>

<template>
  <QuillyEditor 
    ref="editor" 
    v-model="content" 
    :options="options" 
  />
</template>
```

That's it! You now have a working rich text editor.

## Core Concepts

### 1. Quill Initialization

The editor requires explicit initialization:

```typescript
const editor = ref<InstanceType<typeof QuillyEditor>>()
let quill: Quill | undefined

onMounted(() => {
  quill = editor.value?.initialize(Quill)
})
```

This gives you control over when and how Quill is initialized.

**Accessing Quill instance:**

Once initialized, you can access the full Quill API:

```typescript
onMounted(() => {
  quill = editor.value?.initialize(Quill)
  
  // Use Quill methods
  quill?.focus()
  quill?.setSelection(0, 0)
  
  // Get content
  const text = quill?.getText()
  const delta = quill?.getContents()
  
  // Format text
  quill?.formatText(0, 5, 'bold', true)
})
```

**Using Quill plugins:**

You can register and use Quill plugins by registering them before initialization:

```typescript
import Quill from 'quill'
import ImageResize from 'quill-resize-module'

onMounted(() => {
  // Register image resize plugin
  Quill.register('modules/ImageResize', ImageResize)
  
  // Initialize editor with the plugin
  quill = editor.value?.initialize(Quill)
})
```

**Plugin configuration in options:**

```typescript
const options = {
  theme: 'snow',
  modules: {
    toolbar: [['bold', 'italic'], ['image']],
    ImageResize: {
      modules: ['Resize', 'DisplaySize']
    }
  }
}
```

**Example with KaTeX (formula support):**

```typescript
import Quill from 'quill'
import katex from 'katex'
import 'katex/dist/katex.min.css'

onMounted(() => {
  // Make KaTeX available globally for Quill
  (window.katex as typeof katex) = katex
  
  // Initialize editor - formula module is built-in
  quill = editor.value?.initialize(Quill)
})
```

**Example with custom formats/blots:**

```typescript
import Quill from 'quill/core'
import { type BlotConstructor } from 'parchment'

const Inline = Quill.import('blots/inline') as BlotConstructor

// Create custom blot
class CustomBlot extends Inline {
  static blotName = 'custom'
  static tagName = 'span'
  static className = 'my-custom-class'
}

// Register before initialization
Quill.register(CustomBlot)

onMounted(() => {
  quill = editor.value?.initialize(Quill)
})
```

### 2. Content Formats

vue-quilly supports two content formats:

**HTML Format (v-model):**
```vue
<QuillyEditor v-model="content" />
```

**Delta Format (Quill API):**
```typescript
import { Delta } from 'quill/core'

quill.setContents(
  new Delta()
    .insert('Hello ')
    .insert('World', { bold: true })
)
```

### 3. Configuration

Configure the editor using Quill's options:

```typescript
const options = {
  theme: 'snow',           // or 'bubble'
  placeholder: 'Write...',
  readOnly: false,
  modules: {
    toolbar: [/* ... */]   // Customize toolbar
  }
}
```

### 4. Event Handling

Listen to editor events:

```vue
<QuillyEditor
  v-model="content"
  @text-change="onTextChange"
  @selection-change="onSelectionChange"
  @ready="onReady"
/>
```

## Next Steps

Now that you understand the basics, continue with:

1. **[Installation](/guide/installation)** - Set up vue-quilly in your project
2. **[Basic Usage](/guide/basic-usage)** - Learn common patterns and features
3. **[Examples](/examples/)** - See practical implementations
4. **[API Reference](/api/component)** - Detailed API documentation

## Learning Resources

- [Quill Documentation](https://quilljs.com/docs/) - Official Quill docs
- [Live Demo](https://vue-quilly.vercel.app/) - Try vue-quilly online
- [GitHub Repository](https://github.com/alekswebnet/vue-quilly) - Source code and issues
- [Demo Source](https://github.com/alekswebnet/vue-quilly/tree/main/demo) - Example implementations

## Browser Support

vue-quilly supports the same browsers as Vue 3 and Quill v2:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Requirements

- Vue 3.0+
- Quill 2.0+

## Get Help

If you need help:

- 📖 Check the [API documentation](/api/component)
- 💡 Browse [examples](/examples/)
- 🐛 Report issues on [GitHub](https://github.com/alekswebnet/vue-quilly/issues)

Ready to install? Head to the [Installation guide](/guide/installation)!
