import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../shared/interfaces';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  currentUser: IUser | null;

  get isLogged(): boolean { return !!this.currentUser; }

  constructor(private http: HttpClient) { }

  getCurrentUserProfile(): Observable<IUser> {
    return this.http.get(`${apiUrl}/users/profile`, { withCredentials: true }).pipe(
      tap(((user: IUser) => this.currentUser = user)),
      catchError(() => { this.currentUser = null; return of(null); })
    );
  }

  login(data: { email: string, password: string }): Observable<IUser> {
    return this.http.post(`${apiUrl}/users/login`, data, { withCredentials: true }).pipe(
      tap((user: IUser) => this.currentUser = user)
    );
  }

  logout(): Observable<IUser> {
    return this.http.post(`${apiUrl}/users/logout`, {}, { withCredentials: true }).pipe(
      tap((user: IUser) => this.currentUser = null)
    );
  }

  register(data: { email: string, address: string, username: string, password: string }): Observable<IUser> {
    return this.http.post(`${apiUrl}/users/register`, data, { withCredentials: true }).pipe(
      tap((user: IUser) => this.currentUser = user)
    );
  }
}
