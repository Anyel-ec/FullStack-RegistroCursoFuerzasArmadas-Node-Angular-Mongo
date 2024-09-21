# Proyecto de Gestión de Aspirantes a Fuerzas Armadas

Este proyecto es una aplicación Angular que gestiona la inscripción y verificación de datos de aspirantes a las fuerzas armadas. Proporciona funcionalidades para buscar, aceptar o rechazar aspirantes, y subir comprobantes de pago.

## Estructura del Proyecto

El proyecto consta de varios componentes clave:

1. **app-nav**: Componente de navegación.
2. **router-outlet**: Gestor de rutas.
3. **app-footer**: Componente de pie de página.
4. **VerifyDataComponent**: Componente para la verificación de datos de aspirantes.
5. **UploadReceiptComponent**: Componente para la subida de comprobantes de pago.
6. **RegistrationFormComponent**: Formulario de inscripción.

## Configuración de la Aplicación

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideClientHydration(), 
    provideAnimations()
  ]
};
```

## Componente de Verificación de Datos

### Plantilla

```html
<div class="card">
  <p-table
    #dt
    [value]="filteredData"
    [paginator]="true"
    [rows]="5"
    [tableStyle]="{ 'min-width': '50rem' }"
  >
    <ng-template pTemplate="caption">
      <div class="flex">
        <div class="p-inputgroup ml-auto">
          <span class="p-inputgroup-addon">
            <i class="pi pi-search"></i>
          </span>
          <input
            pInputText
            type="text"
            (input)="filterGlobal($event)"
            placeholder="Buscar"
          />
        </div>
      </div>
    </ng-template>

    <ng-template pTemplate="header">
      <tr style="text-align: center">
        <th pSortableColumn="cedula">Cédula <p-sortIcon field="cedula"></p-sortIcon></th>
        <th pSortableColumn="nombresCompletos">Nombre Completo <p-sortIcon field="nombresCompletos"></p-sortIcon></th>
        <th pSortableColumn="genero">Género <p-sortIcon field="genero"></p-sortIcon></th>
        <th pSortableColumn="provincia">Provincia <p-sortIcon field="provincia"></p-sortIcon></th>
        <th pSortableColumn="tipoCurso">Tipo de Curso <p-sortIcon field="tipoCurso"></p-sortIcon></th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </ng-template>

    <ng-template pTemplate="body" let-rowData>
      <tr>
        <td style="text-align: center">{{ rowData.cedula }}</td>
        <td style="text-align: center">{{ rowData.nombresCompletos }}</td>
        <td style="text-align: center">{{ rowData.genero }}</td>
        <td style="text-align: center">{{ rowData.provincia }}</td>
        <td style="text-align: center">{{ rowData.tipoCurso }}</td>
        <td style="text-align: center">
          <p-tag *ngIf="rowData.aceptado" icon="pi pi-check" severity="success" value="Aceptado"></p-tag>
          <p-tag *ngIf="!rowData.aceptado" icon="pi pi-times" severity="danger" value="Rechazado"></p-tag>
        </td>
        <td style="text-align: center">
          <button class="btn_success" (click)="aceptar(rowData)">
            <p-tag icon="pi pi-check" severity="success" value="Aceptar"></p-tag>
          </button>
          <button class="btn_danger" (click)="rechazar(rowData)">
            <p-tag icon="pi pi-times" severity="danger" value="Rechazar"></p-tag>
          </button>
        </td>
      </tr>
    </ng-template>
  </p-table>
</div>

<p-dialog
  header="Comprobante de Pago"
  [modal]="true"
  [(visible)]="Comprobante"
  [style]="{ width: '50rem' }"
  [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
  [draggable]="false"
>
  <div class="dialog-content-center">
    <p-image
      src="https://getquipu.com/wp-content/uploads/2021/10/02155904/plantilla-de-excel-recibo-de-pago-1.png"
      alt="Image"
      width="250"
      [preview]="true"
    ></p-image>
  </div>
</p-dialog>
```

### Lógica del Componente

```typescript
import { Component, OnInit } from '@angular/core';
import { UPLOAD_IMPORTS } from './ImportsModule';
import Swal from 'sweetalert2';

interface Curso {
  id: number;
  cedula: string;
  nombresCompletos: string;
  genero: string;
  provincia: string;
  tipoCurso: string;
  aceptado?: boolean;
}

@Component({
  selector: 'app-verify-data',
  standalone: true,
  imports: [UPLOAD_IMPORTS],
  templateUrl: './verify-data.component.html',
  styleUrls: ['./verify-data.component.scss'],
  providers: [],
})
export class VerifyDataComponent implements OnInit {
  data: Curso[] = [
    {
      id: 1,
      cedula: '1234567890',
      nombresCompletos: 'Juan Pérez',
      genero: 'Masculino',
      provincia: 'Pichincha',
      tipoCurso: 'Policia Nacional',
    },
    {
      id: 2,
      cedula: '0987654321',
      nombresCompletos: 'María Gómez',
      genero: 'Femenino',
      provincia: 'Guayas',
      tipoCurso: 'Policia de Transito',
    },
  ];

  searchTerm: string = '';
  filteredData: Curso[] = [];
  Comprobante: boolean = false;

  ngOnInit(): void {
    this.filteredData = this.data;
  }

  filterData(): void {
    if (this.searchTerm) {
      this.filteredData = this.data.filter(
        (curso) =>
          curso.cedula.includes(this.searchTerm) ||
          curso.nombresCompletos.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.genero.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.provincia.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.tipoCurso.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.data;
    }
  }

  filterGlobal(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      const searchValue = input.value;
      this.searchTerm = searchValue;
      this.filterData();
    }
  }

  verComprobante(rowData: Curso): void {
    this.Comprobante = true;
  }

  aceptar(rowData: Curso): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se aceptará al aspirante",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Aspirante aceptado",
          text: "Se emitirá el correo de confirmación al aspirante.",
          icon: "success"
        });
        rowData.aceptado = true;
      }
    });
  }

  rechazar(rowData: Curso): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se rechazará al aspirante.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Rechazar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Aspirante rechazado",
          text: "Se emitirá el correo al aspirante.",
          icon: "success"
        });
        rowData.aceptado = false;
      }
    });
  }
}
```

## Componente de Subida de Comprobantes

### Plantilla

```html
<div class="upload">
  <div class="upload-receipt">
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        <img
          *ngIf="!fileUrl"
          src="https://cdn-icons-png.freepik.com/512/88/88635.png"
          alt="Icono de comprobante de pago"
          class="upload-icon"
        />
        <input
          type="file"
          (change)="onFileSelected($event)"
          accept=".pdf,image/*"
          formControlName="file"
          class="file-input"
        />
      </label>
      <div *ngIf="fileUrl" class="file-preview">
        <ng-container *ngIf="isImage; else pdfTemplate">
          <img
            [src]="fileUrl"
            alt="Vista previa de la imagen"
            class="preview-image"
          />
          <

button type="button" (click)="removeFile()" class="remove-btn">Quitar archivo</button>
        </ng-container>
        <ng-template #pdfTemplate>
          <embed [src]="fileUrl" type="application/pdf" width="100%" height="500px" />
          <button type="button" (click)="removeFile()" class="remove-btn">Quitar archivo</button>
        </ng-template>
      </div>
      <button type="submit" class="upload-btn" [disabled]="!form.valid">Subir Comprobante</button>
    </form>
  </div>
</div>
```

### Lógica del Componente

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-receipt',
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.scss'],
})
export class UploadReceiptComponent implements OnInit {
  form: FormGroup;
  fileUrl: string | ArrayBuffer | null = null;
  isImage: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      file: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.fileUrl = reader.result;
        this.isImage = file.type.startsWith('image/');
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile(): void {
    this.fileUrl = null;
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Implementar lógica de subida
    }
  }
}
