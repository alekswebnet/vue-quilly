# Custom Editor (Core Build)

Minimal custom editor using `quill/core` with only specific blots registered.

## Features

- Minimal bundle size (uses `quill/core`)
- Custom blots (Bold, Italic, Headers)
- External toolbar controls
- Perfect for custom implementations

## Code Example

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill, { Delta, Range } from 'quill/core'
import { type BlotConstructor } from 'parchment'
import 'quill/dist/quill.core.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref<string>('<h1>Custom Editor</h1><p>Minimal setup!</p>')

let quill: Quill | undefined

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
  quill = editor.value?.initialize(Quill)
})
</script>

<template>
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

## Why Use Core Build?

### Bundle Size Benefits

The core build significantly reduces bundle size by excluding unused modules:

- **Full build**: ~250KB minified
- **Core build**: ~100KB minified

You only import what you need!

### Use Cases

Perfect for:
- Custom editor implementations
- Mobile-first applications where size matters
- Embedded widgets with limited features
- Learning Quill internals

## Creating Custom Blots

Custom blots give you complete control over formatting:

```typescript
class CustomBlot extends Inline {
  static blotName = 'custom'
  static tagName = 'span'
  static className = 'my-custom-class'
}

Quill.register(CustomBlot)
```

## Installation

```bash
pnpm add vue-quilly quill@2 parchment
```

## Resources

- [View Full Source Code](https://github.com/alekswebnet/vue-quilly/blob/main/demo/src/components/CustomEditor.vue)
- [Quill Core Build Documentation](https://quilljs.com/docs/installation#core-build)
- [Parchment Documentation](https://github.com/quilljs/parchment) - Blot framework
- [Try Live Demo](https://vue-quilly.vercel.app/)
