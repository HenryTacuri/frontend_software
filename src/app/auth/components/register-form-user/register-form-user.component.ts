import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SocioService } from '../../services/socio.service';
import { UsuarioService } from '../../services/usuario.service';
import { SocioResponse } from '../../interfaces/socio-response';
import { tap } from 'rxjs';
import { CuentaService } from '../../services/cuenta.service';
import { Cuenta } from '../../interfaces/cuenta';

@Component({
  selector: 'app-register-form-user',
  templateUrl: './register-form-user.component.html',
  styleUrl: './register-form-user.component.css'
})
export class RegisterFormUserComponent implements OnInit {

    private fb = inject(FormBuilder);
    private socioService = inject(SocioService);
    private usuarioService = inject(UsuarioService);
    private cuentaService = inject(CuentaService);
    private router = inject(Router);

    public socios: SocioResponse[] = [];


    public myForm: FormGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.minLength(6)]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      tipo: ['', [Validators.required, Validators.minLength(1)]],
      idSocio: ['', [Validators.required, Validators.minLength(1)]],
      saldo: [0, [Validators.required, Validators.min(1)]],
    });

    ngOnInit(): void {
      this.socioService.getSocios().subscribe(resp => {
        this.socios.push(resp)
      });
    }

    register() {
      const usuarioRegister = this.myForm.value;

      const {idSocio, saldo, ...dataUser} = usuarioRegister;

      const saldoCuenta: number = saldo;

      const cuenta: Cuenta = {saldo: saldoCuenta, numero_cuenta: idSocio};

      this.usuarioService.register(dataUser, idSocio).subscribe(resp => {
        this.cuentaService.register(cuenta, idSocio). subscribe(respFinal => {
          Swal.fire('success', 'Registro correcto', 'success')
        })
      });

    }

}
