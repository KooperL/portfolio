import React from 'react'
import { lazyLoad } from '../../utils/loadable'
import Spinner from '../../components/Spinner'

export const ContactPage = lazyLoad(
  () => import('./index'),
  module => module.default,
  { fallback: <Spinner /> },
)
