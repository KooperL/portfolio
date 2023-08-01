const routes = {
  contact: 'contact',
  about: 'about',
  home: 'home',

  mrna: 'mrna',
  seqalign: 'seqalign',
  siteanalysis: 'siteanalysis',
  render: 'render',
  secondary: 'secondary',
  fuelprices: 'fuelprices',
  tictactoe: 'tictactoe',
  jssim: 'jssim',
  minesweeper: 'minesweeper',
  randombio: 'randombio',
  property: 'property',
  propertySearch: 'property/search',

  forumRegister: 'login',
  forumLogin: 'login',
  forumPostCreate: '',
  forumPostView: 'post',
  forumUserView: 'user',
} as const

export const projectsPath = "projects"
export const forumPath = "forum"
export const indexPath = ""

export {
  routes
}
