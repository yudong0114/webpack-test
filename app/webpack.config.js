const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
  // バンドルの構築を開始する場所
  entry: {
    index: './src/index.js',
    about: './src/about.js',
    'common.css': './src/common.scss',
    'index.css': './src/index.scss',
    'button.css': './src/button.scss',
    'about.css': './src/about.scss',
  },
  // バンドルしたファイルのエクスポート先
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
      // scssの使用
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader', 
            options: {
              url: false,
            }
          },
          {
            loader: 'sass-loader',
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
    // HTML生成するプラグイン(top)
    new HtmlWebpackPlugin({
      // 書き出すHTML
      filename: 'index.html',
      // 指定するEJS
			template : './src/index.ejs',
      // minifyは行わない
			minify: false,
      // 読み込むファイル
      chunks: [
        'index',
        'common.css',
        'index.css',
        'button.css',
      ],
    }),
    // HTML生成するプラグイン(About)
    new HtmlWebpackPlugin({
      // 書き出すHTML
      filename: 'about.html',
      // 指定するEJS
			template : './src/about.ejs',
      // minifyは行わない
			minify: false,
      // 読み込むファイル
      chunks: [
        'about',
        'common.css',
        'about.css',
      ],
    }),
    // エントリー記載の.css.jsファイルが生成されないようにするプラグイン
    new FixStyleOnlyEntriesPlugin({
      extensions: ['scss', 'css']
    }),
    // CSSを別ファイルで出力するプラグイン
    new MiniCssExtractPlugin({
      filename: './[name]',
    }),
  ]
};