import { useEffect } from "react"

// TODO

function useFetch<T, P>(
  payload: P,
  setLoading: (val: Boolean) => void,
  fetch: (payload: P) => Promise<T>,
  setData: (data: T) => void,
  setError: (error: string) => void
): void {
  useEffect(() => {
    fetch(payload)
    .then(data => {
      setData(data)
    })
    .catch(error => {
      setError(error)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])
}

export default useFetch