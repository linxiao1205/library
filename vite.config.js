import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // server: {
  //   // 启动打开浏览器
  //   open: true,
  //   host: "127.0.0.1",//主机
  //   port: 3001//端口
  // }
  server: {
    //本地代理
    proxy: {
      '/api': {
        target: 'http://192.168.222.1:3000/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''), //rewrite 重写，把/api替换掉了
      },
    },
  },
})
