const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      VueLoaderPlugin = require('vue-loader').VueLoaderPlugin

module.exports = env => {
  return {
    mode: 'development',
    entry: {
      app: './src/main.ts'
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
      extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /.vue$/,
          use: 'vue-loader'
        },
        {
          test: /.ts$/,
          use: [{
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/.vue$/]
            }
          }]
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
  }
}