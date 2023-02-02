import React from "react"
import { lazyLoad } from "../../utils/loadable"
import Spinner from "@components/Spinner"

export const ForumPostViewPage = lazyLoad(
  () => import("./index"),
  module => module.default,
  { fallback: <Spinner /> },
)
