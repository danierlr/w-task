import { makeAutoObservable, observable } from 'mobx'
import { observer } from 'mobx-react-lite'

import NodeState from './NodeState'

import mockTree from './mockTree'

export default class AppState {
  constructor() {
    makeAutoObservable(this, {
      root: observable.ref,
      appendedNode: observable.ref,
    })

    this.appendNode = this.appendNode.bind(this)
    this.showAddNodeDialog = this.showAddNodeDialog.bind(this)
  }

  root: NodeState = mockTree
  appendedNode: NodeState | null = null

  showAddNodeDialog(appendedNode) {
    this.appendedNode = appendedNode
  }

  appendNode(label: string) {
    if (!this.appendedNode) {
      console.error('No node is being appended to')
      return
    }

    const newChild = new NodeState(label)
    this.appendedNode!.children.push(newChild)
    this.appendedNode = null
  }
}
