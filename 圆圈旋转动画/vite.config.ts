import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  build: {
    minify: false, // 禁用压缩
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/base.scss";`, // 引入全局的SCSS文件，您可以根据需要更改路径和文件名
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // 根据您的项目结构进行调整，确保可以正确引入文件和模块
    },
  },
});
