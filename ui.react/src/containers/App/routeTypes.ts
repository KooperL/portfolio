export enum IndexRouteType {
  Home = '/',
  About = 'about',
  Contact = 'contact',
}

  export enum BlogRouteType {
    BlogHome = `blog`,
    // BlogSearch = `search`,
    BlogPostCreate = `post`,
    BlogLogin = `login`,
    BlogPost = `post/:postId`,
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