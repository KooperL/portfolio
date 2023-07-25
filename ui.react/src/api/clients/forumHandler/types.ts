const routes = {
  forumRegister: 'register',
  forumPostCreate: 'post',
  forumPost: 'post',
  forumUser: 'user',
  forumLogin: 'login',
  forumRefresh: 'refresh',
  forumLogout: 'logout',
} as const

export const forumPath = "forum"

export {
  routes
}

interface SessionId {
  session_id: string
}

interface ForumItem {
  id: number
  date: string
  author: string
  title: string
  body: string
  author_id?: string
  category?: string
  views: number
}

export type {
  SessionId,
  ForumItem
}
