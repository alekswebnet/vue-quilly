# TypeScript Types

vue-quilly provides full TypeScript support with comprehensive type definitions.

## Component Types

### QuillyEditor

The main component type reference.

```typescript
import type { QuillyEditor } from 'vue-quilly'

const editor = ref<InstanceType<typeof QuillyEditor>>()
```

**Usage in component:**
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'

const editor = ref<InstanceType<typeof QuillyEditor>>()
let quill: Quill | undefined

onMounted(() => {
  quill = editor.value?.initialize(Quill)
})
</script>
```

---

## Quill Core Types

Import types from `quill/core` for Quill-specific types.

### QuillOptions

Editor configuration options.

```typescript
import type { QuillOptions } from 'quill/core'

interface QuillOptions {
  theme?: string
  placeholder?: string
  readOnly?: boolean
  formats?: string[]
  bounds?: HTMLElement | string
  scrollingContainer?: HTMLElement | string
  modules?: {
    toolbar?: boolean | string | string[][] | ToolbarConfig
    clipboard?: ClipboardOptions
    keyboard?: KeyboardOptions
    history?: HistoryOptions
    [key: string]: any
  }
}
```

**Example:**
```typescript
const options: QuillOptions = {
  theme: 'snow',
  placeholder: 'Start writing...',
  readOnly: false,
  modules: {
    toolbar: [
      ['bold', 'italic'],
      [{ header: [1, 2, false] }]
    ]
  }
}
```

---

### Delta

Quill's document format representing content and changes.

```typescript
import type { Delta } from 'quill/core'

interface Delta {
  ops?: Op[]
}

interface Op {
  insert?: any
  delete?: number
  retain?: number
  attributes?: Record<string, any>
}
```

**Example:**
```typescript
import { Delta } from 'quill/core'

// Create a new Delta
const delta = new Delta()
  .insert('Hello ', { bold: true })
  .insert('World')
  .insert('\n', { header: 1 })

// Use in event handler
const onTextChange = ({ delta }: { delta: Delta }) => {
  console.log('Changes:', delta.ops)
}
```

**Delta operations:**
- `insert` - Add content
- `delete` - Remove content
- `retain` - Keep content unchanged
- `attributes` - Apply formatting

---

### Range

Selection or cursor position in the editor.

```typescript
import type { Range } from 'quill/core'

interface Range {
  index: number   // Starting position (0-based)
  length: number  // Length of selection
}
```

**Example:**
```typescript
const onSelectionChange = ({ range }: { range: Range }) => {
  if (range) {
    if (range.length === 0) {
      console.log(`Cursor at position ${range.index}`)
    } else {
      console.log(`Selected from ${range.index} to ${range.index + range.length}`)
    }
  } else {
    console.log('No selection (editor lost focus)')
  }
}

// Set selection programmatically
quill.setSelection(0, 10)  // Select first 10 characters
quill.setSelection(5, 0)   // Place cursor at position 5
```

---

### EmitterSource

Source of an event or change.

```typescript
import type { Sources as EmitterSource } from 'quill/core'

type EmitterSource = 'user' | 'api' | 'silent'
```

**Values:**
- `'user'` - User interaction (typing, clicking, pasting)
- `'api'` - Programmatic change via Quill API
- `'silent'` - Silent change (no event emission)

**Example:**
```typescript
const onTextChange = ({ source }: { source: EmitterSource }) => {
  switch (source) {
    case 'user':
      console.log('User edited content')
      autoSave()
      break
    case 'api':
      console.log('Programmatic change')
      break
    case 'silent':
      console.log('Silent update')
      break
  }
}
```

---

### BoundsStatic

Position and dimensions of a selection or element.

```typescript
interface BoundsStatic {
  left: number
  right: number
  top: number
  bottom: number
  height: number
  width: number
}
```

**Example:**
```typescript
const range = quill.getSelection()
if (range) {
  const bounds = quill.getBounds(range.index, range.length)
  console.log('Selection bounds:', bounds)
  
  // Position a tooltip
  tooltip.style.left = `${bounds.left}px`
  tooltip.style.top = `${bounds.bottom}px`
}
```

---

## Event Handler Types

Type-safe event handlers for all component events.

### TextChangeHandler

```typescript
type TextChangeHandler = (params: {
  delta: Delta
  oldContent: Delta
  source: EmitterSource
}) => void

const onTextChange: TextChangeHandler = ({ delta, oldContent, source }) => {
  // Fully typed parameters
}
```

### SelectionChangeHandler

```typescript
type SelectionChangeHandler = (params: {
  range: Range
  oldRange: Range
  source: EmitterSource
}) => void

const onSelectionChange: SelectionChangeHandler = ({ range, oldRange, source }) => {
  // Fully typed parameters
}
```

### EditorChangeHandler

```typescript
type EditorChangeHandler = (eventName: 'text-change' | 'selection-change') => void

const onEditorChange: EditorChangeHandler = (eventName) => {
  // Fully typed parameter
}
```

### ReadyHandler

```typescript
import type Quill from 'quill'

type ReadyHandler = (quill: Quill) => void

const onReady: ReadyHandler = (quill) => {
  // Fully typed Quill instance
}
```

---

## Parchment Types

For custom blots and formats (when using `quill/core`).

```typescript
import type { BlotConstructor } from 'parchment'

const Inline = Quill.import('blots/inline') as BlotConstructor
const Block = Quill.import('blots/block') as BlotConstructor

class CustomBlot extends Inline {
  static blotName = 'custom'
  static tagName = 'span'
}
```

---

## Complete TypeScript Example

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import type { 
  QuillOptions, 
  Delta, 
  Range, 
  Sources as EmitterSource,
  BoundsStatic
} from 'quill/core'
import 'quill/dist/quill.snow.css'

// Component ref with proper typing
const editor = ref<InstanceType<typeof QuillyEditor>>()

// Quill instance with proper type
let quill: Quill | undefined

// Content with explicit type
const content = ref<string>('')

// Options with type annotation
const options: QuillOptions = {
  theme: 'snow',
  placeholder: 'Type here...',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, 3, false] }]
    ]
  }
}

// Typed event handlers
const onTextChange = ({ 
  delta, 
  oldContent, 
  source 
}: { 
  delta: Delta
  oldContent: Delta
  source: EmitterSource 
}): void => {
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
}): void => {
  if (range) {
    const bounds: BoundsStatic = quill!.getBounds(range.index, range.length)
    console.log('Selection bounds:', bounds)
  }
}

const onEditorChange = (eventName: 'text-change' | 'selection-change'): void => {
  console.log('Editor event:', eventName)
}

const onReady = (quillInstance: Quill): void => {
  console.log('Editor ready')
  quill = quillInstance
}

const onFocus = (quillInstance: Quill): void => {
  console.log('Focused')
}

const onBlur = (quillInstance: Quill): void => {
  console.log('Blurred')
}

onMounted(() => {
  quill = editor.value?.initialize(Quill) ?? null
  
  if (quill) {
    // Type-safe Quill API usage
    const length: number = quill.getLength()
    const contents: Delta = quill.getContents()
    const text: string = quill.getText()
    
    quill.setSelection(0, 0)
    quill.focus()
  }
})
</script>

<template>
  <QuillyEditor
    ref="editor"
    v-model="content"
    :options="options"
    @text-change="onTextChange"
    @selection-change="onSelectionChange"
    @editor-change="onEditorChange"
    @ready="onReady"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
```

---

## Type Imports Reference

Quick reference for all type imports:

```typescript
// Component types
import type { QuillyEditor } from 'vue-quilly'

// Quill core types
import type { 
  QuillOptions,
  Delta,
  Range,
  Sources as EmitterSource,
  BoundsStatic,
  TextChangeHandler,
  SelectionChangeHandler
} from 'quill/core'

// Quill class
import Quill from 'quill'

// Parchment (for custom formats)
import type { BlotConstructor } from 'parchment'
```

---

## Type Guards

Helper type guards for runtime type checking:

```typescript
// Check if range exists (editor has focus)
function hasSelection(range: Range | null): range is Range {
  return range !== null
}

// Check if selection is a cursor (length 0)
function isCursor(range: Range): boolean {
  return range.length === 0
}

// Usage
const onSelectionChange = ({ range }: { range: Range }) => {
  if (hasSelection(range)) {
    if (isCursor(range)) {
      console.log('Cursor at', range.index)
    } else {
      console.log('Selection length', range.length)
    }
  }
}
```

---

## See Also

- [Component API](/api/component) - Props and methods
- [Events](/api/events) - Event reference
- [Quill API Documentation](https://quilljs.com/docs/api/) - Official Quill docs
