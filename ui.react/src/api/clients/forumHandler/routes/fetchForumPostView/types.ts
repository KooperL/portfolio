export interface ForumPostViewRequestPayload {
  session_id: string
}

export interface ForumPostViewResponsePayload {
  id: number
  date: string
  author_id: number
  author: string
  title: string
  body: string
  category: string
  views: number
}
