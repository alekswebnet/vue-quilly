import Layout from './Layout.vue'
import Theme from 'vitepress/theme'
import type { Theme as VitePressTheme } from 'vitepress'
import './style.css'

export default {
  extends: Theme,
  Layout
} satisfies VitePressTheme
