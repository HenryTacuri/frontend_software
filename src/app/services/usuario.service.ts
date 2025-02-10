import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // Asegúrate de importar map
import { UsuarioRegister } from '../auth/interfaces/usuario-register-response';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8080/socios').pipe(
      map(response => response.data) // Accedemos a la propiedad 'data' que contiene el array de usuarios
    );
  }

  getUsuarioById(id: String) {
    return this.http.get<UsuarioRegister>('http://localhost:8080/usuarios/'+id).pipe(
      catchError(err => throwError(() => err.error.message))
    );
  }

}
