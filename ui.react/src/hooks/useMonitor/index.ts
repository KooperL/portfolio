import { sendMonitor } from "src/api/clients/ApiHandler/routes/sendMonitor"

export function useMonitor() {
  const currentPage = localStorage.getItem("currentPage")
  sendMonitor({
    payload: {
      uuid: localStorage.getItem("uuid") ?? "",
      session_id: sessionStorage.getItem("session_id") ?? "",
      page: encodeURIComponent(window.location.pathname),
      prevPage: encodeURIComponent(currentPage ?? "NULL"),
    }
  })
    .then(resp => {
      if (resp.data.success) {
        localStorage.setItem("currentPage", window.location.pathname)
        // } else {
        //   throw new Error((resp as ApiError))
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
  // }, [])
}
