const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'Pizzabot challenge',
        template: './public/index.html',
        favicon: './public/favicon.ico'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: '[path][name].[ext]'
          }
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    historyApiFallback: true,
    open: true,
    overlay: true,
  }
};
