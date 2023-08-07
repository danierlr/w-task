import NodeState from './NodeState'

const words = 'Lorem ipsum dolor consectetur adipiscing elit eiusmod tempor incididunt labore dolore magna aliqua'

const nodes: Record<string, NodeState> = {}

words.split(' ').forEach((word) => {
  const state = new NodeState(word)
  nodes[word] = state
})

const root = nodes['Lorem']!

root.children.push(nodes['ipsum']!, nodes['adipiscing']!, nodes['incididunt']!, nodes['labore']!)
nodes['ipsum']!.children.push(nodes['dolor']!)
nodes['dolor']!.children.push(nodes['consectetur']!)
nodes['adipiscing']!.children.push(nodes['elit']!)
nodes['adipiscing']!.children.push(nodes['eiusmod']!)
nodes['elit']!.children.push(nodes['tempor']!)
nodes['labore']!.children.push(nodes['dolore']!)
nodes['dolore']!.children.push(nodes['magna']!)

export default root
