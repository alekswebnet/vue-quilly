import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Quilly Docs",
  description: "Documentation for vue-quilly",
  head: [
    ['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🪶</text></svg>' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '🪶',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/component' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Support', link: 'https://ko-fi.com/alekswebnet' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Basic Usage', link: '/guide/basic-usage' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Component API', link: '/api/component' },
          { text: 'Events', link: '/api/events' },
          { text: 'TypeScript Types', link: '/api/types' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Overview', link: '/examples/' },
          { text: 'Snow Theme', link: '/examples/snow-theme' },
          { text: 'Bubble Theme', link: '/examples/bubble-theme' },
          { text: 'Semantic HTML', link: '/examples/semantic-html' },
          { text: 'Image Resize', link: '/examples/image-resize' },
          { text: 'Custom Editor', link: '/examples/custom-editor' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alekswebnet/vue-quilly' }
    ]
  }
})
