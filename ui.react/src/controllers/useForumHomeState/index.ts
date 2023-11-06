import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SchemeContext } from '../../state/colorScheme/colourScheme'
import Redirect from '../../components/Redirect'
import { useFetch } from 'src/hooks/useFetch'
import { fetchForumHome } from 'src/api/clients/forumHandler/routes/fetchForumHome'
import { routes } from 'src/api/clients/forumHandler/types'
import { forumPath, genericApiDataResponse } from 'src/api/shared/types'
import {
  ForumHomeRequestPayload,
  ForumHomeResponsePayload,
} from 'src/api/clients/forumHandler/routes/fetchForumHome/types'
import { useAuth } from 'src/hooks/useAuth'

export const useForumHomeState = () => {
  const [searchState, setSearchState] = useState('')
  // const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [scheme, setScheme] = useContext(SchemeContext)
  const { authentication, trackingInformation } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  let paramString = window.location.href.split('?')[1]
  let queryString = new URLSearchParams(paramString)

  const { state, pull: post } = useFetch<
    ForumHomeRequestPayload,
    genericApiDataResponse<ForumHomeResponsePayload>
  >()

  useEffect(() => {
    if (!authentication.accessToken) {
      // HandleUnauthenticated()
      navigate(`/${forumPath}/${routes.forumLogin}`)
    }
    post({
      ApiImpl: fetchForumHome,
      auth: authentication.accessToken as string,
      payload: {
        session_id: trackingInformation.getSessionKey(),
        ...(queryString && { category: queryString.get('category') }),
        ...(queryString && { search: queryString.get('search') }),
      },
    })
  }, [authentication, location])

  const handleSubmit = () => {
    navigate(`/${forumPath}?search=${searchState}`)
  }

  useEffect(() => {
    document.title = `Forum Home | ${scheme.title}`
  }, [])

  return {
    scheme,
    authentication,
    trackingInformation,
    handleSubmit,
    state,
    searchState,
    setSearchState,
  }
}
