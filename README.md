# vue-quilly

Tiny Vue component, helps to create [Quill v2](https://quilljs.com/) based WYSIWYG editors in Vue-powered apps.
Flexible setup, no styles, ready for customization.

Default input data format is HTML, but also has [Delta](https://quilljs.com/docs/delta) support - using Quill API and exposed Quill instance.
In short, HTML and Delta inputs affect in a same way, you can use one of them or both formats to change editor data model.

It's not a all-in-one solution and requires further Quill configuration.
In other hand, you can build your own editor, that matches your needs, with easy.

## Features

- Builded on top of [Quill v2](https://github.com/quilljs/quill)
- Uses only `quill/core` module for flexible setup and high customization
- Works with both HTML and Quill's Delta formats
- Uses `getSemanticHTML` from Quill API for making a clean HTML output
- Typescript support

## Setup

```bash
npm add quill@2.0.0 vue-quilly
# Or
pnpm add quill@2.0.0 vue-quilly
```

## Get started

In progress...

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Inspiration projects and useful links

https://github.com/quilljs/quill

https://github.com/surmon-china/vue-quill-editor

https://github.com/vueup/vue-quill

https://www.matijanovosel.com/blog/making-and-publishing-components-with-vue-3-and-vite
