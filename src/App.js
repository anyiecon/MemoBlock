import { useEffect, useState } from "react";
import Board from "./Components/Board/Board";
import '../src/Styles/Styles.css'

const emojiList = [...'🐬🐋🦚🦜🐢🐧🐤🐨🐝🦕🐙🐣']

const App = () => {
  const [MemoBlocks, setMemoBlocks] = useState([]);
  const [selectBlock, setselectBlock] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect( () => {
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setMemoBlocks(shuffledEmojiList.map( (emoji, i) => ({ index: i, emoji, flipped: false}) ));
  }, []);

  const shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const handleMemoClick = memoBlock => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...MemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setMemoBlocks(shuffledMemoBlocksCopy);
    if(selectBlock === null) {
      setselectBlock(memoBlock);
    } else if(selectBlock.emoji === memoBlock.emoji) {
      setselectBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(selectBlock.index, 1, selectBlock);
        setMemoBlocks(shuffledMemoBlocksCopy);
        setselectBlock(null);
        setAnimating(false);
      }, 1000);
    }
  }

  return (
   <>
      <div className="divtitle">
        <h1 className="title">Juega y reanima tu memoria</h1>
        <br></br>
      </div>
      <Board memoBlocks={MemoBlocks} animating={animating}  handleMemoClick={handleMemoClick} />

    </>
  );
}

export default App;