// https://github.com/Nooruddin-code/english-words-Json/blob/master/words_dictionary.json

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { routes } from "src/api/clients/forumHandler/types"
import { ForumLoginRequestPayload, ForumLoginResponsePayload } from "src/api/clients/forumHandler/routes/sendForumLogin/types"
import { ForumRegisterRequstPayload, ForumRegisterResponsepayload } from "src/api/clients/forumHandler/routes/sendForumRegister/types"
import { forumPath } from "src/api/shared/types"
import { useFetch } from "src/hooks/useFetch"
import { useAccessToken } from "../../containers/authContext/context"
import { SchemeContext } from "../../containers/context/colourScheme"
import { sendForumRegister } from "src/api/clients/forumHandler/routes/sendForumRegister"
import { sendForumLogin } from "src/api/clients/forumHandler/routes/sendForumLogin"

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

  const { state, pull: postRegister } = useFetch<
    ForumRegisterRequstPayload,
  ForumRegisterResponsepayload
  >()

  const registerCallback = () => {
    setHasRegistered(true)

    if (window.hasOwnProperty("PasswordCrediential")) {
      let c = new PasswordCredential({
        id: usernameRegister,
        password: passwordRegister,
      })
      navigator.credentials.create(c as any)
    }
  }

  const loginCallback = (e: any) => {
    setToken(e?.accessToken ?? "")
    if (window.hasOwnProperty("PasswordCrediential")) {
      let c = new PasswordCredential({
        id: usernameLogin,
        password: passwordLogin,
      })
      navigator.credentials.create(c as any)
    }
  }

  const { state: POSTState, pull: postLogin } = useFetch<
    ForumLoginRequestPayload,
    ForumLoginResponsePayload 
  >()

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
      navigate(`/${forumPath}`)
    }
  }, [POSTState])

  const handleSubmitRegister = (
    e: React.FormEvent<HTMLFormElement>,
    data: ForumRegisterRequstPayload,
  ) => {
    e.preventDefault()
    if (hasRegistered) return
    postRegister({
      ApiImpl: sendForumRegister,
      auth: !encodedRegister ? undefined : `Basic ${encodedRegister}`,
      payload: data,
    })
  }

  const handleSubmitLogin = (
    e: React.FormEvent<HTMLFormElement>,
    data: ForumLoginRequestPayload,
  ) => {
    e.preventDefault()
    // if (hasRegistered) return
    postLogin({
      ApiImpl: sendForumLogin,
      auth: !encodedRegister ? undefined : `Basic ${encodedLogin}`,
      payload: data,
    })
  }

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
