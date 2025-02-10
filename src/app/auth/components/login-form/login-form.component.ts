import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SocioService } from '../../services/socio.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

    private fb = inject(FormBuilder);
    private usuarioService = inject(UsuarioService);
    private router = inject(Router);

    public myForm: FormGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.minLength(6)]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    });

    login() {
      const {correo, contrasenia} = this.myForm.value;

      console.log({correo, contrasenia});

      this.usuarioService.login(correo, contrasenia).subscribe(resp => {
        if(resp.data.length === 0) {
          Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
        } else {
          this.router.navigateByUrl('/dashboard/home/'+resp.data[0].id);
        }
      });

    }

}


//
