<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import { Delta, Range } from 'quill/core'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref<string>(`<h1>Hello world!</h1><p><strong>bold</strong></p><ol><li>item 1</li><li>item 2</li><li>item 3</li></ol><p></p><ul><li>item 4</li><li>item 5</li><li>item 6</li></ul><p>I am a new paragraph</p>`)
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
      ['link', 'image', 'video'],
      ['clean']
    ]
  },
  placeholder: 'Insert text here ...',
  readOnly: false
})

onMounted(() => {
  quill = editor.value?.initialize(Quill)
})

const onModelValueChange = (value: string) => console.log(value)
const onTextChange = (({ delta }: { delta: Delta }) => (editorDelta.value = delta))
const onSelectionChange = ({ range }: { range: Range }) => (editorRange.value = range)
const onEditorChange = (eventName: string) => console.log(eventName)
</script>

<template>
  <QuillyEditor
    ref="editor"
    v-model="model"
    :options="options"
    :is-semantic-html-model="true"
    @update:model-value="onModelValueChange"
    @text-change="onTextChange"
    @selection-change="onSelectionChange"
    @editor-change="onEditorChange"
  />
  <p class="text-label">MODEL:</p>
  <p>{{ model }}</p>
  <button class="pure-button" @click="model = `<h1>Hello world!</h1><p>I am a new paragraph</p>`">Set model</button>
  <button class="pure-button" @click="quill?.setContents([])">Reset model</button>
  <p class="text-label">CONTENTS:</p>
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
  <p class="text-label">LAST CHANGE:</p>
  <p>{{ editorDelta }}</p>
  <p class="text-label">CURRENT SELECTION:</p>
  <p>{{ editorRange }}</p>
  <button class="pure-button" @click="quill?.setSelection({ index: 5, length: 2 })">Set range</button>
  <p class="text-label">CONTENT LENGTH:</p>
  <p>{{ quill?.getLength() }}</p>
  <p class="text-label">Readonly:</p>
  <p><input :value="quill?.isEnabled()" type="checkbox" @input="quill?.enable(!quill?.isEnabled())"/></p>
</template>
