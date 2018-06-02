import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
  private http: HttpClient,
  private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('CommentService: ' + message);
  }

  login() {
  const httpOptions = {
          headers: new HttpHeaders({
              'Access-Control-Allow-Origin':  '*',
          })
  	};
	let body = new HttpParams();
	body = body.set('coauth_callback', 'https://hnweb.herokuapp.com/');
	return this.http.post('https://api.twitter.com/oauth/request_token', body, httpOptions);
  
  }

}
