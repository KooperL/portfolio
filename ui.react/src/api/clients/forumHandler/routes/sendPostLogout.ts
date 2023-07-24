export const postForumLogout = (
  data: ForumLoginPOSTPayload,
  authJWT: string,
): Promise<GenericResponse<ForumRegisterPOSTResponse, ApiError>> => {
  const apiConfig = {
    headers: { Authorization: `Bearer ${authJWT}` }, //, 'Access-Control-Allow-Credentials': 'true'},
    data: data,
    withCredentials: true,
  }
  return post(endpoints["forumLogout"], apiConfig)
}
