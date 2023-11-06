const routes = {
  forumRegister: 'register',
  forumLogin: 'login',
  forumPostCreate: 'post',
  forumPost: 'post',
  forumUser: 'user',
  forumRefresh: 'refresh',
  forumLogout: 'logout',
} as const

export const forumPath = 'forum'

export { routes }

interface SessionId {
  session_id: string
}

interface ForumItemType {
  id: number
  date: string
  author: string
  title: string
  body: string
  author_id?: string
  category?: string
  views: number
}

export type { SessionId, ForumItemType }
