var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    babel_polyfill: 'babel-polyfill',
    index: './src/index.js',  // アプリケーションページ用
    common: './src/common.js'  // 共通ページ用
  },
  output: {
    path: path.resolve('./build'),  // ビルドしたファイルの出力先
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
          require.resolve('bootstrap-vue')
        ],
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        // FontAwesome
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: '/static/client/fonts/'
          }
        }]
      }
    ]
  }
};
