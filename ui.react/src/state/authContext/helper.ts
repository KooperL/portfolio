import { forumPath, routes } from 'src/containers/App/types'
import { useLocation, useNavigate } from 'react-router-dom'
import { sendForumRefresh } from 'src/api/clients/forumHandler/routes/sendForumRefresh'
import { useAuth } from 'src/hooks/useAuth'
// @ts-ignore
import { v4 } from 'uuid'

function getSessionKey() {
  let itemInStorage = sessionStorage.getItem('session_id')
  if (!itemInStorage) {
    let uniqueStr = v4() ?? 'Error'
    itemInStorage = uniqueStr
    sessionStorage.setItem('session_id', uniqueStr)
  }
  return itemInStorage as string
}

function getPersistentKey() {
  let itemInStorage = localStorage.getItem('uuid')
  if (!itemInStorage) {
    let uniqueStr = v4() ?? 'Error'
    itemInStorage = uniqueStr
    localStorage.setItem('uuid', uniqueStr)
  }
  return itemInStorage as string
}

function HandleUnauthenticated() {
  // Not used due to react hook limitations
  const navigate = useNavigate()
  const location = useLocation()

  if (
    location.pathname !== `/${forumPath}/${routes.forumRegister}` ||
    location.pathname !== `/${forumPath}/${routes.forumRegister}`
  ) {
    navigate(`/${forumPath}/${routes.forumRegister}`)
  }
}

function Refresh() {
  const { authentication, trackingInformation } = useAuth()

  sendForumRefresh({
    payload: { session_id: trackingInformation.getSessionKey() },
  })
    .then(resp => {
      if (resp.data.success && resp.data.accessToken && resp.data.expires) {
        authentication.setAccessToken(resp.data.accessToken)
      } else {
        // RIP genuinely invalid
      }
    })
    .catch((err: any) => {
      authentication.setAccessToken(null)
      HandleUnauthenticated()
    })
}

export { getSessionKey, getPersistentKey, Refresh }
