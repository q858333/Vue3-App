import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default (command: string, mode: string) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
  const env = loadEnv(mode, process.cwd())
  console.log('1111-env', env,env.VITE_BASE_URL);
  const baseApi = import.meta;
  console.log('base-api', baseApi);

  return {
     // vite 配置
     define: {
      __APP_ENV__: JSON.stringify(env.NODE_ENV),
    },

    plugins: [VueSetupExtend(), vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    {
      ...viteMockServe(),
      apply: 'serve' // 开发时应用
    },
    // viteMockServe({
    //   localEnabled: command === 'serve',
    // }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/variable.scss";',
        },
      },
    },
    //代理跨域
    server: {
      // port: 5173,
      host: true,
      proxy: {
        '/api': {
          //获取数据的服务器地址设置
          target: 'http://sph-api.atguigu.cn',
          //需要代理跨域
          changeOrigin: true,
          secure: false,
          //路径重写
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        }
      }
    },
  }
}
