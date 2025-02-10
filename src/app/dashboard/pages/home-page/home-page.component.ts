import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { TransferenciaService } from '../../../services/transferencia.service';
import { Transferencia } from '../../../models/transferencia.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioRegister } from '../../../auth/interfaces/usuario-register-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TransferenciaResponse } from '../../../models/transferencia-response.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  titulo: string = 'Lista de Socios';
  socios: any[] = []; // Lista de socios
  transferencias?: TransferenciaResponse; // Lista de transferencias
  mostrarSociosContenido: boolean = true; // Mostrar Socios por defecto
  mostrarTransferenciasContenido: boolean = false; // Ocultar Transferencias inicialmente
  private route = inject(ActivatedRoute);
  public usuario?: UsuarioRegister;
  private fb = inject(FormBuilder);  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    cuentaDest: ['', [Validators.required, Validators.minLength(1)]],
    tipo: ['', [Validators.required, Validators.minLength(1)]],
    monto: ['', [Validators.required, Validators.min(1)]],
  });


  constructor(
    private usuarioService: UsuarioService,
    private transferenciaService: TransferenciaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.usuarioService.getUsuarioById(id!).subscribe(resp => {
      this.usuario = resp;
      console.log(this.usuario);
    });
    this.cargarSocios(); // Cargar los socios por defecto
  }

  // Mostrar la sección de Socios
  mostrarSocios(): void {
    this.mostrarSociosContenido = true;
    this.mostrarTransferenciasContenido = false;
    this.titulo = 'Lista de Socios';
    this.cargarSocios(); // Cargar los socios al hacer clic en "Socios"
  }

  // Mostrar la sección de Transferencias
  mostrarTransferencias(): void {
    this.mostrarTransferenciasContenido = true;
    this.mostrarSociosContenido = false;
    this.titulo = 'Lista de Transferencias';
    this.cargarTransferencias(); // Cargar las transferencias al hacer clic en "Transferencias"
  }

  // Cargar los socios desde el servicio
  cargarSocios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (datos) => {
        this.socios = datos; // Guardamos los socios obtenidos
      },
      error: (err) => {
        console.error('Error al obtener socios:', err);
      }
    });
  }

  // Cargar las transferencias desde el servicio
  cargarTransferencias(): void {
    this.transferenciaService.obtenerTransferencias().subscribe({
      next: (response) => {
        this.transferencias = response; // Guardamos las transferencias obtenidas
      },
      error: (err) => {
        console.error('Error al obtener transferencias:', err);
      }
    });
  }

  // Función de actualizar (puede recargar ambos contenidos)
  actualizar(): void {
    if (this.mostrarSociosContenido) {
      this.cargarSocios(); // Actualizar la lista de socios
    } else if (this.mostrarTransferenciasContenido) {
      this.cargarTransferencias(); // Actualizar la lista de transferencias
    }
  }


  transferencia() {
    const {cuentaDest, ...dataTransferencia} = this.myForm.value;
    const cuentaOrigen = this.usuario?.data[0].socio.cuentas[0].id;
    this.transferenciaService.realizarTransferencia(cuentaOrigen!, cuentaDest, dataTransferencia).subscribe(resp => {
      if(resp.data.length !== 0) {
        Swal.fire('Success', 'Transferencia realizada exitosamente', 'success');
      } else {
        Swal.fire('Error', 'Error al realizar la transferencia', 'error');
      }
    });
  }

}
