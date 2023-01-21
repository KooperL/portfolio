import React from "react"
import { lazyLoad } from "../../utils/loadable"
import Spinner from "../Spinner"

export const Logger = lazyLoad(
  () => import("./index"),
  module => module.default,
  { fallback: <Spinner /> },
)
