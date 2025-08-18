const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/components/index.js', // entry utama
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // auto bersihkan folder dist
  },
  module: {
    rules: [
      {
        test: /\.css$/i,   // untuk file .js
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
  },
  mode: 'development',
};
