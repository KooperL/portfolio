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



export default function JsSim() {
  const [inputString, setInputString] = useState<Array<string>>([]) ;
  const [typedString, setTypedString] = useState<Array<string>>([]) ;
  const [referenceString, setReferenceString] = useState<Array<string>>([]) ;
  const [scheme, setScheme] = useContext(SchemeContext);
  const [strokesRemaining, setStrokesRemaining] = useState(0);
  const [cursor, setCursor] = useState(-1);
  const [scoreTally, setScoreTally] = useState<Array<number>>([]);
  const [timer, setTimer] = useState(0);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timerIsPaused, setTimerIsPaused] = useState(true);

  const scoreColourLookup = {
    0: scheme.body.text,   // Unpicked
    1: '#347543',   // Correct
    2: '#963033',   // Incorrect
    3: '#967F30',   // Corrected **
  }

  useEffect(() => {
    const sentences = ['for (let i = 0; i < arr.length; i++) {};'];
    const sentence = sentences[0].split('');
    setReferenceString(sentence);
    setScoreTally(new Array(sentence.length).fill(0))
    setStrokesRemaining(sentence.length);
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
    if(typedString.length < referenceString.length-1) {
      handleStart();
    
      let cursorClone = cursor
      const typedStringClone = [...typedString]
      const scoreTallyClone = [...scoreTally]
      // console.log(e.key)
      const keyType = e.key.match(/[a-zA-Z0-9 .'":();<+=}{]/g);
      if(keyType.length === 1) {
        cursorClone+=1
        typedStringClone.push(e.key.toString())
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
          if(cursorClone > 0) {
            cursorClone-=1
          }
        }
      }
      setScoreTally(scoreTallyClone)
      setTypedString(typedStringClone)
      setCursor(cursorClone)
    } else {
      handlePause()
    }
  }));

  useEffect(() => {
    if(strokesRemaining <= 0) {
      handlePause();
    }
  }, [inputString])

  return (
    <div className="parent">
      <div className="container">
        <div className="instrucions"><p>This is a description of how the game will work</p></div>
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
        <div className="string">
          {referenceString.map((char, index) => (
            // @ts-ignore
            <span key={index} style={{color: typedString[index] ? scoreColourLookup[scoreTally[index]] : scoreColourLookup[0]}}>{typedString[index] ?? char}</span>
          ))}
        </div>
      </div>
    </div>
  )
} 





