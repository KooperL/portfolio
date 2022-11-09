export interface blankResp {
  success: boolean;
}

export interface blogItem {
  id: number;
  date: string;
  author: string;
  title: string;
  body: string;
  author_id?: string;
  category?: string;
  views: number;
}