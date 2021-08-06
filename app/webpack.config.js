const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // バンドルの構築を開始する場所
  entry: {
    'index.js': './src/index.js',
  },
  // バンドルしたファイルのエクスポート先
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // ファイル変更の検知の有効化
  watch: true,
  module: {
    rules: [
      // babelの使用(ES6 -> ES5)
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // cssの使用
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader', 
            options: {
              url: false,
            }
          },
        ],
      },
      // ejsの使用
      {
				test: /\.ejs$/i,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: false
						},
					},
					{
						loader: 'ejs-plain-loader'
					}
				]
			},
    ]
  },
  plugins: [
    // HTML生成するプラグイン
    new HtmlWebpackPlugin({
      // 書き出すHTML
      filename: 'index.html',
      // 指定するEJS
			template : './src/index.ejs',
      // minifyは行わない
			minify: false,
      // 読み込むファイル
      chunks: [
        'index.js',
      ],
    }),
    // CSSを別ファイルで出力するプラグイン
    new MiniCssExtractPlugin({
      filename: 'index.css'
    })
  ]
};