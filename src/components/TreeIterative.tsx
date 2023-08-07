import { observer } from 'mobx-react-lite'

import NodeState from './NodeState'

import TreeNodeIterative from './TreeNodeIterative'

interface Props {
  root: NodeState
  onAddNode: (nodeState: NodeState) => void
}

const TreeIterative = observer(({ root, onAddNode }: Props) => {
  const nodeElems: JSX.Element[] = []

  const stack: { state: NodeState; depth: number }[] = [{ state: root, depth: 0 }]

  while (stack.length) {
    const node = stack.shift()!
    nodeElems.push(<TreeNodeIterative state={node.state} offset={node.depth} onAddNode={onAddNode} />)

    const shallow = [...node.state.children].reverse()

    shallow.forEach((childState) => {
      stack.unshift({ state: childState, depth: node.depth + 1 })
    })
  }

  return <div className='w-col'>{nodeElems}</div>
})

export default TreeIterative
