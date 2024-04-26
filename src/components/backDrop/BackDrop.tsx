import React from 'react'

interface BackDropProp {
    funcName: () => void
}

const BackDrop:React.FC<BackDropProp> = ({funcName}) => {
  return (
    <div className='backdrop' onClick={funcName}/>
  )
}

export default BackDrop