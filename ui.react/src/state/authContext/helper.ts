import { forumPath, routes } from "src/containers/App/types"
import { useLocation, useNavigate } from "react-router-dom"
import { sendForumRefresh } from "src/api/clients/forumHandler/routes/sendForumRefresh"
import { useAuth } from "src/hooks/useAuth"

function getSessionKey() {
  return sessionStorage.getItem('session_id') ?? 'TODO'
}

function getPersistentKey() {
  return sessionStorage.getItem('session_id') ?? 'TODO'
}

function HandleUnauthenticated() {
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
  const { authentication } = useAuth()
  
  sendForumRefresh({
    payload:
      {session_id: sessionStorage.getItem("session_id") ?? ""
      }
    }).then(resp => {
      if (resp.data.success && resp.data.accessToken && resp.data.expires) {
        authentication.setAccessToken(resp.data.accessToken)
      } else {
        // RIP genuinely invalid
      }
    }).catch((err: any) => {
      authentication.setAccessToken(null)
      HandleUnauthenticated()
    })
}


export {
  getSessionKey,
  getPersistentKey,
  Refresh
}
