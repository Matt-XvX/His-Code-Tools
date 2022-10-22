import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//NaiveUi https://www.naiveui.com/zh-CN/light/docs/import-on-demand
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports:[
        'vue',
        {
          'naive-ui':[
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ],
        }
    ]
    }),
    Components({
      resolvers:[NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
