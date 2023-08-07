import path from 'path'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const ROOT = path.join(__dirname, '..')
export const ENTRY_FILE_NAME = 'main.tsx'
export const SRC_ROOT = path.join(ROOT, 'src')
export const SRC_GLOBAL_STYLES = path.join(SRC_ROOT, 'styles')
export const CONFIG = path.join(ROOT, 'config')
export const CONFIG_WEBPACK_FILE = path.join(CONFIG, 'webpack.config.ts')
export const OUTPUT_ROOT = path.join(ROOT, 'public')
export const OUTPUT_ASSETS = path.join(OUTPUT_ROOT, 'assets')
export const NODE_MODULES = path.join(ROOT, 'node_modules')
