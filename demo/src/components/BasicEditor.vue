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

let quill: Quill | null = null

const Inline  = Quill.import('blots/inline') as BlotConstructor
const Block = Quill.import('blots/block') as BlotConstructor

class BoldBlot extends Inline {}
BoldBlot.blotName = 'bold';
BoldBlot.tagName = 'strong';

class ItalicBlot extends Inline { }
ItalicBlot.blotName = 'italic';
ItalicBlot.tagName = 'em';

class HeaderBlot extends Block {
  static formats(node: Element) {
    return HeaderBlot.tagName.indexOf(node.tagName) + 1;
  }
}
HeaderBlot.blotName = 'header';
HeaderBlot.tagName = ['H1', 'H2'];


Quill.register(BoldBlot);
Quill.register(ItalicBlot);
Quill.register(HeaderBlot);

const options = {
  placeholder: 'Start your story here...',
  readOnly: false
}

onMounted(() => {
  quill = editor.value!.initialize(Quill)
})

const onTextChange = (({ delta }: { delta: Delta }) => (editorDelta.value = delta))
const onSelectionChange = ({ range }: { range: Range }) => (editorRange.value = range)
const onEditorChange = (eventName: string) => console.log(eventName)
</script>

<template>
  <div id="tooltip-controls">
    <button class="button-xsmall pure-button" @click="quill?.format('bold', true)"><i class="fa fa-bold"></i></button>
    <button class="button-xsmall pure-button" @click="quill?.format('italic', true)"><i class="fa fa-italic"></i></button>
    <button class="button-xsmall pure-button" @click="quill?.format('header', 1)"><i class="fa fa-header"><sub>1</sub></i></button>
    <button class="button-xsmall pure-button" @click="quill?.format('header', 2)"><i class="fa fa-header"><sub>2</sub></i></button>
  </div>
  <QuillyEditor
    ref="editor"
    v-model="model"
    :options="options"
    @text-change="onTextChange"
    @selection-change="onSelectionChange"
    @editor-change="onEditorChange"
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
