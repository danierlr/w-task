import { useState } from 'react'

interface Props {
  parentName: string
  onAddNode: (label: string) => void
}

export default ({ onAddNode, parentName }: Props) => {
  const [label, setLabel] = useState('')

  return (
    <div className='w-row'>
      <span>Label child to {parentName}:</span>
      <input value={label} onChange={(event) => setLabel(event.target.value)} />
      <button onClick={() => onAddNode(label)}>add</button>
    </div>
  )
}
