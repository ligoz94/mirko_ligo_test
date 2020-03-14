// Action interface
export interface Action {
  type: string;
  payload: object;
}

// User interface
export interface User {
  login: string;
  id: number;
  avatar_url: string;
  repos_url?: string;
  location?: string;
  email?: string;
  name?: string;
  html_url?: string;
}
