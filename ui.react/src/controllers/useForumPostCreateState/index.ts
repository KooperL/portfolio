import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { endpoints } from "../../containers/App/api/endpoints"
import { forumPath } from "../../containers/App/api/types"
import { useAccessToken } from "../../containers/authContext/context"
import { SchemeContext } from "../../containers/context/colourScheme"
import {
  ForumPostCreatePOSTPayload,
  ForumPostCreatePOSTResponse,
} from "../../containers/forumPostCreatePage/types"
import { usePost } from "../../hooks/usePost"

export const useForumPostCreateState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  // const [token, setToken] = useContext(AccessToken);
  const [token, setToken] = useAccessToken()
  const navigate = useNavigate()
  const [body, setBody] = useState("")
  const [title, setTitle] = useState("")
  const [hasPosted, setHasPosted] = useState(false)

  const { state, post } = usePost<
    ForumPostCreatePOSTPayload,
    ForumPostCreatePOSTResponse
  >(() => {
    setHasPosted(true)
  })

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    data: ForumPostCreatePOSTPayload,
  ) => {
    e.preventDefault()
    post({
      endpoint: endpoints["forumPostCreate"],
      authBearer: token ?? "",
      data,
    })
  }

  useEffect(() => {
    document.title = `Forum Create | ${scheme.title}`
  }, [])

  useEffect(() => {
    if (hasPosted) {
      navigate(`/${forumPath}/post/${state?.details?.data?.forumPostId}`)
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
