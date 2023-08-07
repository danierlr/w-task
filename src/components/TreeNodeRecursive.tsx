import { observer } from 'mobx-react-lite'

import NodeState from './NodeState'
import c from 'utils/c'

// @ts-ignore
import s from './TreeNodeRecursive.m.scss'

interface Props {
  onAddNode: (nodeState: NodeState) => void
  state: NodeState
}

const TreeNodeRecursive = observer(({ state, onAddNode }: Props) => {
  return (
    <div className='w-col'>
      <div className='w-row'>
        <span>- {state.label}</span>
        <span onClick={() => onAddNode(state)}>+</span>
      </div>
      <div className='w-row'>
        <div className={c(s.children, 'w-col')}>
          {state.children.map((childState) => (
            <TreeNodeRecursive state={childState} onAddNode={onAddNode} />
          ))}
        </div>
      </div>
    </div>
  )
})

export default TreeNodeRecursive
