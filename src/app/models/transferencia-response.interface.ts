export interface TransferenciaResponse {
  data:     Datum[];
  infoList: InfoList[];
}

export interface Datum {
  id:                  number;
  tipo:                string;
  fechaPago:           number;
  monto:               number;
  numeroCuentaDestino: number;
}

export interface InfoList {
  codigo:   number;
  mensaje:  string;
  tipoInfo: number;
}
