import React from 'react'
import '../../Styles/Styles.css'
import Memory from '../Memory/Memory'

export default function Board({animating, handleMemoClick, memoBlocks}) {
  return (
    <main className="board">
            {memoBlocks.map( (memoBlock, i) => {
                return <Memory key={`${i}_${memoBlock.emoji}`} animating={animating} handleMemoClick={handleMemoClick} memoBlock={memoBlock} />
            })}
    </main>
  )
}
