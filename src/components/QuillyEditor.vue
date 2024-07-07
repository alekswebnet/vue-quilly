<script setup lang="ts">
import Quill, { Delta, EmitterSource, QuillOptions, Range } from 'quill/core'
import { onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  // HTML model value, supports v-model
  modelValue?: string | null
  // Quill initialization options
  options?: QuillOptions
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (
    e: 'text-change',
    { delta, oldContent, source }: { delta: Delta; oldContent: Delta; source: EmitterSource }
  ): void
  (
    e: 'selection-change',
    { range, oldRange, source }: { range: Range; oldRange: Range; source: EmitterSource }
  ): void
  (e: 'editor-change', eventName: 'text-change' | 'selection-change'): void
  (e: 'blur', quill: Quill): void
  (e: 'focus', quill: Quill): void
  (e: 'ready', quill: Quill): void
}>()

let quillInstance: Quill | null = null
const container = ref<HTMLElement>()
const model = ref<string | null>()

// Convert modelValue HTML to Delta and replace editor content
const pasteHTML = (quill: Quill) => {
  model.value = props.modelValue
  const oldContent = quill.getContents()
  const delta = quill.clipboard.convert({ html: props.modelValue ?? '' })
  quill.setContents(delta)
  emit('text-change', { delta, oldContent, source: 'api' })
}

// Editor initialization, returns Quill instance
const initialize = (QuillClass: typeof Quill) => {
  const quill = new QuillClass(container.value as HTMLElement, props.options)

  // Set editor initial model
  if (props.modelValue) {
    pasteHTML(quill)
  }

  // Handle editor selection change, emit blur and focus
  quill.on('selection-change', (range, oldRange, source) => {
    if (!range) {
      emit('blur', quill)
    } else {
      emit('focus', quill)
    }
    emit('selection-change', { range, oldRange, source })
  })

  // Handle editor text change
  quill.on('text-change', (delta, oldContent, source) => {
    model.value = quill.root.innerHTML
    emit('text-change', { delta, oldContent, source })
  })

  // Handle editor change
  quill.on('editor-change', (eventName: 'text-change' | 'selection-change') => {
    emit('editor-change', eventName)
  })

  emit('ready', quill)

  quillInstance = quill

  return quill
}

// Watch modelValue and paste HTML if has changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (!quillInstance) return
    if (newValue && newValue !== model.value) {
      pasteHTML(quillInstance)
      model.value = quillInstance.root.innerHTML
    } else if (!newValue) {
      quillInstance.setContents([])
    }
  }
)

// Watch model and update modelValue if has changes
watch(model, (newValue, oldValue) => {
  if (!quillInstance) return
  if (newValue && newValue !== oldValue) {
    emit('update:modelValue', newValue)
  } else if (!newValue) {
    quillInstance.setContents([])
  }
})

onBeforeUnmount(() => {
  quillInstance = null
})

// Expose init function
defineExpose<{
  initialize: (QuillClass: typeof Quill) => Quill
}>({
  initialize
})
</script>

<template>
  <div ref="container"></div>
</template>
