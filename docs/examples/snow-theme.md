# Snow Theme Editor

The classic Quill editor with the Snow theme, featuring a full toolbar with all formatting options.

## Features

- Complete toolbar with all formatting options
- Formula support with KaTeX
- Image and video embedding
- Font, size, and color customization
- Headers, lists, and alignment

## Code Example

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

let quill: Quill | undefined

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
  quill = editor.value?.initialize(Quill)
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

## Installation

Install the required dependencies:

```bash
pnpm add vue-quilly quill@2 katex
```

## Resources

- [View Full Source Code](https://github.com/alekswebnet/vue-quilly/blob/main/demo/src/components/DefaultEditorSnow.vue)
- [Try Live Demo](https://vue-quilly.vercel.app/)
