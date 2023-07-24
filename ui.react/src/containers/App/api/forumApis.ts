

export const getForumHome = (
  params: ForumLoginPOSTPayload,
  authJWT: string,
): Promise<GenericResponse<ForumHomeResponse, ApiError>> => {
  const apiConfig = {
    headers: { Authorization: `Bearer ${authJWT}` },
    params: params,
    withCredentials: true,
  }
  return get(`${endpoints["forumHome"]}`, apiConfig)
}

