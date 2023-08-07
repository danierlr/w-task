type Mode = 'production' | 'development' | 'watch'

const envMode = process.env['NODE_ENV'] as Mode

console.log('process.env.NODE_ENV', process.env['NODE_ENV'])

export default envMode
