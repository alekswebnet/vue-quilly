# vue-quilly

Tiny Vue component, that helps to create [Quill v2](https://quilljs.com/) based WYSIWYG editors in Vue-powered apps.
Flexible setup, no styles, ready for further customization.

Default input data format is HTML, but also has [Delta](https://quilljs.com/docs/delta) support - using Quill API and exposed Quill instance.
In short, HTML and Delta inputs works in a same way, you can use one of them or both formats to change editor data model.

It's not a all-in-one solution and requires further Quill configuration.
In other hand, you can build your own editor, that matches your needs, with easy.
No matter if you want to create full-featured editor with all Quill's modules or small custom solution with extra functionality, you can use this package as a base start point.

## Features

- Builded on top of [Quill v2](https://github.com/quilljs/quill)
- Uses `quill/core` to prevent importing all Quill modules
- Works with both HTML and Quill Delta format
- Uses `getSemanticHTML` function from Quill API for convertaion Delta into a clean HTML output
- Typescript support

## Setup

```bash
npm add quill@2.0.0 vue-quilly
# Or
pnpm add quill@2.0.0 vue-quilly
```

## Get started

Import Quill full build if you need all modules or [core build](https://quilljs.com/docs/installation#core-build) with minimum required modules:

```ts
import Quill from 'quill' // Full build
import Quill from 'quill/core' // Core build
import { QuillyEditor } from 'vue-quilly'
```

Add core styles. Also import one of Quill's [themes](https://quilljs.com/docs/customization/themes#themes), if you need one:

```ts
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css' // For snow theme
import 'quill/dist/quill.bubble.css' // For bubble theme
```

Define Quill [options](https://quilljs.com/docs/configuration#options):

```ts
const options = {
  theme: 'snow',
  modules: {
    toolbar: true,
  },
  placeholder: 'Compose an epic...',
  readOnly: false
}
```
Initialize the editor:

```html
<QuillyEditor
  ref="editor"
  v-model="model"
  @text-change="({ delta }) => (editorDelta = delta)"
  @selection-change="({ range }) => (editorRange = range)"
  @editor-change="(eventName) => console.log(eventName)"
/>
```
```ts
onMounted(() => {
  const quillInstance = editor.value?.initialize(new Quill(editor.value.container!, options))
  console.log(quillInstance)
})
```

Get access to reactive Quill instance:

```ts
const quill = computed(() => editor.value?.quillInstance())
```
Use `v-model` for HTML content type. You can set Delta content using Quill instance:

```ts
quill?.value?.setContents(
  new Delta()
    .insert('Hello')
    .insert('\n', { header: 1 })
    .insert('Some ')
    .insert('initial', { bold: true })
    .insert(' ')
    .insert('content', { underline: true })
    .insert('\n')
)
```

## Events

The component provides `text-change`, `selection-change`, `editor-change` events, identical to [Quill events](https://quilljs.com/docs/api#events).

All events types:

| Event name        | Params                                                  |
| ----------------- | ------------------------------------------------------- |
| text-change       | delta: Delta, oldContent: Delta, source: EmitterSource  |
| selection-change  | range: Range, oldRange: Range, source: EmitterSource    |
| editor-change     | eventName: string                                       |
| focus             | quill: Quill                                            |
| blur              | quill: Quill                                            |
| ready             | quill: Quill                                            |

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Inspiration projects and useful links

https://github.com/quilljs/quill

https://github.com/surmon-china/vue-quill-editor

https://github.com/vueup/vue-quill

https://www.matijanovosel.com/blog/making-and-publishing-components-with-vue-3-and-vite
