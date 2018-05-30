import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { user } from './user';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
  private http: HttpClient,
  private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PostService: ' + message);
  }

  getuser(id): Observable<user>{

    return this.http.get<user>('https://asw-hacker-news.herokuapp.com/api/users/'+id)

  }
  getName(id){
    return this.http.get('https://asw-hacker-news.herokuapp.com/api/users/'+id+'.json')
  }
}
