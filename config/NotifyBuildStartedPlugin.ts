class NotifyBuildStartedPlugin {
  apply(compiler: any) {
    compiler.hooks.compile.tap('NotifyBuildStartedPlugin', () => {
      console.log('BUILD IN PROGRESS ...')
    })
  }
}

export default NotifyBuildStartedPlugin
