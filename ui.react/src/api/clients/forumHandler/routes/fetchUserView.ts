export const getUserView = (
  data: ForumPostViewGETPayload,
  authJWT: string,
  username: string,
): Promise<GenericResponse<ForumUserGETResponse, ApiError>> => {
  const apiConfig = {
    headers: { Authorization: `Bearer ${authJWT}` },
    params: data,
  }
  return get(endpoints["forumUser"] + username, apiConfig)
}
