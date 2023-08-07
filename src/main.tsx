import ReactDOM from 'react-dom/client'

import App from './components/App'

import 'styles/common.scss'

const rootEl = document.getElementById('root')
const REACT_MAIN_ROOT_PREFIX = 'w-main_'

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl, {
    identifierPrefix: REACT_MAIN_ROOT_PREFIX,
  })

  root.render(<App />)
} else {
  console.error('Root element not found')
}
