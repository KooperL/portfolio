import { useEffect, useRef } from "react"

export const useEventListener = (
  eventName: string,
  handler: Function,
  element = window,
) => {
  const savedHandler = useRef<any>()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const eventListener = <T = keyof WindowEventMap>(event: T) =>
      savedHandler.current(event)
    element.addEventListener(eventName, eventListener)
    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}
