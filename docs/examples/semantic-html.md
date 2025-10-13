# Semantic HTML Editor

Editor configured to output clean, semantic HTML without Quill-specific classes.

## Features

- Clean HTML output (e.g., `<h1>` instead of `<p class="ql-header-1">`)
- Better for SEO and accessibility
- Easy content portability
- Ideal for CMS and blog posts

## Code Example

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const content = ref<string>('<h1>Semantic HTML</h1><p>Clean output!</p>')
let quill: Quill | undefined

const options = ref({
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic'],
      [{ header: [1, 2, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  }
})

onMounted(() => {
  quill = editor.value?.initialize(Quill)
})
</script>

<template>
  <QuillyEditor
    ref="editor"
    v-model="content"
    :options="options"
    :is-semantic-html-model="true"
  />
  <div class="output">
    <h3>Output HTML:</h3>
    <pre>{{ content }}</pre>
  </div>
</template>
```

## Output Comparison

The key difference is in the HTML output:

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

## Benefits

### SEO Advantages
- Search engines better understand semantic markup
- Proper heading hierarchy improves content structure
- Clean HTML signals content quality

### Accessibility
- Screen readers work better with semantic HTML
- Proper heading tags create better navigation
- Better ARIA compatibility

### Maintainability
- Cleaner code without framework-specific classes
- Easier to style with custom CSS
- Better compatibility with other systems

## Use Cases

- Blog posts
- CMS content
- Email templates
- Exported documents

## Installation

```bash
pnpm add vue-quilly quill@2
```

## Resources

- [View Full Source Code](https://github.com/alekswebnet/vue-quilly/blob/main/demo/src/components/SemanticHTMLEditor.vue)
- [Try Live Demo](https://vue-quilly.vercel.app/)
