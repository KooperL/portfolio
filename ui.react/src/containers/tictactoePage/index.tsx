import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
// @ts-ignore
import gear from "../../assets/gear.svg";
import { Board, CalculateWinner } from "./types";

const x = '❌';
const o = '🟢';

const inverse = {
  '❌': o,
  '🟢': x,
}

function miniMax(board: Board, depth: number, isMaximising: boolean, symbol: string) {
  // console.log(board, depth, isMaximising, symbol)
  const scores = {
    A: 1,
    B: -1,
    draw: 0
  }

  let result = calculateWinner(board);
  if(result[0] !== '') {
    if(result[0] === 'draw') {
      return scores['draw'];
    } else if(result[0] === o) {
      return scores['A'];
    } else if(result[0] === x) {
      return scores['B'];
    }
  }
  if(isMaximising) {
    let bestScore = -Infinity;
    if(depth>10) {
      return bestScore
    }
    for(let i=0;i<board.length;i++) {
      if(board[i] == undefined) {
        let potentialBoard: Board = [...board];
        potentialBoard[i] = symbol;
      // @ts-ignore
        let score = miniMax(potentialBoard, depth+1, false, inverse[symbol]);
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {    // P1 simulation
    let bestScore = Infinity;
    if(depth>10) {
      return bestScore
    }
    for(let i=0;i<board.length;i++) {
      if(board[i] == undefined) {
        let potentialBoard = [...board];
        potentialBoard[i] = symbol;
      // @ts-ignore
        let score = miniMax(potentialBoard, depth+1, true, inverse[symbol]);
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

const computerP2 = (boardCopy: Board, mode: number, symbol: string) => {
  if(mode === 1) {
    let choice: number;
    while(true) {
      choice = Math.random() * 9;
      if(boardCopy[choice]==undefined) {break;}
    }
    boardCopy[choice] = symbol;
  } else if(mode === 0) {
    let bestScore = -Infinity;
    let bestMove: number;
    for(let i=0;i<boardCopy.length;i++) {
     if(boardCopy[i] == undefined) {
      let potentialBoard: Board = [...boardCopy];
      potentialBoard[i] = symbol;
      console.log(`passing ${symbol}`)
      // @ts-ignore
      let score = miniMax(potentialBoard, 0, false, inverse[symbol]);  //max false is p1 turn
      if(score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
     }
    };
      // @ts-ignore
    boardCopy[bestMove] = symbol;
  }
  return boardCopy;
};



function calculateWinner(board: Board): CalculateWinner {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (!!board[a] && board[a] === board[b] && board[a] === board[c]) {
      // @ts-ignore
      return [board[a], lines[i]];
    }
    if(!board.some(elem => elem==undefined)) {
      return ['draw', [NaN, NaN, NaN]]
    }
  }
  return ['', [NaN, NaN, NaN]];
}

export default function Tictactoe() {
  // const search = useLocation().search;
  // const parsed = search.match(/[?|&][a-zA-Z]+=[0-9]/gi);
  // const params = {};
  // for(let i=0;i<parsed.length;i++) {
  //   const [key, val] = parsed[i].split('=')
  //   params[key.replace(/^[?|&]/gi, '').toLowerCase()] = val
  // }

  const [board, setBoard] = useState(new Array(9).fill(undefined));
  const [ticker, setTicker] = useState(0);
  const [winner, setWinner] = useState<undefined | CalculateWinner>(undefined);
  const [mode, setMode] = useState(0);
  const [pPlayerFirst, setPPlayerFirst] = useState(1);
  const [pPlayerWins, setPPlayerWins] = useState(0);
  const [sPlayerWins, setSPlayerWins] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);

  const p1 = pPlayerFirst?x:o;
  const p2 = pPlayerFirst?o:x;


  const newGame = (() => {
    let board = new Array(9).fill(undefined);
    setWinner(undefined);
    setGameInProgress(false);
    if(!pPlayerFirst){
      setBoard(computerP2(board, 1, p1));
    } else {
      setBoard(board);
      setTicker(0);
    }
    // setSPlaterWins();
  })

  useEffect(() => {
    const t = ticker;
    if(t == 0 && pPlayerFirst == 0 && mode != 2) {
      const firstBoard = computerP2([...board], 1, p2);
      setBoard(firstBoard);
      setTicker(0);
    }
    const outcome = calculateWinner(board);
    if(outcome[0]) {
      setWinner(outcome);
      setGameInProgress(false);
      if(outcome[0] == x) {
        let wins = pPlayerWins;
        setPPlayerWins(wins+1)
      } else if(outcome[0] == o) {
        let wins = sPlayerWins
        setSPlayerWins(wins+1)
      }
    }
  }, [ticker])


  const handleClick = (BoardIndex: number) => {
    setGameInProgress(true);
    let boardCopy = [...board];

    if(boardCopy[BoardIndex] === undefined) {
      let t = ticker;
      boardCopy[BoardIndex] = (t % 2) ? p2 : p1;
      t += 1;
      if(!calculateWinner(boardCopy)[0]) {

        if(mode != 2) {

          boardCopy = computerP2(boardCopy, mode, p2);
          t += 1;
        }
      }
      setBoard(boardCopy);
      setTicker(t);
    }
  };


  if(winner==undefined) {
    return (
      <div className="w-screen h-screen">
        <div className="w-50% h-1/2">
          <div className="flex justify-center mt-5">
            <Modal
              textSmall={(() => {return <img src={gear} alt={gear} style={{ width: '20px', }}></img>})()}
              text={() => {return (
                <div>
                  <div className="p-2 w-fill">
                    <p>Secondary player: </p>
                    <input type="radio" id="mode" name="mode" disabled={gameInProgress?true:false} value="2" checked={mode===2?true:false} onChange={(e) => {setMode(2)}}/>
                    <label className='pl-2' htmlFor="mode"></label>Human<br/>
                    <input type="radio" id="mode" name="mode" disabled={gameInProgress?true:false} value="1" checked={mode===1?true:false} onChange={(e) => {setMode(1)}}/>
                    <label className='pl-2' htmlFor="mode"></label>Randomiser<br/>
                    <input type="radio" id="mode" name="mode" disabled={gameInProgress?true:false} value="0" checked={mode===0?true:false} onChange={(e) => {setMode(0)}}/>
                    <label className='pl-2' htmlFor="mode"></label>miniMax<br/>
                  </div>
                  <div className="p-2 w-fill">
                    <input type="checkbox" id="inputtype" name="fav_language" value="s" checked={pPlayerFirst?true:false} disabled={gameInProgress?true:false} onChange={(e) => {setPPlayerFirst(pPlayerFirst?0:1);setTicker(0);}}/>
                    <label className='pl-2' htmlFor="inputtype">Primary player first?</label><br/>
                  </div>
                </div>
              )}}>
            </Modal>
          </div>
          <div className="grid grid-cols-3 gap-0.5 bg-gray-700 m-10 border-solid border-2 border-black rounded">
            {board.map((square, i) => (
              <div key={i} className="flex items-center justify-center w-fill h-fill border-solid border-2 border-sky-500 rounded bg-white hover:bg-gray-100 hover:rounded-lg" >
                <button className={`p-4 py-5 w-full h-full text-${square?'black':'white'}`} onClick={() => handleClick(i)}>{square?square:'(empty)'}</button>
              </div>
            ))}
          </div>
          <div>
            <div>
              <div className="flex justify-evenly tracking-widest">
                <div className="p-5 text-xl text-right">
                  <p>{x}'s wins</p>
                  <p>... {pPlayerWins}</p>
                </div>
                <div>
                  <button className="py-5 px-7 border rounded-lg bg-gray-200" onClick={(e => {newGame()})}><p>Reset board</p></button>
                </div>
                <div className="p-5 text-xl text-left">
                  <p>{o}'s wins</p>
                  <p>{sPlayerWins} ...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="w-screen h-screen">
        <div className="w-50% h-1/2">
          <div className="flex justify-center mt-5">
            <Modal
              textSmall={(() => {return <img src={gear} alt={gear} style={{ width: '20px', }}></img>})()}
              text={() => {return (
                <div>
                  <div className="p-2 w-fill">
                    <p>Secondary player: </p>
                    <input type="radio" id="mode" name="mode" disabled={gameInProgress?true:false} value="2" checked={mode===2?true:false} onChange={(e) => {setMode(2)}}/>
                    <label className='pl-2' htmlFor="mode"></label>Human<br/>
                    <input type="radio" id="mode" name="mode" disabled={gameInProgress?true:false} value="1" onChange={(e) => {setMode(1)}}/>
                    <label className='pl-2' htmlFor="mode"></label>Randomiser<br/>
                    <input type="radio" id="mode" name="mode" disabled={gameInProgress?true:false} value="0" onChange={(e) => {setMode(0)}}/>
                    <label className='pl-2' htmlFor="mode"></label>miniMax<br/>
                  </div>
                  <div className="p-2 w-fill">
                    <input type="checkbox" id="inputtype" name="fav_language" value="s" checked={pPlayerFirst?true:false} disabled={gameInProgress?true:false} onChange={(e) => {setPPlayerFirst(pPlayerFirst?0:1);setTicker(0);}}/>
                    <label className='pl-2' htmlFor="inputtype">Primary player first?</label><br/>
                  </div>
                </div>
              )}}>
            </Modal>
          </div>
          <div className="grid grid-cols-3 gap-0.5 bg-gray-700 m-10 border-solid border-2 border-black rounded">
            {board.map((square, i) => (
              <div key={i} className={`flex items-center justify-center w-fill h-fill border-solid border-2 border-sky-500 rounded ${winner[1].includes(i)?'bg-green-200':'bg-white'} ${winner[1].includes(i)?'hover:bg-green-100':'hover:bg-gray-200'} hover:rounded-lg`} >
                <button className={`p-4 py-5 w-full h-full text-${square?'black':'white'}`} onClick={() => handleClick(i)}>{square?square:'(empty)'}</button>
              </div>
            ))}
          </div>
          <div>
            <div>
              <div className="flex justify-evenly tracking-widest">
                <div className="p-5 text-xl text-right">
                  <p>{x}'s wins</p>
                  <p>... {pPlayerWins}</p>
                </div>
                <div>
                  <button className="py-5 px-7 border rounded-lg bg-gray-200" onClick={(e => {newGame()})}><p>Reset board</p></button>
                </div>
                <div className="p-5 text-xl text-left">
                  <p>{o}'s wins</p>
                  <p>{sPlayerWins} ...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}





