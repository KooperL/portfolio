import { useContext, useEffect, useState } from "react"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useEventListener } from "../../hooks/useEventListener"

function calcScore(arr: number[]): number {
  let score = 0
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case 0:
        break
      case 1:
        score += 1
        break
      case 2:
        score -= 0.5
        break
      case 3:
        score += 0.5
        break

      default:
        break
    }
  }
  return Math.ceil((score / arr.length) * 100)
}

export const useJssimState = () => {
  const [typedString, setTypedString] = useState<Array<string>>([])
  const [referenceString, setReferenceString] = useState<Array<string>>([])
  const [referenceIndex, setReferenceIndex] = useState(0)
  const [scheme, setScheme] = useContext(SchemeContext)
  const [cursor, setCursor] = useState(-1)
  const [score, setScore] = useState(0)
  const [scoreTally, setScoreTally] = useState<Array<number>>([])
  const [timer, setTimer] = useState(0)
  const [timerIsActive, setTimerIsActive] = useState(false)
  const [timerIsPaused, setTimerIsPaused] = useState(true)

  const scoreColourLookup: { [key: string]: string } = {
    "0": scheme.body.text, // Unpicked
    "1": "#347543", // Correct
    "2": "#963033", // Incorrect
    "3": "#967F30", // Corrected **
  }
  const sentences = [
    "for (let i = 0; i < arr.length; i++) {};",
    "console.log('test');",
    "function setup() {return 0}",
    ".container {display: flex; align-items: center; justify-content: center;}",
    "git add . && git commit && git push",
    '<div className="container"></div>',
  ]

  useEffect(() => {
    document.title = `JS Sim | ${scheme.title}`
  }, [])

  function selectString(index?: number) {
    handleReset()
    setTypedString([])
    setCursor(-1)
    let newReferenceIndex = +referenceIndex
    if (!referenceString.length) {
      newReferenceIndex = Math.floor(Math.random() * sentences.length)
    } else {
      if (index !== undefined) {
        newReferenceIndex = index
      } else {
        while (true) {
          newReferenceIndex = Math.floor(Math.random() * sentences.length)
          if (newReferenceIndex !== referenceIndex) {
            break
          }
        }
      }
    }
    const sentence = sentences[newReferenceIndex].split("")
    setReferenceIndex(newReferenceIndex)
    setReferenceString(sentence)
    setScoreTally(new Array(sentence.length).fill(0))
    setScore(0)
  }

  useEffect(() => {
    selectString()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (timerIsActive && timerIsPaused === false) {
      interval = setInterval(() => {
        setTimer(timer => timer + 10)
      }, 10)
    } else {
      if (interval) clearInterval(interval)
      interval = null
    }
    return () => {
      if (interval) clearInterval(interval)
      interval = null
    }
  }, [timerIsActive, timerIsPaused])

  const handleStart = () => {
    setTimerIsActive(true)
    setTimerIsPaused(false)
  }

  const handlePause = () => {
    setTimerIsPaused(true)
  }

  const handleReset = () => {
    setTimerIsActive(false)
    setTimer(0)
  }

  useEventListener("keydown", (e: KeyboardEvent) => {
    e.preventDefault()
    console.log(typedString)
    console.log(typedString.length, referenceString.length)
    if (typedString.length < referenceString.length) {
      handleStart()

      let cursorClone = cursor
      const typedStringClone = [...typedString]
      const scoreTallyClone = [...scoreTally]
      // console.log(e.key)
      const keyType = e.key.match(/[a-zA-Z0-9 .'":&(^%$#@!*);>\-_</+=}{]/g)
      if (keyType && keyType.length === 1) {
        // console.log(keyType, e.key)
        cursorClone += 1
        typedStringClone.push(e.key.toString() !== " " ? e.key : "·")
        if (scoreTallyClone[cursorClone] === 0) {
          if (e.key === referenceString[cursorClone]) {
            scoreTallyClone[cursorClone] = 1
          } else {
            scoreTallyClone[cursorClone] = 2
          }
        } else {
          if (e.key === referenceString[cursorClone]) {
            scoreTallyClone[cursorClone] = 3
          } else {
            scoreTallyClone[cursorClone] = 2
          }
        }
      } else {
        if (e.key === "Backspace") {
          scoreTallyClone[cursorClone] = 3
          typedStringClone.pop()
          if (cursorClone > -1) {
            cursorClone -= 1
          }
        }
      }
      console.log(typedStringClone)
      setTypedString(typedStringClone)
      setScoreTally(scoreTallyClone)
      setCursor(cursorClone)
      setScore(calcScore(scoreTallyClone))
      if (typedStringClone.length === referenceString.length) {
        handlePause()
      }
    } else {
      handlePause()
    }
  })

  return {
    timer,
    setTimer,
    score,
    referenceString,
    referenceIndex,
    typedString,
    selectString,
    scoreColourLookup,
    scoreTally,
    scheme,
  }
}
