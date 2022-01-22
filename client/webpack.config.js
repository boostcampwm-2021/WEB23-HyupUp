const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');

const loadPlugin = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: '/public/index.html',
      favicon: 'public/favicon.ico',
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new Dotenv(),
  ];

  const showBundle = !!process.env.BUNDLE;
  if (process.env.BUNDLE) plugins.push(new BundleAnalyzerPlugin());
  return plugins;
};

module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, './src/index'),

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jp(e)g|gif|svg|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
      {
        resolve: {
          alias: {
            '@': path.resolve(__dirname, 'src'),
            '@public': path.resolve(__dirname, 'public'),
          },
        },
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },

  plugins: loadPlugin(),
};
