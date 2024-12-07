import {inject} from '@angular/core';
import {CanActivateChildFn, CanActivateFn, Router} from '@angular/router';
import {of, switchMap} from "rxjs";
import {AuthService} from "../auth.service";

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route: any, state: any) => {
  const router: Router = inject(Router);

  // Check the authentication status
  return inject(AuthService).check().pipe(
    switchMap((authenticated) => {
      console.log('NoAuthGuard');
      console.log(authenticated);
      if (!authenticated) {
        const url = router.parseUrl(`ingreso`);
        return of(url);
      }
      // Allow the access
      return of(true);
    }),
  );
};
