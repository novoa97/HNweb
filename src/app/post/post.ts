export interface post{
    id: number;
    title: string;
    url: string;
    text: string;
    user_id: number;
    user_name: string;
    created_at: string; //Date
    updated_at: string; //Date
    tipo: string,
    votes: number;
    nComments: number;
    upvotes_count: number
}
