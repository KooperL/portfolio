export const endpoints: {
  [k in keyof ApiEndpoints | keyof CmsEndpoints]: string
} = {

  forumHome: `${apiHost}/${forumPath}`,
  forumRegister: `${apiHost}/${forumPath}/register`,
  forumPostCreate: `${apiHost}/${forumPath}/post`,
  forumPost: `${apiHost}/${forumPath}/post/`,
  forumUser: `${apiHost}/${forumPath}/user/`,
  forumLogin: `${apiHost}/${forumPath}/login`,
  forumRefresh: `${apiHost}/${forumPath}/refresh`,
  forumLogout: `${apiHost}/${forumPath}/logout`,

}
