import { makeAutoObservable, observable } from 'mobx'
import { observer } from 'mobx-react-lite'

import Tree from './Tree'

export default class NodeState implements Tree<NodeState> {
  constructor(public label: string = '') {
    makeAutoObservable(this, {
      children: observable.shallow,
    })
  }

  children: NodeState[] = []
}
