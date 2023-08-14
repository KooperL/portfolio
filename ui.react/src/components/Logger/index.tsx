import { useContext, useEffect, useState } from "react"
import { sendCapture } from "src/api/clients/ApiHandler/routes/sendCapture"
import { getPersistentKey, getSessionKey } from "src/state/authContext/helper"
import { LoggingResponsePayload } from "./types"

// TODO make it use the api handler

interface Props {
  capturePost: Function
}

const MatchUserAgent = () => {
  const { userAgent } = navigator
  let match =
    userAgent.match(
      /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
    ) || []
  let temp
  if (/trident/i.test(match[1])) {
    temp = /\brv[ :]+(\d+)/g.exec(userAgent) || []
    return `IE ${temp[1] || ""}`
  }
  if (match[1] === "Chrome") {
    temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/)
    if (temp !== null) {
      return temp.slice(1).join(" ").replace("OPR", "Opera")
    }
    temp = userAgent.match(/\b(Edg)\/(\d+)/)
    if (temp !== null) {
      return temp.slice(1).join(" ").replace("Edg", "Edge (Chromium)")
    }
  }
  match = match[2]
    ? [match[1], match[2]]
    : [navigator.appName, navigator.appVersion, "-?"]
  temp = userAgent.match(/version\/(\d+)/i)
  if (temp !== null) {
    match.splice(1, 1, temp[1])
  }
  return match
}

function Logger(props: Props) {
  const canvasHash = document.getElementById("canvas-hash")?.innerText ?? ""
  if (
    !localStorage.getItem("canvas-hash") ||
    localStorage.getItem("canvas-hash") !== canvasHash
  ) {
    localStorage.setItem("canvas-hash", canvasHash?.toString())
  }

  if (!sessionStorage.getItem("session_id")) {
    getSessionKey()
    // TODO
    // @ts-ignore
    const [browserVar, versionVar] = MatchUserAgent()

    props
      .capturePost({
        canvas_hash: document.getElementById("canvas-hash")?.innerText,
        uuid: getPersistentKey(),
        // windowInfo: {
        // plugins: JSON.stringify([].slice.call(navigator.plugins).map((item: any) => {
        //   return {
        //     name: item.name,
        //     filename: item.filename,
        //     description: item.description,
        //   }
        // })) ?? null,
        // window: {
        innerHeight: +window.innerHeight ?? 123,
        outerHeight: +window.outerHeight ?? 123,
        innerWidth: +window.innerWidth ?? 123,
        outerWidth: +window.outerWidth ?? 123,
        // },
        // screen: {
        actualHeight: +window.screen.height ?? 123, // window.screen might not be valid in safari
        actualWidth: +window.screen.width ?? 123,
        pixelDepth: +window.screen.pixelDepth ?? 123,
        // },
        // navigator: {
        platform: navigator.platform ?? "null",
        cookieEnabled: +navigator.cookieEnabled ?? 2,
        // 'java': navigator.javaEnabled ?? null,
        // 'online': navigator.onLine ?? null,
        // },
        // }
        darkMode:
          +window.matchMedia("(prefers-color-scheme: dark)").matches ?? 2,
        browser: browserVar ?? "null",
        version: versionVar ?? "null",
      })
      .then((resp: LoggingResponsePayload) => {
        if (resp.success) {
        } else {
          throw new Error(resp.error)
        }
      })
      .catch((err: any) => {
        console.log(err) //TODO
      })
  }
  return <></>
}

const enhance = (): JSX.Element => {
  return <Logger capturePost={sendCapture} />
}

export default enhance
