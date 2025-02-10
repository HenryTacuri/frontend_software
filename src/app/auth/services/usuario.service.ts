import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { UsuarioRegister } from '../interfaces/usuario-register-response';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private http = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8080/usuarios';

  constructor() { }

  register(usuario: Usuario, idSocio:string) {

    return this.http.post<UsuarioRegister>(`${this.baseUrl}/${idSocio}`, usuario)
    .pipe(
      catchError(err => throwError(() => err.error.message))
    );

  }

  login(email: string, password: string) {

    return this.http.get<UsuarioRegister>(`${this.baseUrl}/${email}/${password}`).pipe(
      catchError(err => throwError(() => err.error.message))
    );

  }

}
