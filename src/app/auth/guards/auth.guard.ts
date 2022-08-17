import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _serviceAuth: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log('Guard -> canActivate');

    return this._serviceAuth
      .ifItSsAuthenticated()
      .pipe(tap((userAuth) => this.redirectIfNotAuthenticated(userAuth)));
    // return true;
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    console.log('Guard -> canLoad');
    return this._serviceAuth
      .ifItSsAuthenticated()
      .pipe(tap((userAuth) => this.redirectIfNotAuthenticated(userAuth)));
    //   console.warn('canLoad',true)
    //   console.warn(route)
    //   console.warn(segments)
    // return true;
  }

  private redirectIfNotAuthenticated(isAuthenticated: boolean): void {
    if (!isAuthenticated) {
      this._router.navigate(['/auth']);
    }
  }
}
