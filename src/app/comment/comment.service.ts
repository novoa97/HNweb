import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
}
