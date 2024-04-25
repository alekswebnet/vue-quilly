<script setup lang="ts">
import Quill, { Delta, EmitterSource, Range } from 'quill/core'
import { Ref, ref, watch } from 'vue'

const props = defineProps<{
  modelValue?: string
  readOnly?: boolean
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

let quill: Quill
const container = ref<HTMLElement>()
const model = ref<string>()

// Paste HTML from modelValue to editor
const pasteHTML = () => {
  model.value = props.modelValue
  const content = quill.clipboard.convert({ html: props.modelValue })
  quill.setContents(content!)
}

// Editor initialization, returns Quill instance
const initialize = (quillInstance?: Quill | null) => {
  // Check initial Quill instance
  if (!quillInstance) {
    console.warn('[QuillyEditor]: Unable to init, Quill instance is not found')
    return null
  }

  // Save ref to the Quill instance
  quill = quillInstance

  // Set editor enabled
  quill.enable(!props.readOnly)

  // Set editor initial model
  if (props.modelValue) {
    pasteHTML()
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
    model.value = quill.getSemanticHTML()
    emit('text-change', { delta, oldContent, source })
  })

  // Handle editor change
  quill.on('editor-change', (eventName: 'text-change' | 'selection-change') => {
    emit('editor-change', eventName)
  })

  emit('ready', quill)

  return quill
}

// Make Quill instance reactive to props
const quillInstance = () => (props.modelValue && props.readOnly ? quill : quill)

// Watch modelValue and paste HTML if has changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && newValue !== model.value) {
      pasteHTML()
      model.value = quill.getSemanticHTML()
    } else if (!newValue) {
      quill?.setContents([])
    }
  }
)

// Watch model and update modelValue if has changes
watch(model, (newValue, oldValue) => {
  if (newValue && newValue !== oldValue) {
    emit('update:modelValue', newValue)
  } else if (!newValue) {
    quill?.setContents([])
  }
})

// Expose container element, init function and Quill instance
defineExpose<{
  container: Ref<HTMLElement | undefined>
  initialize: (quillInstance?: Quill | null) => void
  quillInstance: () => Quill
}>({
  container,
  initialize,
  quillInstance
})
</script>

<template>
  <div ref="container"></div>
</template>
