import { observer } from 'mobx-react-lite'

import c from 'utils/c'

import TreeNodeRecursive from './TreeNodeRecursive'
import NodeState from './NodeState'
import Tree from './Tree'

// @ts-ignore
import s from './TreeRecursive.m.scss'

interface Props {
  root: NodeState
  onAddNode: (nodeState: NodeState) => void
}

const TreeRecursive = observer(({ root, onAddNode }: Props) => {
  return <TreeNodeRecursive state={root} onAddNode={onAddNode} />
})

export default TreeRecursive
