export interface Post {
  path: string;
  title: string;
  subtitle?: string;
  date: string;

  __content: string;
}
