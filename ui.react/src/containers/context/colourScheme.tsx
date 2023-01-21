import { useState, createContext, useContext, useEffect } from "react"
import ReactDOM from "react-dom/client"
import dark from "./dark.json"
import { Scheme } from "./type"

interface PageInformation extends Scheme {
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
    window.matchMedia("(prefers-color-scheme: dark)").matches //todo

  return (
    <SchemeContext.Provider value={scheme}>{children}</SchemeContext.Provider>
  )
}
