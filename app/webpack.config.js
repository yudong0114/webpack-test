const path = require('path');

module.exports = {
  // バンドルの構築を開始する場所
  entry: './src/',
  // バンドルしたファイルのエクスポート先
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // ファイル変更の検知の有効化
  watch: true,
};