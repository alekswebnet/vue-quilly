---
outline: deep
---

# Examples

This section showcases different editor configurations and use cases built with vue-quilly. Each example demonstrates specific features and integration patterns you can use in your projects.

## Available Examples

### [Snow Theme Editor](/examples/snow-theme)
The classic Quill editor with the Snow theme, featuring a full toolbar with all formatting options.

**Features:**
- Complete toolbar with all formatting options
- Formula support with KaTeX
- Image and video embedding
- Font, size, and color customization

### [Bubble Theme Editor](/examples/bubble-theme)
Lightweight editor with the Bubble theme that shows toolbar on text selection.

**Features:**
- Medium-style inline toolbar
- Appears on text selection
- Same formatting capabilities as Snow theme
- Cleaner, more minimalist interface

### [Semantic HTML Editor](/examples/semantic-html)
Editor configured to output clean, semantic HTML without Quill-specific classes.

**Features:**
- Clean HTML output (e.g., `<h1>` instead of `<p class="ql-header-1">`)
- Better for SEO and accessibility
- Easy content portability
- Ideal for CMS and blog posts

### [Image Resize Editor](/examples/image-resize)
Editor with image resize functionality using the `quill-image-resize-module`.

**Features:**
- Drag to resize images
- Display size indicator
- Resize handles on images
- Image alignment toolbar

### [Custom Editor (Core Build)](/examples/custom-editor)
Minimal custom editor using `quill/core` with only specific blots registered.

**Features:**
- Minimal bundle size (uses `quill/core`)
- Custom blots (Bold, Italic, Headers)
- External toolbar controls
- Perfect for custom implementations

## Live Demo

Try all these examples live at [vue-quilly.vercel.app](https://vue-quilly.vercel.app/)

## Source Code

View the complete source code for all examples in our [demo directory](https://github.com/alekswebnet/vue-quilly/tree/main/demo).

## Integration Examples

- [Nuxt 4 Integration](https://github.com/alekswebnet/vue-quilly/tree/main/nuxt) - SSR setup with Nuxt
- [Browser CDN Setup](https://codepen.io/redrobot753/pen/VwJwPLP) - CodePen example
