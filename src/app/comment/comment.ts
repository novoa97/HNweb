export interface comment{
  id: number,
  text: string,
  votes: number,
  parent_id: number,
  created_at: string,
  updated_at: string,
  post_id: string,
  user_id: string,
  tipus: string,
  usuari: string;
  voted: boolean;
}
