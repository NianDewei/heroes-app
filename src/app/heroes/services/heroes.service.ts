import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroe.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url: string = environment.hostName;
  constructor(private readonly http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.url}/heroes`);
  }

  getHeroeById(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.url}/heroes/${id}`);
  }

  getSuggestions(term: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.url}/heroes?q=${term}&_limit=6`);
  }

  save(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.url}/heroes`, heroe);
  }

  update(heroe: Heroe): Observable<Heroe> {
    return this.http.patch<Heroe>(`${this.url}/heroes/${heroe.id}`, heroe);
  }

  delete(id: string): Observable<[]> {
    return this.http.delete<[]>(`${this.url}/heroes/${id}`);
  }
}
