import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';
import { take } from 'rxjs/operators';

@Injectable(
  // {providedIn: 'root'}
  )
export class EventoService {

  constructor(private http: HttpClient) { }
  baseURL = 'https://localhost:5001/api/eventos';
  // tslint:disable-next-line: typedef
  public getEventos(): Observable<Evento[]>{
      return this.http
      .get<Evento[]>(this.baseURL)
      .pipe(take(1));
  }
  public getEventosByTema(tema: string): Observable<Evento[]>{
      return this.http
      .get<Evento[]>(`${this.baseURL}/tema/${tema}`)
      .pipe(take(1));
  }
  public getEventoById(id: number): Observable<Evento>{
      return this.http
      .get<Evento>(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

  public postEvento(evento: Evento): Observable<Evento>{
    return this.http
    .post<Evento>(this.baseURL, evento)
    .pipe(take(1));
  }
  public putEvento(id: number, evento: Evento): Observable<Evento>{
    return this.http
    .put<Evento>(`${this.baseURL}/${evento.id}`, evento)
    .pipe(take(1));
  }
  public deleteEvento(id: number): Observable<any>{
    return this.http
    .delete(`${this.baseURL}/${id}`)
    .pipe(take(1));
  }
}
