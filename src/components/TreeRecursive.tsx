import { observer } from 'mobx-react-lite'

import TreeNodeRecursive from './TreeNodeRecursive'
import NodeState from './NodeState'

interface Props {
  root: NodeState
  onAddNode: (nodeState: NodeState) => void
}

const TreeRecursive = observer(({ root, onAddNode }: Props) => {
  return <TreeNodeRecursive state={root} onAddNode={onAddNode} />
})

export default TreeRecursive
