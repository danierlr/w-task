import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'

import makeWebpackConfig from '../config/webpack.config'
import envMode from '../config/envMode'

const config = makeWebpackConfig()
const compiler = webpack(config, (error, stats) => {
  if (error) {
    console.log('Error while dev:build:... : ', error, '\n\n')
    return
  }

  console.log(
    stats?.toString({
      colors: true,
      modules: true,
      children: true,
      chunks: true,
      chunkModules: true,
    })
  )

  if (stats?.hasErrors()) {
    return
  }
})

if (envMode === 'watch') {
  const devServerOptions = { ...(config as any).devServer }
  const server = new webpackDevServer(devServerOptions, compiler)

  const runServer = async () => {
    console.log('Starting server...')
    await server.start()
  }

  runServer()
}
