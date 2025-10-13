# Basic Usage

Learn the essential patterns and features for working with vue-quilly.

## Basic Setup

The minimal setup requires three steps:

1. Import the component and styles
2. Initialize the editor
3. Use v-model for content binding

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

## Content Management

### HTML Format

Use `v-model` for HTML content:

```vue
<script setup lang="ts">
const content = ref('<h1>Title</h1><p>Content here...</p>')
</script>

<template>
  <QuillyEditor v-model="content" />
  
  <!-- Display content -->
  <div v-html="content"></div>
</template>
```

### Delta Format

Use Quill's Delta format for programmatic content manipulation:

```typescript
import { Delta } from 'quill/core'

const editor = ref<InstanceType<typeof QuillyEditor>>()
let quill: Quill | undefined

onMounted(() => {
  quill = editor.value?.initialize(Quill)!
  
  // Set content using Delta
  quill.setContents(
    new Delta()
      .insert('Hello ')
      .insert('World', { bold: true })
      .insert('\n')
  )
  
  // Get content as Delta
  const delta = quill.getContents()
  console.log(delta)
})
```

### Semantic HTML

For clean, SEO-friendly HTML output:

```vue
<QuillyEditor 
  v-model="content" 
  :is-semantic-html-model="true" 
/>
```

This outputs `<h1>` instead of `<p class="ql-header-1">`.

## Toolbar Configuration

### Predefined Toolbar

Simple toolbar with common formats:

```typescript
const options = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  }
}
```

### Custom Toolbar

Create a custom toolbar with specific controls:

```typescript
const options = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic'],           // Simple formatting
      [{ header: [1, 2, false] }],  // Headers
      ['link', 'image']             // Media
    ]
  }
}
```

### Toolbar Handlers

Add custom handlers for toolbar buttons:

```vue
<script setup lang="ts">
let quill: Quill | undefined

const options = {
  theme: 'snow',
  modules: {
    toolbar: {
      container: [
        ['bold', 'italic'],
        ['image']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }
}

function imageHandler() {
  const url = prompt('Enter image URL:')
  if (url && quill) {
    const range = quill.getSelection(true)
    quill.insertEmbed(range.index, 'image', url)
  }
}

onMounted(() => {
  quill = editor.value?.initialize(Quill)!
})
</script>
```

### External Toolbar

Place toolbar outside the editor:

```vue
<template>
  <div id="toolbar">
    <button class="ql-bold">Bold</button>
    <button class="ql-italic">Italic</button>
  </div>
  
  <QuillyEditor 
    ref="editor" 
    v-model="content"
    :options="{ modules: { toolbar: '#toolbar' } }" 
  />
</template>
```

## Event Handling

### Text Changes

React to content changes:

```vue
<script setup lang="ts">
import type { Delta, EmitterSource } from 'quill/core'

const onTextChange = ({ 
  delta, 
  source 
}: { 
  delta: Delta
  oldContent: Delta
  source: EmitterSource 
}) => {
  if (source === 'user') {
    console.log('User edited:', delta)
    // Auto-save, validation, etc.
  }
}
</script>

<template>
  <QuillyEditor @text-change="onTextChange" />
</template>
```

### Selection Changes

Track cursor position and text selection:

```vue
<script setup lang="ts">
import type { Range } from 'quill/core'

const selectedText = ref('')

const onSelectionChange = ({ range }: { range: Range }) => {
  if (range && range.length > 0 && quill) {
    selectedText.value = quill.getText(range.index, range.length)
  } else {
    selectedText.value = ''
  }
}
</script>

<template>
  <QuillyEditor @selection-change="onSelectionChange" />
  <div v-if="selectedText">
    Selected: {{ selectedText }}
  </div>
</template>
```

### Focus and Blur

Handle editor focus states:

```vue
<script setup lang="ts">
const isFocused = ref(false)

const onFocus = () => {
  isFocused.value = true
}

const onBlur = () => {
  isFocused.value = false
  // Auto-save on blur
  saveContent()
}
</script>

<template>
  <QuillyEditor 
    @focus="onFocus" 
    @blur="onBlur"
    :class="{ focused: isFocused }"
  />
</template>
```

## Quill Instance Methods

Access Quill's full API through the instance:

### Content Methods

```typescript
// Get/Set text
const text = quill.getText()
quill.setText('New text')

// Get/Set contents (Delta)
const delta = quill.getContents()
quill.setContents(delta)

// Get length
const length = quill.getLength()

// Delete content
quill.deleteText(0, 10)

// Insert text
quill.insertText(0, 'Hello', { bold: true })
```

### Formatting Methods

```typescript
// Format text
quill.formatText(0, 5, 'bold', true)
quill.format('color', 'red')

// Remove formatting
quill.removeFormat(0, 10)

// Get format
const format = quill.getFormat()
```

### Selection Methods

```typescript
// Get selection
const range = quill.getSelection()

// Set selection
quill.setSelection(0, 10)  // Select characters 0-10
quill.setSelection(5, 0)   // Place cursor at position 5

// Get bounds
const bounds = quill.getBounds(0, 10)
```

### Editor State

```typescript
// Enable/Disable
quill.enable(false)  // Read-only
quill.enable(true)   // Editable

// Check state
const isEnabled = quill.isEnabled()

// Focus
quill.focus()
quill.blur()
```

## Common Patterns

### Auto-save

```vue
<script setup lang="ts">
import { debounce } from 'lodash-es'

const content = ref('')

const saveContent = debounce(async (html: string) => {
  await fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify({ content: html })
  })
  console.log('Saved!')
}, 1000)

watch(content, (newContent) => {
  saveContent(newContent)
})
</script>

<template>
  <QuillyEditor v-model="content" />
</template>
```

### Character Counter

```vue
<script setup lang="ts">
const content = ref('')
const charCount = computed(() => {
  // Remove HTML tags for accurate count
  return content.value.replace(/<[^>]*>/g, '').length
})
</script>

<template>
  <div>
    <QuillyEditor v-model="content" />
    <div class="counter">
      Characters: {{ charCount }}
    </div>
  </div>
</template>
```

### Word Counter

```vue
<script setup lang="ts">
const wordCount = ref(0)

const onTextChange = () => {
  if (quill) {
    const text = quill.getText().trim()
    wordCount.value = text ? text.split(/\s+/).length : 0
  }
}
</script>

<template>
  <QuillyEditor @text-change="onTextChange" />
  <div>Words: {{ wordCount }}</div>
</template>
```

### Read-only Mode

```vue
<script setup lang="ts">
const isReadOnly = ref(false)

const options = computed(() => ({
  theme: 'snow',
  readOnly: isReadOnly.value
}))

const toggleReadOnly = () => {
  isReadOnly.value = !isReadOnly.value
  if (quill) {
    quill.enable(!isReadOnly.value)
  }
}
</script>

<template>
  <button @click="toggleReadOnly">
    {{ isReadOnly ? 'Edit' : 'View' }}
  </button>
  <QuillyEditor :options="options" />
</template>
```

### Placeholder

```typescript
const options = {
  theme: 'snow',
  placeholder: 'Start writing your story...',
  modules: {
    toolbar: [['bold', 'italic']]
  }
}
```

### Initial Content

```vue
<script setup lang="ts">
const content = ref(`
  <h1>Welcome!</h1>
  <p>Start editing this content...</p>
`)
</script>

<template>
  <QuillyEditor v-model="content" />
</template>
```

## Themes

### Snow Theme

Default theme with toolbar:

```typescript
import 'quill/dist/quill.snow.css'

const options = {
  theme: 'snow',
  modules: {
    toolbar: [['bold', 'italic']]
  }
}
```

### Bubble Theme

Tooltip-based theme:

```typescript
import 'quill/dist/quill.bubble.css'

const options = {
  theme: 'bubble'
}
```

### No Theme (Core)

Minimal styling:

```typescript
import 'quill/dist/quill.core.css'

const options = {
  // No theme specified
  modules: {
    toolbar: false
  }
}
```

## Validation

### Required Field

```vue
<script setup lang="ts">
const content = ref('')
const error = ref('')

const validate = () => {
  const text = content.value.replace(/<[^>]*>/g, '').trim()
  if (!text) {
    error.value = 'Content is required'
    return false
  }
  error.value = ''
  return true
}

const onSubmit = () => {
  if (validate()) {
    // Submit form
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <QuillyEditor v-model="content" @blur="validate" />
    <div v-if="error" class="error">{{ error }}</div>
    <button type="submit">Submit</button>
  </form>
</template>
```

### Min/Max Length

```typescript
const validateLength = (html: string) => {
  const text = html.replace(/<[^>]*>/g, '').trim()
  const length = text.length
  
  if (length < 10) {
    return 'Minimum 10 characters required'
  }
  if (length > 1000) {
    return 'Maximum 1000 characters allowed'
  }
  return null
}
```

## Next Steps

- [Examples](/examples/) - See complete implementations
- [API Reference](/api/component) - Detailed documentation
- [Events](/api/events) - All available events
- [TypeScript Types](/api/types) - Type definitions

## Tips & Best Practices

### Do's

✅ **Initialize the editor in `onMounted`**
- Ensures DOM is ready before Quill initialization
- Prevents hydration issues in SSR

✅ **Use TypeScript for better development experience**
- Full type safety with Quill API
- Better IntelliSense and autocomplete
- Catch errors at compile time

✅ **Handle events for auto-save and validation**
- Use `@text-change` for auto-save
- Use `@blur` for validation
- Track changes with `source` parameter

✅ **Use semantic HTML for better SEO**
- Enable `isSemanticHtmlModel` prop
- Outputs clean HTML tags (`<h1>` instead of `<p class="ql-header-1">`)
- Better for accessibility and search engines

### Don'ts

❌ **Don't initialize before component mount**
```vue
// ❌ Bad - DOM not ready yet
const editor = ref<InstanceType<typeof QuillyEditor>>()
let quill: Quill | undefined
quill = editor.value?.initialize(Quill) 

// ✅ Good - Initialize after mount
onMounted(() => {
  quill = editor.value?.initialize(Quill)
})
```

❌ **Don't modify Quill instance outside Vue's reactivity**

Quill maintains its own internal state. Directly modifying the Quill instance won't trigger Vue's reactivity system:

```vue
// ❌ Bad - Changes won't be reactive
quill.root.innerHTML = '<p>New content</p>'

// ✅ Good - Use Quill's API or v-model
quill.setContents(new Delta().insert('New content\n'))
// or
content.value = '<p>New content</p>'
```

**Why this matters:**
- Direct DOM manipulation bypasses Quill's change detection
- Vue won't know about the changes
- Can cause inconsistencies between model and editor state
- May break undo/redo functionality

**Correct approach:**
- Use Quill's API methods (`setText()`, `setContents()`, `insertText()`)
- Update the `v-model` binding
- Let vue-quilly handle the synchronization

❌ **Don't forget to clean up event listeners**
```vue
<script setup lang="ts">
let quill: Quill | undefined

onMounted(() => {
  quill = editor.value?.initialize(Quill)
  
  // Add custom event listener
  quill?.on('text-change', handleChange)
})

// ✅ Clean up on unmount
onUnmounted(() => {
  quill?.off('text-change', handleChange)
})
</script>
```

❌ **Don't use inline HTML without sanitization**
```vue
// ❌ Bad - XSS vulnerability
<div v-html="content"></div>

// ✅ Good - Sanitize first
import DOMPurify from 'dompurify'

const safeContent = computed(() => DOMPurify.sanitize(content.value))
<div v-html="safeContent"></div>
```
