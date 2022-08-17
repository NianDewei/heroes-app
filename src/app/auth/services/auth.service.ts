import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.hostName;
  private _auth: User | undefined;

  constructor(private _http: HttpClient) {}

  get user(): User {
    return { ...this._auth! };
  }

  ifItSsAuthenticated(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    return this._http.get<User>(`${this.url}/usuarios/1`).pipe(
      map((user) => {
        this._auth = user;
        return true;
      })
    );
  }

  auth(): Observable<User> {
    return this._http.get<User>(`${this.url}/usuarios/1`).pipe(
      tap((user) => (this._auth = user)),
      tap((user) => localStorage.setItem('token', user.id))
    );
  }

  logout() {
    this._auth = undefined;
    localStorage.clear();
  }
}
