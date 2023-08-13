import { forumPath, routes } from "src/containers/App/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendForumPostCreate } from "src/api/clients/forumHandler/routes/sendPostCreate"
import { ForumPostCreateRequestPayload, ForumPostCreateResponsePayload } from "src/api/clients/forumHandler/routes/sendPostCreate/types"
import { useFetch } from "src/hooks/useFetch"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import { useAuth } from "src/hooks/useAuth"
import { genericApiDataResponse } from "src/api/shared/types"


export const useForumPostCreateState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const navigate = useNavigate()
  const [body, setBody] = useState("")
  const [title, setTitle] = useState("")
  const [hasPosted, setHasPosted] = useState(false)
  const { state, pull: post } = useFetch<
    ForumPostCreateRequestPayload,
    genericApiDataResponse<ForumPostCreateResponsePayload> 
  >()
  const { authentication } = useAuth() 

  useEffect(() => {
    if (!authentication.accessToken) {
      // HandleUnauthenticated()
      navigate(`/${forumPath}/${routes.forumRegister}`)
    }
  }, [authentication])

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    data: ForumPostCreateRequestPayload,
  ) => {
    e.preventDefault()
    post({
      ApiImpl: sendForumPostCreate,
      auth: authentication.accessToken as string,
      payload: data,
      callback: () => setHasPosted(true)
    })
  }

  useEffect(() => {
    document.title = `Forum Create | ${scheme.title}`
  }, [])

  useEffect(() => {
    if (hasPosted) {
      navigate(`/${forumPath}/${routes.forumPostView}/${state?.details?.data?.forumPostId ?? 1}`)
    }
  }, [hasPosted])

  return {
    scheme,
    authentication,
    state,
    body,
    setBody,
    title,
    setTitle,
    handleSubmit,
  }
}
