const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './frontend/src/entry.tsx',
  output: {
    path: path.resolve(__dirname, 'frontend/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.ttf$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/public/index.html',
      inject: 'body'
    })
  ],
  devServer: {
    host: 'localhost',
    port: 2910,
    historyApiFallback: true,
    proxy: {
      target: 'http://localhost:2901',
      changeOrigin: true,
      context: [
        '/getPendingMessage'
      ]
    }
  }
}
