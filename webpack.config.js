const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// eslint-disable-next-line no-unused-vars
module.exports = (env) => ({
  mode: 'development',
  entry: {
    app: '/src/main.ts'
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
    extensions: ['.wasm', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@vue/babel-plugin-jsx']
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
        loader: 'less-loader' // 将 Less 文件编译为 CSS 文件
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'int-component',
      url: './'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
});
