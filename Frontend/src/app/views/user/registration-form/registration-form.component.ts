import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormsModule,
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { CardImageComponent } from '../../../shared/card-image/card-image.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { CalendarModule } from 'primeng/calendar';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { FloatLabelModule } from 'primeng/floatlabel';
import { LoadDataService } from '../../../services/loadDataRegister/load-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../../../services/register/register.service';

registerLocaleData(localeEs, 'es', localeEsExtra);

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    FloatLabelModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    CardImageComponent,
    HeaderComponent,
    CalendarModule,
    HttpClientModule,
  ],
  providers: [FormBuilder, LoadDataService, RegisterService],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  form: FormGroup;
  provinces: any[] = [];
  genders: any[] = [];
  commandTypes: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loadDataService: LoadDataService,
    private registerService: RegisterService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadProvinces();
    this.loadGenders();
    this.loadCommandTypes();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      identification: new FormControl('', [
        Validators.required,
        this.validarCedulaEcuatoriana,
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        this.validarNombreCompleto,
      ]),
      birthdate: new FormControl('', [
        Validators.required,
        this.validarEdad(18, 50),
      ]),
      id_gender: new FormControl('', [Validators.required]),
      id_province: new FormControl('', [Validators.required]),
      id_commandType: new FormControl('', [Validators.required]),
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          this.validarNumeroCelular,
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, this.validarCorreoElectronico],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      gradeNote: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(20),
          this.validarNotaGrado,
        ],
      ],
    });
  }

  private loadProvinces() {
    this.loadDataService.getProvinces().subscribe(
      (data) => {
        this.provinces = data.data;
      },
      (error) => {
        console.error('Error fetching provinces:', error);
      }
    );
  }

  private loadGenders() {
    this.loadDataService.getGender().subscribe(
      (data) => {
        this.genders = data.data;
      },
      (error) => {
        console.error('Error fetching genders:', error);
      }
    );
  }

  private loadCommandTypes() {
    this.loadDataService.getCommandType().subscribe(
      (data) => {
        this.commandTypes = data.data;
      },
      (error) => {
        console.error('Error fetching command types:', error);
      }
    );
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const datosFormulario = this.form.value;
      datosFormulario.id_gender = parseInt(datosFormulario.id_gender, 10);
      datosFormulario.id_province = parseInt(datosFormulario.id_province, 10);
      datosFormulario.id_commandType = parseInt(
        datosFormulario.id_commandType,
        10
      );

      this.saveRegister(datosFormulario);
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveRegister(registerData: any) {
    this.registerService.createOrUpdateRegister(registerData).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Formulario Enviado',
          text: 'El formulario se ha enviado con éxito.',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            // Limpiar el formulario
            this.form.reset();
          }
        });
      },
      (error) => {
        console.error('Error creating or updating register:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar el formulario. Por favor, inténtelo de nuevo.',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

   captchaValid: boolean = false;

   resolved(captchaResponse: string | null) {
     this.captchaValid = captchaResponse !== null && captchaResponse.length > 0;
   }

  private validarNombreCompleto(
    control: AbstractControl
  ): ValidationErrors | null {
    const nombre = control.value;
    if (!nombre) {
      return null;
    }

    if (nombre.length < 3) {
      return { nombreInvalido: true };
    }

    const expresionRegular =
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00e1\u00e9\u00ed\u00f3\u00fa\u0020\u0027\u002E\u002D]*$/;
    if (expresionRegular.test(nombre)) {
      return null;
    } else {
      return { nombreInvalido: true };
    }
  }

  private validarNotaGrado(control: AbstractControl): ValidationErrors | null {
    const nota = control.value;
    if (!nota) {
      return null;
    }

    if (nota < 0 || nota > 20) {
      return { notaGradoInvalida: true };
    }

    return null;
  }

  private validarCorreoElectronico(
    control: AbstractControl
  ): ValidationErrors | null {
    const correo = control.value;
    if (!correo) {
      return null;
    }

    const expresionRegular =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (expresionRegular.test(correo)) {
      return null;
    } else {
      return { correoInvalido: true };
    }
  }

  private validarNumeroCelular(
    control: AbstractControl
  ): ValidationErrors | null {
    const telefono = control.value;
    if (!telefono) {
      return null;
    }

    if (telefono.length !== 10) {
      return { telefonoInvalido: true };
    }

    const primerosDigitos = telefono.substring(0, 2);
    if (primerosDigitos !== '09' && primerosDigitos !== '08') {
      return { telefonoInvalido: true };
    }

    return null;
  }

  private validarCedulaEcuatoriana(
    control: AbstractControl
  ): ValidationErrors | null {
    const cedula = control.value;
    if (!cedula) {
      return null;
    }

    if (cedula.length !== 10) {
      return { cedulaInvalida: true };
    }

    const digitoRegion = parseInt(cedula.substring(0, 2), 10);
    if (digitoRegion < 1 || digitoRegion > 24) {
      return { cedulaInvalida: true };
    }

    const ultimoDigito = parseInt(cedula.substring(9, 10), 10);
    const pares =
      parseInt(cedula.substring(1, 2), 10) +
      parseInt(cedula.substring(3, 4), 10) +
      parseInt(cedula.substring(5, 6), 10) +
      parseInt(cedula.substring(7, 8), 10);
    let impares = 0;

    for (let i = 0; i < 9; i += 2) {
      let num = parseInt(cedula.charAt(i), 10) * 2;
      if (num > 9) {
        num -= 9;
      }
      impares += num;
    }

    const sumaTotal = pares + impares;
    const decenaSuperior = Math.ceil(sumaTotal / 10) * 10;
    const digitoVerificador = decenaSuperior - sumaTotal;

    if (digitoVerificador === 10 && ultimoDigito === 0) {
      return null;
    } else if (digitoVerificador === ultimoDigito) {
      return null;
    } else {
      return { cedulaInvalida: true };
    }
  }

  private validarEdad(minEdad: number, maxEdad: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaNacimiento = new Date(control.value);
      if (!control.value || isNaN(fechaNacimiento.getTime())) {
        return { edadInvalida: true };
      }

      const fechaActual = new Date();
      const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
      const diferenciaMeses =
        fechaActual.getMonth() - fechaNacimiento.getMonth();
      const diferenciaDias = fechaActual.getDate() - fechaNacimiento.getDate();

      if (
        (edad > minEdad ||
          (edad === minEdad && diferenciaMeses > 0) ||
          (edad === minEdad && diferenciaMeses === 0 && diferenciaDias >= 0)) &&
        (edad < maxEdad ||
          (edad === maxEdad && diferenciaMeses < 0) ||
          (edad === maxEdad && diferenciaMeses === 0 && diferenciaDias <= 0))
      ) {
        return null;
      } else {
        return { edadInvalida: true };
      }
    };
  }

  getError(controlName: string, errorType: string) {
    const control = this.form.get(controlName);
    return control?.hasError(errorType) && control?.touched;
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }

  isValid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.valid && control?.touched;
  }

  markAsTouched(controlName: string): void {
    const control = this.form.get(controlName);
    control?.markAsTouched();
  }

  filterOnlyNumbers(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  filterOnlyLetters(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(
      /[^a-zA-ZÀ-ÿ\u00f1\u00d1\u00e1\u00e9\u00ed\u00f3\u00fa\u0020\u0027\u002E\u002D]/g,
      ''
    );
  }
}
