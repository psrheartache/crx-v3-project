import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy' // 引入 rollup-plugin-copy

export default defineConfig({
  root: 'src/',
  plugins: [
    vue(),
    copy({
      targets: [
        { src: 'manifest.json', dest: 'dist' }, // 复制 manifest.json 到 dist 目录
        { src: "src/icons/**", dest: 'dist/icons' }, // 复制 src/icons/** 到 dist/icons 目录
        { src: "src/iframe.html", dest: 'dist' } 
      ]
    })
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/popup/index.html'),
        contentPage: path.resolve(__dirname, 'src/contentPage/index.html'),
        content: path.resolve(__dirname, 'src/content/content.ts'),
        background: path.resolve(__dirname, 'src/background/service-worker.ts'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]', // 静态资源
        chunkFileNames: 'js/[name]-[hash].js', // 代码分割中产生的 chunk
        entryFileNames: (chunkInfo: any) => { // 入口文件
          const baseName = path.basename(chunkInfo.facadeModuleId, path.extname(chunkInfo.facadeModuleId))
          const saveArr = ['content', 'service-worker']
          return `[name]/${saveArr.includes(baseName) ? baseName : chunkInfo.name}.js`;
        },
        name: '[name].js'
      }
    },
  },
})
