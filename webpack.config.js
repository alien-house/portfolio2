const webpack = require("webpack");
const path = require('path');
module.exports = {
  // メインのJS
  entry: [
    'babel-polyfill', // Polyfillも含める
    './js/main.js',
  ],
  plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
  ],
  resolve: {
    alias: {
      snapsvg: 'snapsvg/dist/snap.svg.js',
      TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      animationGsap: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      debugAddIndicators: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    },
  },
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/build`,
    // 出力ファイル名
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // env を指定することで、ES2017 を ES5 に変換。
                // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
                // webpack の Tree Shaking 機能が使えない
                ['env', {'modules': false}]
              ]
            }
          }
        ],
        // node_modules は除外する
        exclude: /node_modules/,
      }
    ]
  },
  // ソースマップを有効にする
  devtool: 'source-map'
}