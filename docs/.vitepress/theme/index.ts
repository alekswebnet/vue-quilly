import { h } from 'vue'
import Theme from 'vitepress/theme'
import { Analytics } from '@vercel/analytics/vue'
import type { Theme as VitePressTheme } from 'vitepress'

export default {
  extends: Theme,
  Layout: () => {
    return h('div', [
      h(Theme.Layout),
      h(Analytics)
    ])
  }
} satisfies VitePressTheme
