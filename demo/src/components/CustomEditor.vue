<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill, { Delta, Range } from 'quill/core'
import { type BlotConstructor } from 'parchment'
import 'quill/dist/quill.core.css'

const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref<string>('<h1>Hello world!</h1><p>I am a new paragraph</p>')
const editorDelta = ref<Delta>()
const editorRange = ref<Range>()

let quill: Quill | undefined

const Inline  = Quill.import('blots/inline') as BlotConstructor
const Block = Quill.import('blots/block') as BlotConstructor

class BoldBlot extends Inline {}
BoldBlot.blotName = 'bold'
BoldBlot.tagName = 'strong'

class ItalicBlot extends Inline { }
ItalicBlot.blotName = 'italic'
ItalicBlot.tagName = 'em'

class HeaderBlot extends Block {
  static formats(node: Element) {
    return HeaderBlot.tagName.indexOf(node.tagName) + 1;
  }
}
HeaderBlot.blotName = 'header'
HeaderBlot.tagName = ['H1', 'H2']

Quill.register(BoldBlot)
Quill.register(ItalicBlot)
Quill.register(HeaderBlot)

const options = {
  placeholder: 'Start your story here...',
  readOnly: false
}

onMounted(() => {
  quill = editor.value!.initialize(Quill)
})

const onModelValueChange = (value: string) => console.log(value)
const onTextChange = (({ delta }: { delta: Delta }) => (editorDelta.value = delta))
const onSelectionChange = ({ range }: { range: Range }) => (editorRange.value = range)
const onEditorChange = (eventName: string) => console.log(eventName)
</script>

<template>
  <div>
    <button class="button" @click="quill?.format('bold', true)">Bold</button>
    <button class="button" @click="quill?.format('italic', true)">Italic</button>
    <button class="button" @click="quill?.format('header', 1)">Header 1</button>
    <button class="button" @click="quill?.format('header', 2)">Header 2</button>
  </div>

  <QuillyEditor
    ref="editor"
    v-model="model"
    :options="options"
    @update:model-value="onModelValueChange"
    @text-change="onTextChange"
    @selection-change="onSelectionChange"
    @editor-change="onEditorChange"
  />
  
  <hr>
  <p class="tag">Model value:</p>
  <p><small>{{ model }}</small></p>
  <button class="button" @click="model = `<h1>Hello world!</h1><p>I am a new paragraph</p>`">Set model value</button>
  <button class="button" @click="quill?.setContents([])">Reset model</button>
  <hr>
  <p class="tag">Contents:</p>
  <p><small>{{ quill?.getContents() }}</small></p>
  <button
    class="button"
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
  <button class="button" @click="quill?.setContents([])">Reset contents</button>
  <hr>
  <p class="tag">SEMANTIC HTML:</p>
  <p><small>{{ quill?.getSemanticHTML() }}</small></p>
  <hr>
  <p class="tag">Last change:</p>
  <p><small>{{ editorDelta }}</small></p>
  <hr>
  <p class="tag">Current selection:</p>
  <p><small>{{ editorRange }}</small></p>
  <button class="button" @click="quill?.setSelection({ index: 5, length: 2 })">Set range</button>
  <hr>
  <p class="tag">Content lenght:</p>
  <p><small>{{ quill?.getLength() }}</small></p>
  <hr>
  <p class="tag">Readonly:</p>
  <p><input :value="quill?.isEnabled()" type="checkbox" @input="quill?.enable(!quill?.isEnabled())"/></p>
</template>
