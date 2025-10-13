# Image Resize Editor

Editor with image resize functionality using the `quill-image-resize-module`.

## Features

- Drag to resize images
- Display size indicator
- Resize handles on images
- Image alignment toolbar

## Code Example

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

## Installation

Install both vue-quilly and the image resize module:

```bash
pnpm add vue-quilly quill@2 quill-image-resize-module
```

## Configuration Options

The `imageResize` module supports several configurations:

- **Resize** - Enable drag-to-resize functionality
- **DisplaySize** - Show image dimensions overlay
- **Toolbar** - Show alignment toolbar on image selection

## Usage Tips

1. Click the image button in the toolbar to insert an image
2. Click on the inserted image to see resize handles
3. Drag the handles to resize the image
4. Use the alignment toolbar for positioning

## Resources

- [View Full Source Code](https://github.com/alekswebnet/vue-quilly/blob/main/demo/src/components/ImageResizeEditor.vue)
- [quill-image-resize-module](https://github.com/kensnyder/quill-image-resize-module) - Module documentation
- [Try Live Demo](https://vue-quilly.vercel.app/)
