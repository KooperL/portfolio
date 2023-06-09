import { fetchCMSData } from "@containers/App/api/genericCMSApi"
import { cmsData, CmsEndpoints } from "@containers/App/api/types"
import { useContext, useEffect, useRef, useState } from "react"
import {
  AboutInitialState,
  AboutPayload,
} from "../../containers/aboutPage/types"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "../../hooks/useFetch"
import { useSubmit } from "../../hooks/useSubmit"
import { State } from "../../types/State"
// @ts-ignore
import dna from "./dna.txt"

function newSeed(arrs: number, length: number, width: number) {
  let arr = new Array(arrs)
  let arrLength = new Array(length)
  let arrWidth = new Array(width)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = [...arrLength]
    for (let y = 0; y < arrLength.length; y++) {
      arr[i][y] = [...arrWidth]
      for (let x = 0; x < arrWidth.length; x++) {
        arr[i][y][x] = Math.ceil(Math.random() * 10)
      }
    }
  }
  // arr = arr.map((subArr) => subArr.map(() => Math.ceil(Math.random()*10)))
  return arr
}

export const useAboutState = () => {
  // const [seed, setSeed] = useState<Array<Array<Array<number>>>>([]);
  // const [text, setText] = useState<Array<Array<number>>>([[]]);
  const [scheme, setScheme] = useContext(SchemeContext)
  // let state: State<AboutPayload>;

  const { state: stateCMS, pull } = useFetch<keyof CmsEndpoints, cmsData[]>(fetchCMSData)

  useEffect(() => {
    document.title = `About | ${scheme.title}`
    pull('aboutCms')
    
    fetch(dna)
      .then(r => r.text())
      .then(textRaw => {
        // setText(textRaw.split('\n').map(item => item.split('').map(item => +item)));
      })
  }, [])

  // useEffect(() => {
  //   setSeed(newSeed(3, text.length, text[0].length))
  // }, [text])

  // useEffect(() => {
  //   if(!(window.outerWidth > 1000)) {return}
  //     setTimeout(() => {
  //       if(seed.length) {
  //         let newSeed = seed
  //         const last = newSeed.pop() ?? [[0]]
  //         setSeed([last, ...newSeed])
  //     }
  //   }, 100)
  // }, [seed])

  return {
    stateCMS,
    scheme,
  }
}
