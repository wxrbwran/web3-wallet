import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import ComponentsPlugin from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      // exclude: [
      //   'fs' // Excludes the polyfill for `fs` and `node:fs`.
      // ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true
      }
      // Whether to polyfill `node:` protocol imports.
      // protocolImports: true
    }),
    ComponentsPlugin({ resolvers: [VantResolver()] }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [VantResolver()],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
