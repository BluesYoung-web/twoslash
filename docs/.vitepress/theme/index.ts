// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import TwoSlashFloatingVue from 'vitepress-plugin-twoslash/client'
import 'vitepress-plugin-twoslash/style.css'
import 'uno.css'
import './style.css'
import './homepage.scss'
import type { EnhanceAppContext } from 'vitepress'

export default {
  extends: Theme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoSlashFloatingVue)
  },
}
