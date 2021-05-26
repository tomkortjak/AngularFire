import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {log} from 'util';
import {User} from "../models/User";


@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {
  token: string;
  BASE_URL: string;


  constructor(private http: HttpClient) {
    // this.signOn("test@test.nl", "12341234");
    this.BASE_URL = "http://localhost:8084"
  }

  signOn(eMail: string, passWord: string) {
    return firebase.auth().signInWithEmailAndPassword(eMail, passWord)
      .then(
        response => {
          firebase.auth().currentUser.getIdToken().then(
            token => this.token = token,
            log(this.token)
          );
          localStorage.setItem('token', this.token);
          return response;
        }), err => {
      console.log(err);
    };
  }

  signIn(eMail: string, passWord: string, targetUrl?: string) {
    console.log('login ' + eMail + '/' + passWord);
    console.log(this.token);
    let oObservable =
      this.http.post<HttpResponse<User>>(this.BASE_URL + '/authenticate/login',
        {eMail: eMail, passWord: passWord},
        {observe: 'response'});
    oObservable.subscribe(
      response => {
        console.log(response);

        let token = response['headers'].get('Authorization');

        if(token == null) {
          throw new Error('token was not present in the response');
        }

        token = token.replace('Bearer ','');

        sessionStorage.setItem("token",token);
        this.updateUserInformation();
      },
      (err) => {
        console.log('authentication error',err);
        // this.currentUser = null;
        // this.currentToken = null;
      });
    return oObservable;
  }

  signOff() {
    localStorage.clear();
    return firebase.auth().signOut()
      .then(
        this.token = null
      ), err => {
      console.log(err);
    };
  }

  getUsername(): string {
    if (this.token != null && firebase.auth().currentUser != null) {
      return firebase.auth().currentUser.email;
    } else {
      return 'visitor';
    }
  }

  checkLoggedIn(): boolean {
    if (this.token != null) {
      return true;
    } else {
      return false;
    }
  }

  getToken(): string {
    return this.token;
  }

  // async refreshToken() {
  //   this.token = await firebase.auth().currentUser.getIdToken();
  // }

  refreshToken(): Observable<string> {
    const url = 'url to refresh token here';

    // append refresh token if you have one
    const refreshToken = localStorage.getItem('refreshToken');
    const expiredToken = localStorage.getItem('token');

    return this.http
      .get(url, {
        headers: new HttpHeaders()
          .set('refreshToken', refreshToken)
          .set('token', expiredToken),
        observe: 'response'
      })
      .pipe(
        share(), // <========== YOU HAVE TO SHARE THIS OBSERVABLE TO AVOID MULTIPLE REQUEST BEING SENT SIMULTANEOUSLY
        map(res => {
          const token = res.headers.get('token');
          const newRefreshToken = res.headers.get('refreshToken');
          // store the new tokens
          localStorage.setItem('refreshToken', newRefreshToken);
          localStorage.setItem('token', token);
          return token;
        })
      );
  }

  setToken(token: string): void {
    this.token = token;
  }

  private updateUserInformation() {
    this.token = sessionStorage.getItem("token")

    // if(this.token) {
    //   const decodedToken = this.jwtService.decodeToken(this.currentToken);
    //
    //   this.currentUser = new User();
    //   this.currentUser.email = decodedToken.sub;
    //   this.currentUser.admin = decodedToken.admin;
    //
    // } else {
    //   this.currentUser = null;
  }
}
