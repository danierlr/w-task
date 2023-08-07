import { observer } from 'mobx-react-lite'

import NodeState from './NodeState'

interface Props {
  onAddNode: (nodeState: NodeState) => void
  state: NodeState
  offset: number
}

const OFFSET_SIZE_REM = 2 // possible to import from css

const TreeNodeRecursive = observer(({ state, offset, onAddNode }: Props) => {
  return (
    <div className='w-row' style={{ marginLeft: `${offset * OFFSET_SIZE_REM}rem` }}>
      <span>- {state.label}</span>
      <span onClick={() => onAddNode(state)}>+</span>
    </div>
  )
})

export default TreeNodeRecursive
