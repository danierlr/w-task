import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'

import TreeRecursive from './TreeRecursive'
import TreeIterative from './TreeIterative'
import AddNodeDialog from './AddNodeDialog'

import AppState from './AppState'

export default observer(() => {
  const state = useMemo(() => new AppState(), [])

  return (
    <div className='w-col'>
      <div className='w-row'>
        <div>
          <TreeRecursive root={state.root} onAddNode={state.showAddNodeDialog} />
        </div>
        <div>
          <TreeIterative root={state.root} onAddNode={state.showAddNodeDialog} />
        </div>
      </div>
      {state.appendedNode && <AddNodeDialog parentName={state.appendedNode.label} onAddNode={state.appendNode} />}
    </div>
  )
})
