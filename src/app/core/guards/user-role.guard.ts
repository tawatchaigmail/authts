import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RolesService } from '../services';

@Injectable({ providedIn: 'root' })
export class UserRoleGuard implements CanActivate {
  constructor(private rolesService: RolesService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.rolesService.roles$.pipe(
      map((roles) => {
        if (roles && roles.includes(route?.data?.role)) {
          return true;
        }

        // redirect the user to home
        this.router.navigate(['/home']);
        return false;
      }),
      catchError((err) => {
        // redirect the user to home
        this.router.navigate(['/home']);
        return of(false);
      })
    );
  }
}
