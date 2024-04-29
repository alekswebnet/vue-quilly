<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuillyEditor } from '../../../src/'
import Quill, { Delta, Range } from 'quill/core'
import 'quill/dist/quill.core.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref<string>('<h1>Hello world!</h1><p>I am a new paragraph</p>')
const editorDelta = ref<Delta>()
const editorRange = ref<Range>()

let quill: Quill | null = null

const options = {
  placeholder: 'Insert text here ...',
  readOnly: false
}

onMounted(() => {
  quill = editor.value!.initialize(Quill)
})
</script>

<template>
  <QuillyEditor
    ref="editor"
    v-model="model"
    :options="options"
    @text-change="({ delta }) => (editorDelta = delta)"
    @selection-change="({ range }) => (editorRange = range)"
    @editor-change="(eventName) => console.log(eventName)"
  />
  <p class="text-label">Model value:</p>
  <p>{{ model }}</p>
  <button class="pure-button" @click="model = `<h1>Hello world!</h1><p>I am a new paragraph</p>`">Set model value</button>
  <button class="pure-button" @click="quill?.setContents([])">Reset model</button>
  <p class="text-label">Contents:</p>
  <p>{{ quill?.getContents() }}</p>
  <button
    class="pure-button"
    @click="
      quill?.setContents(
        new Delta()
          .insert('Hello')
          .insert('\n', { header: 1 })
          .insert('Some ')
          .insert('initial', { bold: true })
          .insert(' ')
          .insert('content', { underline: true })
          .insert('\n')
      )
    "
  >
    Set contents
  </button>
  <button class="pure-button" @click="quill?.setContents([])">Reset contents</button>
  <p class="text-label">Last change:</p>
  <p>{{ editorDelta }}</p>
  <p class="text-label">Current selection:</p>
  <p>{{ editorRange }}</p>
  <button class="pure-button" @click="quill?.setSelection({ index: 5, length: 2 })">Set range</button>
  <p class="text-label">Content lenght:</p>
  <p>{{ quill?.getLength() }}</p>
  <p class="text-label">Readonly:</p>
  <p><input :value="quill?.isEnabled()" type="checkbox" @input="quill?.enable(!quill?.isEnabled())"/></p>
</template>
