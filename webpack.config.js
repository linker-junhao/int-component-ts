const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// eslint-disable-next-line no-unused-vars
module.exports = (env) => ({
  mode: 'development',
  entry: {
    app: '/example/main.ts'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      vue: 'vue/dist/vue.esm-bundler.js'
    },
    mainFiles: ['index'],
    extensions: ['.wasm', '.ts', '.tsx', '.js', '.jsx', '.esm.js', '.umd.js', '.mjs.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript'
              ],
              plugins: ['@vue/babel-plugin-jsx']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'less-loader', // 将 Less 文件编译为 CSS 文件
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './example/public/index.html',
      title: 'int-component',
      url: './'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
});
