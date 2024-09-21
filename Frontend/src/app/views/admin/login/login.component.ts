import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login/login.service'; // Asegúrate de importar el servicio correctamente
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService // Inyecta el servicio
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log(username, password, "Proyecto")
      this.loginService.loginUser({ usernameOrEmail: username, password }).subscribe(
        data => {
          console.log('Login successful', data);
          this.router.navigate(['/verificar-registros']); // Navega a la ruta deseada después de un inicio de sesión exitoso
        },
        error => {
          Swal.fire({
            icon: "error",
            title: "Datos incorrectos",
            text: "Los datos ingresados no son correctos",
          });
          this.loginForm.reset();
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
