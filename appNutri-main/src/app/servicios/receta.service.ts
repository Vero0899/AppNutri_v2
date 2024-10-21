import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'; // URL de la API

  constructor(private http: HttpClient) { }

  // Método para obtener una receta aleatoria
  getRandomMeal(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
