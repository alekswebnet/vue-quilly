# Bubble Theme Editor

Lightweight editor with the Bubble theme that shows toolbar on text selection.

## Features

- Medium-style inline toolbar
- Appears on text selection
- Same formatting capabilities as Snow theme
- Cleaner, more minimalist interface

## Code Example

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
let quill: Quill | undefined

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
  quill = editor.value?.initialize(Quill)
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

## Installation

Install the required dependencies:

```bash
pnpm add vue-quilly quill@2 katex
```

## Usage Tips

The bubble theme is perfect for:
- Minimal, distraction-free writing interfaces
- Mobile-friendly editors
- Inline content editing
- Medium-style blogging platforms

## Resources

- [View Full Source Code](https://github.com/alekswebnet/vue-quilly/blob/main/demo/src/components/DefaultEditorBubble.vue)
- [Try Live Demo](https://vue-quilly.vercel.app/)
