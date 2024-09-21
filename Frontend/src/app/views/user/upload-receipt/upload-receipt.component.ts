import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { UploadDocumentService } from '../../../services/uploadDocument/upload-document.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-receipt',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.scss'],
  providers: [UploadDocumentService],
})
export class UploadReceiptComponent implements OnInit{
  fileUrl: SafeResourceUrl | null = null;
  isImage: boolean = false;
  form: FormGroup;

  id: string | null;
  selectedFile: File | null = null;  


  constructor(
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uploadDocumentService: UploadDocumentService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      file: new FormControl('', [Validators.required]),
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          reader.result as string
        );
        this.isImage = file.type.startsWith('image/');
      };
      reader.readAsDataURL(file);
    }
  }

  clearFile(): void {
    this.fileUrl = null;
    this.isImage = false;
    this.form.get('file')?.reset();
    this.selectedFile = null;
  }

  onSubmit(): void {
    if (this.form.valid && this.selectedFile && this.id) {
      this.uploadDocumentService.updateVerifyDocument(this.id, this.selectedFile).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Documento Enviado',
            text: 'El documento se ha enviado con éxito, sera redirigido a la página principal.',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.clearFile();
              this.router.navigate(['']);
            }
          });
        },
        error => {
          console.error('Error updating document', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al enviar el documento. Por favor, intente nuevamente.',
            confirmButtonText: 'Aceptar',
          });
        }
      );
    } else {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Por favor, suba el documento antes de enviar.',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
