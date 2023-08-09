import { forumPath, routes } from "src/containers/App/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendForumPostCreate } from "src/api/clients/forumHandler/routes/sendPostCreate"
import { ForumPostCreateRequestPayload, ForumPostCreateResponsePayload } from "src/api/clients/forumHandler/routes/sendPostCreate/types"
import { useFetch } from "src/hooks/useFetch"
import { useAccessToken } from "../../containers/authContext/context"
import { SchemeContext } from "../../containers/context/colourScheme"


export const useForumPostCreateState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  // const [token, setToken] = useContext(AccessToken);
  const [token, setToken] = useAccessToken()
  const navigate = useNavigate()
  const [body, setBody] = useState("")
  const [title, setTitle] = useState("")
  const [hasPosted, setHasPosted] = useState(false)

  const { state, pull: post } = useFetch<
    ForumPostCreateRequestPayload,
    ForumPostCreateResponsePayload 
  >(
  //  () => {
  //  setHasPosted(true)
  //}
  )

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    data: ForumPostCreateRequestPayload,
  ) => {
    e.preventDefault()
    post({
      ApiImpl: sendForumPostCreate,
      auth: token ?? "",
      payload: data,
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
    token,
    state,
    body,
    setBody,
    title,
    setTitle,
    handleSubmit,
  }
}
