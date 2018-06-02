import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { comment } from './comment';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(
  private http: HttpClient,
  private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('CommentService: ' + message);
  }

  getCommentsPost(id: number): Observable<comment[]> {

    return this.http.get<comment[]>('https://asw-hacker-news.herokuapp.com/api/comments/post/'+id);
  }
  getReply(id: number): Observable<comment[]> {

    return this.http.get<comment[]>('https://asw-hacker-news.herokuapp.com/api/replies/'+id);
  }
  
  getComment(id: number){
	  return this.http.get<comment>('https://asw-hacker-news.herokuapp.com/api/comments/'+id);
  }

  postComment(comment_to_pass: string, post_id: number) {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/x-www-form-urlencoded',
            'Authorization':  localStorage.getItem('token')
        })
    };
	  console.log(comment_to_pass);
	  console.log(""+post_id);
    let body = new HttpParams();
    body = body.set('comment', comment_to_pass);
	body = body.set('post_id', ""+post_id);
	console.log(body);
	return this.http.post<comment>('https://asw-hacker-news.herokuapp.com/api/comments/', body, httpOptions);  
  }
  
  postReply(reply_to_pass: string, post_id: number, parent_id: number) {
	  console.log(reply_to_pass);
	const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/x-www-form-urlencoded',
            'Authorization':  localStorage.getItem('token')
        })
	};
	let body = new HttpParams();
	body = body.set('comment', reply_to_pass);
	body = body.set('post_id', ""+post_id);
	body = body.set('parent_id', ""+parent_id); 
	return this.http.post<comment>('https://asw-hacker-news.herokuapp.com/api/reply/', body, httpOptions);  
  }
}
