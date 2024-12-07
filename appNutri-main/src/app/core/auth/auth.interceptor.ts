import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Clone the request object
  let newReq = req.clone();

  console.log('Interceptor');
  if (!authService.isLogged) {
    router.navigate(['/ingreso']).finally();
  }

  // Response
  return next(newReq).pipe(
    catchError((error) => {
      router.navigate(['/ingreso']).finally();
      return throwError(() => {
        throw error;
      });
    }),
  );
};
