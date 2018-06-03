import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { post } from './post/post';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
  private http: HttpClient,
  private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PostService: ' + message);
  }

  getPosts (): Observable<post[]> {

    return this.http.get<post[]>('https://asw-hacker-news.herokuapp.com/api/posts');

  }
  getAsk (): Observable<post[]> {

    return this.http.get<post[]>('https://asw-hacker-news.herokuapp.com/api/ask');

  }
  getPostbyid(id: number): Observable<post> {

    return this.http.get<post>('https://asw-hacker-news.herokuapp.com/api/posts/'+id);
  }
  getNewest (): Observable<post[]> {

    return this.http.get<post[]>('https://asw-hacker-news.herokuapp.com/api/newest');

  }
  
  deletePost (id: number){
	  let body = new HttpParams();
	  body = body.set('post_id', ""+id);
	  const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/x-www-form-urlencoded',
            'Authorization':  localStorage.getItem('token')
        }),
		body
    };
	
	return this.http.delete<post>('https://asw-hacker-news.herokuapp.com/api/posts/', httpOptions);
  }

}
