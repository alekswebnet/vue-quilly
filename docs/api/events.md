# Events

The `QuillyEditor` component emits various events that allow you to respond to user interactions and content changes.

## Event List

All events are fully typed for TypeScript support.

### update:modelValue

Emitted when the editor content changes (for `v-model` binding).

**Type:**
```typescript
(value: string) => void
```

**Parameters:**
- `value`: `string` - The updated HTML content

**Example:**
```vue
<script setup lang="ts">
const content = ref('')

const onUpdate = (value: string) => {
  console.log('Content updated:', value)
}
</script>

<template>
  <QuillyEditor 
    v-model="content"
    @update:model-value="onUpdate"
  />
</template>
```

---

### text-change

Emitted when the editor content changes (text, formatting, or both).

**Type:**
```typescript
({
  delta: Delta
  oldContent: Delta
  source: EmitterSource
}) => void
```

**Parameters:**
- `delta`: `Delta` - Change delta representing the modifications
- `oldContent`: `Delta` - Previous editor content as Delta
- `source`: `EmitterSource` - Source of the change (`'user'`, `'api'`, or `'silent'`)

**Example:**
```vue
<script setup lang="ts">
import type { Delta, EmitterSource } from 'quill/core'

const onTextChange = ({ 
  delta, 
  oldContent, 
  source 
}: { 
  delta: Delta
  oldContent: Delta
  source: EmitterSource 
}) => {
  if (source === 'user') {
    console.log('User made changes:', delta)
  }
}
</script>

<template>
  <QuillyEditor @text-change="onTextChange" />
</template>
```

**Use cases:**
- Track user edits
- Implement auto-save functionality
- Sync content to server
- Trigger validation

---

### selection-change

Emitted when the user selection (cursor position or text selection) changes.

**Type:**
```typescript
({
  range: Range
  oldRange: Range
  source: EmitterSource
}) => void
```

**Parameters:**
- `range`: `Range` - New selection range (`null` when editor loses focus)
- `oldRange`: `Range` - Previous selection range
- `source`: `EmitterSource` - Source of the change

**Range type:**
```typescript
interface Range {
  index: number  // Starting position
  length: number // Length of selection (0 for cursor)
}
```

**Example:**
```vue
<script setup lang="ts">
import type { Range, EmitterSource } from 'quill/core'

const onSelectionChange = ({ 
  range, 
  oldRange, 
  source 
}: { 
  range: Range
  oldRange: Range
  source: EmitterSource 
}) => {
  if (range) {
    if (range.length === 0) {
      console.log('Cursor at position:', range.index)
    } else {
      console.log('Selection from', range.index, 'to', range.index + range.length)
    }
  } else {
    console.log('Editor lost focus')
  }
}
</script>

<template>
  <QuillyEditor @selection-change="onSelectionChange" />
</template>
```

**Use cases:**
- Show custom formatting toolbar
- Display character/word count for selection
- Implement custom context menus
- Track cursor position

---

### editor-change

Emitted for both text and selection changes. Useful when you need to respond to any editor change.

**Type:**
```typescript
(eventName: 'text-change' | 'selection-change') => void
```

**Parameters:**
- `eventName`: `'text-change' | 'selection-change'` - Type of change

**Example:**
```vue
<script setup lang="ts">
const onEditorChange = (eventName: 'text-change' | 'selection-change') => {
  console.log('Editor changed:', eventName)
  // Perform actions common to both events
}
</script>

<template>
  <QuillyEditor @editor-change="onEditorChange" />
</template>
```

---

### ready

Emitted when the Quill editor is fully initialized and ready to use.

**Type:**
```typescript
(quill: Quill) => void
```

**Parameters:**
- `quill`: `Quill` - The initialized Quill instance

**Example:**
```vue
<script setup lang="ts">
import type Quill from 'quill'

const onReady = (quill: Quill) => {
  console.log('Editor ready!', quill)
  
  // Perform initial setup
  quill.setSelection(0, 0)
  quill.focus()
}
</script>

<template>
  <QuillyEditor @ready="onReady" />
</template>
```

**Use cases:**
- Initial editor configuration
- Set initial focus
- Load saved selection
- Register custom formats

---

### focus

Emitted when the editor gains focus.

**Type:**
```typescript
(quill: Quill) => void
```

**Parameters:**
- `quill`: `Quill` - The Quill instance

**Example:**
```vue
<script setup lang="ts">
import type Quill from 'quill'

const onFocus = (quill: Quill) => {
  console.log('Editor focused')
  // Show formatting toolbar, etc.
}
</script>

<template>
  <QuillyEditor @focus="onFocus" />
</template>
```

---

### blur

Emitted when the editor loses focus.

**Type:**
```typescript
(quill: Quill) => void
```

**Parameters:**
- `quill`: `Quill` - The Quill instance

**Example:**
```vue
<script setup lang="ts">
import type Quill from 'quill'

const onBlur = (quill: Quill) => {
  console.log('Editor blurred')
  // Auto-save content, hide toolbar, etc.
}
</script>

<template>
  <QuillyEditor @blur="onBlur" />
</template>
```

**Use cases:**
- Auto-save on blur
- Hide custom toolbars
- Validate content
- Update preview

---

## Complete Example

Example using all events together:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import type Quill from 'quill'
import type { Delta, Range, EmitterSource } from 'quill/core'

const content = ref('')
const isFocused = ref(false)
const selectionInfo = ref('')

const onUpdate = (value: string) => {
  console.log('✅ Content updated')
}

const onTextChange = ({ delta, source }: {
  delta: Delta
  oldContent: Delta
  source: EmitterSource
}) => {
  if (source === 'user') {
    console.log('✏️ User edited content')
  }
}

const onSelectionChange = ({ range }: {
  range: Range
  oldRange: Range
  source: EmitterSource
}) => {
  if (range) {
    if (range.length === 0) {
      selectionInfo.value = `Cursor at ${range.index}`
    } else {
      selectionInfo.value = `Selected ${range.length} characters`
    }
  }
}

const onEditorChange = (eventName: 'text-change' | 'selection-change') => {
  console.log('📝 Editor changed:', eventName)
}

const onReady = (quill: Quill) => {
  console.log('🚀 Editor ready!')
}

const onFocus = () => {
  isFocused.value = true
  console.log('👁️ Editor focused')
}

const onBlur = () => {
  isFocused.value = false
  console.log('💤 Editor blurred')
}
</script>

<template>
  <div>
    <div class="status">
      <span>{{ isFocused ? '🟢 Focused' : '⚫ Not focused' }}</span>
      <span>{{ selectionInfo }}</span>
    </div>
    
    <QuillyEditor
      v-model="content"
      @update:model-value="onUpdate"
      @text-change="onTextChange"
      @selection-change="onSelectionChange"
      @editor-change="onEditorChange"
      @ready="onReady"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>
```

## Event Sources

The `source` parameter in events indicates how the change was triggered:

| Source | Description |
|--------|-------------|
| `'user'` | User interaction (typing, clicking, etc.) |
| `'api'` | Programmatic change via Quill API |
| `'silent'` | Change that shouldn't trigger handlers |

**Example:**
```typescript
const onTextChange = ({ source }: { source: EmitterSource }) => {
  if (source === 'user') {
    // Only react to user changes
    autoSave()
  }
}
```

## See Also

- [Component API](/api/component) - Props and methods
- [TypeScript Types](/api/types) - Type definitions
- [Examples](/examples/) - Practical examples
