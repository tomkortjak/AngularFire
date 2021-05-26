import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {SessionServiceService} from './services/session-service.service';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, retry} from 'rxjs/operators';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private session: SessionServiceService) {
    console.log('New http interceptor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let token = req.headers.get("Authorization");
    let token = this.session.getToken();
    console.log(token);
    if (token == null) {
      console.log('IK HEB GEEN TOKEN!!');
      return next.handle(req);
    } else {
      const cloned =
        req.clone({setHeaders: {'Authorization': token }}); /* , withCredentials: true */
      return next.handle(cloned);
    }

    // console.log("IK HEB EEN TOKEN!!");
    // console.log(token);
    //
    // req = req.clone({withCredentials: false});
    // req = req.clone({ setHeaders: { Authorization: token } });
    //
    // return next.handle(req);
  }

}
