// https://github.com/Nooruddin-code/english-words-Json/blob/master/words_dictionary.json

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { endpoints } from "../../containers/App/api/endpoints"
import { postForumRegister } from "../../containers/App/api/forumApis"
import { forumPath } from "../../containers/App/api/types"
import { useAccessToken } from "../../containers/authContext/context"
import { SchemeContext } from "../../containers/context/colourScheme"
import {
  ForumLoginPOSTPayload,
  ForumLoginPOSTResponse,
  ForumRegisterPOSTPayload,
  ForumRegisterPOSTResponse,
} from "../../containers/forumLoginPage/types"
import { usePost } from "../../hooks/usePost"
import { useSubmit } from "../../hooks/useSubmit"

declare global {
  interface PasswordCredentialConstructor extends PasswordCredential {
    new ({}: PasswordCredential): PasswordCredential
  }
  interface PasswordCredential {
    id: string
    password: string
  }
  const PasswordCredential: PasswordCredentialConstructor
}

function generateUsername() {
  const adjectives = ["happy", "exciting", "adorable", "clever", "elegant"]
  const nouns = [
    "otter",
    "penguin",
    "unicorn",
    "rainbow",
    "puppy",
    "student",
    "youtuber",
  ]
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${randomAdjective}_${randomNoun}${new Array(2)
    .fill(0)
    .map(_ => Math.floor(Math.random() * 10))
    .join("")}`
}

function generatePassword(length: number) {
  return Math.random().toString(16).substr(2, length)
}

export const useForumLoginState = () => {
  const [usernameLogin, setUsernameLogin] = useState("")
  const [passwordLogin, setPasswordLogin] = useState("")
  const [usernameRegister, setUsernameRegister] = useState("")
  const [passwordRegister, setPasswordRegister] = useState("")
  const [hasRegistered, setHasRegistered] = useState(false)

  const [scheme, setScheme] = useContext(SchemeContext)
  // const [token, setToken] = useContext(AccessToken);
  const [token, setToken] = useAccessToken()
  const navigate = useNavigate()
  // useAccessToken()

  const encodedLogin = btoa(`${usernameLogin}:${passwordLogin}`)
  const encodedRegister = btoa(`${usernameRegister}:${passwordRegister}`)


  const { state, post: postRegister } = usePost<
    ForumRegisterPOSTPayload,
    ForumRegisterPOSTResponse
  >(() => {
    setHasRegistered(true)

    if (window.hasOwnProperty("PasswordCrediential")) {
      let c = new PasswordCredential({
        id: usernameRegister,
        password: passwordRegister,
      })
      navigator.credentials.create(c as any)
    }
  })
  const { state: POSTState, post: postLogin } = usePost<
    ForumLoginPOSTPayload,
    ForumLoginPOSTResponse
  >((e) => {
    setToken(e.accessToken ?? "")
    if (window.hasOwnProperty("PasswordCrediential")) {
      let c = new PasswordCredential({
        id: usernameLogin,
        password: passwordLogin,
      })
      navigator.credentials.create(c as any)
    }
  })

  useEffect(() => {
    if (!hasRegistered) {
      setUsernameRegister(generateUsername())
      setPasswordRegister(generatePassword(16))
    }
  }, [])


  useEffect(() => {
    if (hasRegistered) {
      setUsernameLogin(usernameRegister)
      setPasswordLogin(passwordRegister)
      setHasRegistered(hasRegistered)
    }
  }, [hasRegistered])

  useEffect(() => {
    if (POSTState.details && POSTState.details.success) {
      console.log('nav about to be called')
      navigate(`/${forumPath}`)
      console.log("called")
    }
  }, [POSTState])



  const handleSubmitRegister = (
    e: React.FormEvent<HTMLFormElement>,
    data: ForumRegisterPOSTPayload,
  ) => {
    e.preventDefault()
    if (hasRegistered) return
    postRegister({
      endpoint: endpoints["forumRegister"],
      authBasic: encodedRegister,
      data,
    })
  }

  const handleSubmitLogin = (
    e: React.FormEvent<HTMLFormElement>,
    data: ForumLoginPOSTPayload,
  ) => {
    e.preventDefault()
    // if (hasRegistered) return
    postLogin({
      endpoint: endpoints["forumLogin"],
      authBasic: encodedLogin,
      data,
    })
  }

  // const handleSubmitLogin = (
  //   event: React.FormEvent<HTMLFormElement>,
  //   payload: ForumLoginPOSTPayload,
  //   authToken: string,
  // ) => {
  //   setPOSTState({ ...POSTstate, loading: true })
  //   event.preventDefault()
  //   props
  //     .dataPostLogin(payload, authToken)
  //     .then((resp: ForumLoginPOSTResponse) => {
  //       if (resp.success) {
  //         setPOSTState({
  //           details: resp,
  //           error: false,
  //           errorMessage: null,
  //           loading: false,
  //         })
  //         // add auth token to context
  //         setToken(resp.accessToken ?? "")
  //         navigate(`/${forumPath}`)
  //       } else {
  //         throw new Error(resp.error)
  //       }
  //     })
  //     .catch((err: any) => {
  //       console.log(err)
  //       setPOSTState({
  //         error: true,
  //         errorMessage: err,
  //         loading: false,
  //       })
  //     })
  // }

  useEffect(() => {
    document.title = `Forum Login | ${scheme.title}`
  }, [])

  return {
    token,
    scheme,
    handleSubmitRegister,
    handleSubmitLogin,
    usernameRegister,
    setUsernameRegister,
    passwordRegister,
    setPasswordRegister,
    usernameLogin,
    setUsernameLogin,
    passwordLogin,
    setPasswordLogin,
  }
}
