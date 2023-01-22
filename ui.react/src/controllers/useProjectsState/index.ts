import { useContext, useEffect } from "react"
import { fetchProjects } from "../../containers/App/api/projectsApi"
import { SchemeContext } from "../../containers/context/colourScheme"
import { HomePayload } from "../../containers/homePage/types"
import { useFetch } from "../../hooks/useFetch"

export const useProjectsState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state, fetch } = useFetch<HomePayload, undefined>(fetchProjects)

  useEffect(() => {
    fetch()
  }, [])

  return { scheme, state }
}
