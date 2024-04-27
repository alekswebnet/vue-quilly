<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import { Delta, Range } from 'quill/core'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'
window.katex = katex

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref<string>(`<h1 class="ql-align-center"><span style="background-color: rgb(255, 235, 204);"> </span><span style="background-color: rgb(255, 235, 204); color: rgb(102, 163, 224);">Lorem Ipsum</span><span style="background-color: rgb(255, 235, 204);"> </span></h1><h4 class="ql-align-center"><em style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</em></h4><h5 class="ql-align-center"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</span></h5><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>lorem</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>ipsum</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span><a href="https://github.com/alekswebnet/vue-quilly" rel="noopener noreferrer" target="_blank">dolor</a></li></ol><p class="ql-align-center"><br></p><p class="ql-align-center"><img src="https://picsum.photos/id/123/200/300"></p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><h2><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">What is Lorem Ipsum?</span></h2><p class="ql-align-justify"><strong style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Lorem Ipsum</strong><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);"> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</span></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p>`)
const editorDelta = ref<Delta>()
const editorRange = ref<Range>()
let quill: Quill | null = null

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
      ['link', 'image', 'video', 'formula'],
      ['clean']
    ]
  },
  placeholder: 'Insert text here ...',
  readOnly: false
})

onMounted(() => {
  quill = editor.value?.initialize(Quill)!
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
