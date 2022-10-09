export interface BlogTemplate {
  author: string;
  title: string;
  body: string;
}

export const blogTemplateInitialState: BlogTemplate = {
  author: '',
  title: '',
  body: '',
}