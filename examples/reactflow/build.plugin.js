const { includes } = require('lodash');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const BundleBuddyWebpackPlugin = require("bundle-buddy-webpack-plugin");
const webpack = require('webpack');
const Config = require('webpack-chain');
const packageInfo = require('./package.json');

module.exports = ({ context, onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.plugin('DefinePlugin').use(
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(packageInfo.version),
      }),
    );

    config.resolve.plugin('tsconfigpaths').use(TsconfigPathsPlugin, [
      {
        configFile: './tsconfig.json',
      },
    ]);

    // react flow 会加载 esm 包，需要过一下 babel
    config.module
      .rule('js')
      .test(/\.js$/)
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
      });
  });
};
