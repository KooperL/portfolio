export enum IndexRouteType {
  Home = '/',
  About = 'about',
  Contact = 'contact',
}

  export enum BlogRouteType {
    BlogHome = `forum`,
    // BlogSearch = `search`,
    BlogPostCreate = `post`,
    BlogLogin = `login`,
    BlogPost = `post`,            // :postId
    BlogUser = `user`,            // :username
    BlogRegister = `register`,
}

export enum ProjectsRouteType {
  ProjectsHome = 'projects',
  Render = 'render',
  Tictactoe = 'tictactoe',
  Fuelprices = 'fuelprices',
  Property = 'property',
  Mrna = 'mrna',
  Secondary = 'secondary',
  Seqalign = 'seqalign',
  Heatmap = 'heatmap',
  RandomBio = 'randombio',
  Minesweeper = 'minesweeper',
  JsSim = 'jssimulator',
}