import { useCallback } from 'react'
import { sendMonitor } from 'src/api/clients/ApiHandler/routes/sendMonitor'
import { getPersistentKey, getSessionKey } from 'src/state/authContext/helper'
import { useAuth } from '../useAuth'

export function useMonitor() {
  const currentPage = localStorage.getItem('currentPage')
  sendMonitor({
    payload: {
      uuid: getPersistentKey(),
      session_id: getSessionKey(),
      page: encodeURIComponent(window.location.pathname),
      prevPage: encodeURIComponent(currentPage ?? 'NULL'),
    },
  })
    .then(resp => {
      if (resp.data.success) {
        localStorage.setItem('currentPage', window.location.pathname)
        // } else {
        //   throw new Error((resp as ApiError))
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
}
