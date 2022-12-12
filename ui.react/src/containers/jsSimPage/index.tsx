import React, { useContext, useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
// @ts-ignore
import gear from "../../assets/gear.svg";
import { SchemeContext } from "../context/colourScheme";
import './style.css';



export const useEventListener = (eventName: string, handler: Function, element=window) => {
  const savedHandler = useRef<any>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: any) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};



function calcScore(arr: number[]): number {
  let score = 0;
  for(let i = 0; i<arr.length; i++) {
    switch (arr[i]) {
      case 0:
        break;
      case 1:
        score += 1;
        break;
      case 2:
        score -= 0.5;
        break;
      case 3:
        score += 0.5;
        break;
      
      default:
        break;
    }
  }
  return Math.ceil((score / arr.length)*100)
}

export default function JsSim() {
  const [typedString, setTypedString] = useState<Array<string>>([]) ;
  const [referenceString, setReferenceString] = useState<Array<string>>([]) ;
  const [referenceIndex, setReferenceIndex] = useState(0) ;
  const [scheme, setScheme] = useContext(SchemeContext);
  const [cursor, setCursor] = useState(-1);
  const [score, setScore] = useState(0);
  const [scoreTally, setScoreTally] = useState<Array<number>>([]);
  const [timer, setTimer] = useState(0);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timerIsPaused, setTimerIsPaused] = useState(true);

  const scoreColourLookup = {
    0: scheme.body.text,   // Unpicked
    1: '#347543',          // Correct
    2: '#963033',          // Incorrect
    3: '#967F30',          // Corrected **
  }
  const sentences = [
    'for (let i = 0; i < arr.length; i++) {};',
    'console.log(\'test\');',
    'function setup() {return 0}',
    '.container {display: flex; align-items: center; justify-content: center;}',
    'git add . && git commit && git push',
    '<div className="container"></div>'
  ];


  useEffect(() => {
    document.title = `JS Sim | ${scheme.title}`;
  }, []);

  function selectString(index?: number) {
    handleReset();
    setTypedString([])
    setCursor(-1)
    let newReferenceIndex = +referenceIndex;
    if(!referenceString.length) {
      newReferenceIndex = Math.floor(Math.random() * sentences.length);
    } else {
      if(index !== undefined) {
        newReferenceIndex = index
      } else {
        while (true) {
          newReferenceIndex = Math.floor(Math.random() * sentences.length);
          if(newReferenceIndex !== referenceIndex) {
            break;
          }
        }
      }
    }
    const sentence = sentences[newReferenceIndex].split('');
    setReferenceIndex(newReferenceIndex);
    setReferenceString(sentence);
    setScoreTally(new Array(sentence.length).fill(0))
    setScore(0)
  }

  useEffect(() => {
    selectString()
  }, [])

  useEffect(() => {
    let interval: any = null;
  
    if (timerIsActive && timerIsPaused === false) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerIsActive, timerIsPaused]);
  
  const handleStart = () => {
    setTimerIsActive(true);
    setTimerIsPaused(false);
  };
  
  const handlePause = () => {
    setTimerIsPaused(true);
  };
  
  const handleReset = () => {
    setTimerIsActive(false);
    setTimer(0);
  };

  useEventListener("keydown", ((e: any) => {
    e.preventDefault();
    console.log(typedString)
    console.log(typedString.length, referenceString.length)
    if(typedString.length < referenceString.length) {
      handleStart();
    
      let cursorClone = cursor
      const typedStringClone = [...typedString]
      const scoreTallyClone = [...scoreTally]
      // console.log(e.key)
      const keyType = e.key.match(/[a-zA-Z0-9 .'":&(^%$#@!*);>\-_</+=}{]/g);
      if(keyType.length === 1) {
        // console.log(keyType, e.key)
        cursorClone+=1
        typedStringClone.push(e.key.toString() !== ' ' ? e.key : '·')
        if(scoreTallyClone[cursorClone] === 0) {
          if(e.key === referenceString[cursorClone]) {
            scoreTallyClone[cursorClone] = 1
          } else {
            scoreTallyClone[cursorClone] = 2
          }
        } else {
          if(e.key === referenceString[cursorClone]) {
            scoreTallyClone[cursorClone] = 3
          } else {
            scoreTallyClone[cursorClone] = 2
          }
        }
      } else {
        if(e.key === 'Backspace') {
          scoreTallyClone[cursorClone] = 3;
          typedStringClone.pop()
          if(cursorClone > -1) {
            cursorClone-=1
          }
        }
      }
      console.log(typedStringClone)
      setTypedString(typedStringClone)
      setScoreTally(scoreTallyClone)
      setCursor(cursorClone)
      setScore(calcScore(scoreTallyClone))
      if(typedStringClone.length === referenceString.length) {
        handlePause()
      }
    } else {
      handlePause()
    }
  }));

  return (
    <div className="jsSimPage">
      <div className="parent">
        <div className="container">
          <div className="instrucions">
            <p>
              {/* <span>As a programmer, some code sequences appear more commonly than others. </span>
              <span>Some appear hilariously often. </span> */}
              <span>This is a typing challenge which measures how long it takes to write these sequences. </span>
              <span>Timer appears as soon as you press a key. </span>
            </p>
            <p>
              <span>Good luck 🏁</span>
              </p>
          </div>
          <hr/>
          <div className="info">
            <div className="timer">
              <span className="digits">
                {("0" + Math.floor((timer / 60000) % 60)).slice(-2)}:
              </span>
              <span className="digits">
                {("0" + Math.floor((timer / 1000) % 60)).slice(-2)}.
              </span>
              <span className="digits mili-sec">
                {("0" + ((timer / 10) % 100)).slice(-2)}
              </span>
            </div>
            <div>{score}%</div>
          </div>
          <div className="string">
            {referenceString.map((char, index) => (
              // @ts-ignore
              <span key={index} style={{color: typedString[index] ? scoreColourLookup[scoreTally[index]] : scoreColourLookup[0]}}>{typedString[index] ?? char}</span>
            ))}
          </div>
          <div className="buttons">
            <button className="button" style={{backgroundColor: scheme.button.bgSolid}} onClick={(e) => {selectString(referenceIndex)}}>reset</button>
            <button className="button" style={{backgroundColor: scheme.button.bgSolid}} onClick={(e) => {selectString()}}>new</button>
          </div>
        </div>
      </div>
    </div>
  )
} 





