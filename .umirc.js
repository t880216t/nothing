
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'wuliao',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/socket.io': {
      target: "http://127.0.0.1:5000",
      ws: false,
    },
    '/hot': {
      target: 'http://mp3.9ku.com/',
      changeOrigin: true,
      // pathRewrite: { '^/file': '' },
    },
    '/mp3': {
      target: 'http://mp3.9ku.com/',
      changeOrigin: true,
      // pathRewrite: { '^/file': '' },
    },
  },
}
