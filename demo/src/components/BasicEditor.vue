<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { QuillyEditor } from '../../../src/'
import Quill from 'quill'
import { Delta } from 'quill/core'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'
window.katex = katex

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref()
const editorDelta = ref()
const editorRange = ref()

// Define Quill options
const options = {
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
}

// Init editor after component is mounted
onMounted(() => {
  editor.value?.initialize(new Quill(editor.value.container!, options))
})

// Get access to Quill instance
const quill = computed(() => editor.value?.quillInstance())
</script>

<template>
  <QuillyEditor
    ref="editor"
    v-model="model"
    @text-change="({ delta }) => (editorDelta = delta)"
    @selection-change="({ range }) => (editorRange = range)"
    @editor-change="(eventName) => console.log(eventName)"
  />
  <p class="text-label">MODEL:</p>
  <p>{{ model }}</p>
  <button @click="model = `<h1>Hello world!</h1><p>I am a new paragraph</p>`">Set model</button>
  <button @click="quill?.setContents([])">Reset model</button>
  <p class="text-label">CONTENTS:</p>
  <p>{{ quill?.getContents() }}</p>
  <button
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
  <button @click="quill?.setContents([])">Reset contents</button>
  <p class="text-label">LAST CHANGE:</p>
  <p>{{ editorDelta }}</p>
  <p class="text-label">CURRENT SELECTION:</p>
  <p>{{ editorRange }}</p>
  <button @click="quill?.setSelection({ index: 35, length: 0 })">Set range</button>
  <p class="text-label">CONTENT LENGTH:</p>
  <p>{{ quill?.getLength() }}</p>
</template>
