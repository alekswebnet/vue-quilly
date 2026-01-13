import Layout from './Layout.vue'
import Theme from 'vitepress/theme'
import type { Theme as VitePressTheme } from 'vitepress'

export default {
  extends: Theme,
  Layout
} satisfies VitePressTheme
