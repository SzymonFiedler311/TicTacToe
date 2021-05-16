import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpErrorService} from './http-error.service';
import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private httpErrorService: HttpErrorService, private snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = error.error.message;
          this.httpErrorService.onErrorCaught(this.snackBar, errorMessage);
          return throwError(errorMessage);
        })
      );
  }
}
