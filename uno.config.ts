import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetAttributify from '@unocss/preset-attributify'
export default defineConfig({
  // ...UnoCSS options
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerVariantGroup()],
  rules: [],
  shortcuts: [
    // flex
    [
      /^f-((c|s|e)(-(c|s|e|b|a))*)$/,
      ([, , g1, , g2]) => {
        let style = ``
        const temps = [
          { k: 'c', v: 'center' },
          { k: 's', v: 'start' },
          { k: 'e', v: 'end' },
          { k: 'b', v: 'between' },
          { k: 'a', v: 'around' }
        ]

        const r1 = temps.find((i) => i.k == g1)
        style = `flex items-${r1?.v || 'center'} content-${r1?.v || 'center'}`

        if (g2) {
          const r2 = temps.find((i) => i.k == g2)
          style += ` justify-${r2?.v || 'center'}`
        }

        return style
      }
    ],
    {
      'home-content': 'flex flex-col justify-between h-full pb-[var(--van-tabbar-height)]'
    }
  ]
})
