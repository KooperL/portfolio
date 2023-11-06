import { useState, createContext, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import dark from './dark.json'
import { Scheme } from './type'

export interface PageInformation extends Scheme {
  title: string
}

type handle = [PageInformation, Function]

const pageInformation = {
  ...dark,
  title: "Kooper's react app",
}

export const SchemeContext = createContext<handle>([pageInformation, () => {}])

export function SchemeSettings({ children }: any) {
  const scheme = useState(pageInformation)
  document.body.style.background = scheme[0].body.background
  document.body.style.color = scheme[0].body.text
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches //todo

  // document.documentElement.setAttribute("style", "--main-background-color: green");
  // document.documentElement.style.cssText = "--main-background-color: red";
  document.documentElement.style.setProperty('--color-background', '#112B3C')
  document.documentElement.style.setProperty('--color-foreground', '#205375')
  document.documentElement.style.setProperty('--color-text', '#F2F2F2')
  document.documentElement.style.setProperty('--color-accent', '#F66B0E')

  return (
    <SchemeContext.Provider value={scheme}>{children}</SchemeContext.Provider>
  )
}
