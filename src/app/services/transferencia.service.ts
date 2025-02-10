import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TransferenciaResponse } from '../models/transferencia-response.interface';
import { Transferencia } from '../models/transferencia.interface';


@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  private apiUrl = 'http://localhost:8080/transacciones'; // Cambiar si es necesario

  constructor(private http: HttpClient) {}

  obtenerTransferencias(): Observable<TransferenciaResponse> {
    return this.http.get<TransferenciaResponse>(this.apiUrl);  // Usamos la interfaz como tipo de respuesta
  }

  realizarTransferencia(idCuentaOrigen: number, idCuentaDestino: number, transfencia: Transferencia) {
    return this.http.post<TransferenciaResponse>(`${this.apiUrl}/${idCuentaDestino}/${idCuentaOrigen}`, transfencia).pipe(
      catchError(err => throwError(() => err.error.message))
    );
  }

}
