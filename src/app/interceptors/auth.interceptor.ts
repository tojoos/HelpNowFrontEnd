import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  private apiServerUrl = environment.apiServerUrl;
  public accessToken = '';
  public refreshToken = '';
  refresh = false;

  constructor(private http: HttpClient) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var localAccessToken = localStorage.getItem('access_token')!
    var sessionAccessToken = sessionStorage.getItem('access_token')!
    if (localAccessToken) {
      this.accessToken = localAccessToken
    } 
    if (sessionAccessToken) {
      this.accessToken = sessionAccessToken
    }

    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      console.log('refresh=', this.refreshToken)

      console.log(err.message)
      if (err.status === 401 && !this.refresh) {
        this.refresh = true;

        return this.http.get(`${this.apiServerUrl}/user/token/refresh`, {headers: {Authorization: `Bearer ${this.refreshToken}`}}).pipe(
          switchMap((res: any) => {
            this.accessToken = res.access_token;
            this.refreshToken = res.refresh_token;
            
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${this.accessToken}`
              }
            }));
          })
        );
      }
      this.refresh = false;
      return throwError(() => err);
    }));
  }
}
