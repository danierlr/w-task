import * as path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'

import * as paths from './paths'
import CleanUpStatsPlugin from './CleanUpStatsPlugin'
import NotifyBuildStartedPlugin from './NotifyBuildStartedPlugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

import envMode from './envMode'

if (!envMode) {
  throw new Error('mode env variable is expected to be defined')
}

const makeConfig: () => webpack.Configuration = () => {
  console.log('CONFIG MODE: ' + envMode, paths.NODE_MODULES)

  return {
    mode: envMode === 'production' ? 'production' : 'development',
    entry: path.join(paths.SRC_ROOT, paths.ENTRY_FILE_NAME),

    devtool: envMode === 'production' ? false : 'inline-source-map',
    target: ['web'],

    devServer: {
      static: {
        directory: paths.OUTPUT_ROOT,
      },
      compress: true,
      port: 9000,
      open: false,
      hot: false,
    },

    output: {
      path: paths.OUTPUT_ROOT,
      filename: 'main.bundle.js',
    },

    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
        chunkFilename: '[id].css',
      }),
      new CleanUpStatsPlugin(),
      new NotifyBuildStartedPlugin(),
    ],

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: /\.m\.scss$/,
                  exportGlobals: true,
                  localIdentName: '[local]__[hash:base64:8]',
                  exportLocalsConvention: 'camelCase',
                  localIdentHashSalt: 'omcecvdNIx7XsHasfk',
                  exportOnlyLocals: false,
                  hashStrategy: envMode === 'production' ? 'minimal-subset' : 'resource-path-and-local-name',
                },
                url: true,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [autoprefixer()],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: envMode !== 'production',
                api: 'modern',
                sassOptions: {
                  includePaths: [paths.SRC_GLOBAL_STYLES],
                  outputStyle: envMode === 'production' ? 'compressed' : undefined,
                },
              },
            },
          ],
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                sourceType: 'unambiguous', // solves error 'ES Modules may not assign module.exports or exports.*' ...
                plugins: ['@babel/plugin-transform-runtime'],
                // sourceMaps //?,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                shouldPrintComment: (comment: string) => envMode !== 'production',
                exclude: [
                  // todo investigate
                  /node_modules[\\/]core-js/,
                  /node_modules[\\/]webpack[\\/]buildin/,
                ],
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      // debug: true,
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                sourceType: 'unambiguous',
                plugins: ['@babel/plugin-transform-runtime'],
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                shouldPrintComment: (comment: string) => envMode !== 'production',
                exclude: [
                  // todo investigate
                  /node_modules[\\/]core-js/,
                  /node_modules[\\/]webpack[\\/]buildin/,
                ],
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      // debug: true,
                    },
                  ],
                  '@babel/preset-react',
                ],
              },
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
      ],
    },

    optimization: {
      // '...' string causes webpack 5 to to additionally load default minification plugins
      minimizer: envMode === 'production' ? ['...', new CssMinimizerPlugin()] : ['...'],
    },

    resolve: {
      extensions: [
        '.ts', //
        '.tsx',
        '.js',
        '.jsx',
        '.svg',
        '.json',
        '.json5',
        '.tr.json5',
        '.scss',
      ],
      modules: [
        paths.SRC_ROOT, //
        'node_modules',
      ],
    },

    watch: envMode === 'watch',
    watchOptions: {
      aggregateTimeout: 200,
      ignored: ['**/node_modules/**'],
    },

    cache: true,
  }
}

export default makeConfig
