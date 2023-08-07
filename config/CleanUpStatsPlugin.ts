// a hack, that filters out MiniCssExtractPlugin log spam. MiniCssExtractPlugin has no verbosity option.
// copied from here: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/168
class CleanUpStatsPlugin {
  shouldPickStatChild(child: any) {
    return child.name.indexOf('mini-css-extract-plugin') !== 0
  }

  apply(compiler: any) {
    compiler.hooks.done.tap('CleanUpStatsPlugin', (stats: any) => {
      const children = stats.compilation.children
      if (Array.isArray(children)) {
        // eslint-disable-next-line no-param-reassign
        stats.compilation.children = children.filter((child) => this.shouldPickStatChild(child))
      }
    })
  }
}

export default CleanUpStatsPlugin
