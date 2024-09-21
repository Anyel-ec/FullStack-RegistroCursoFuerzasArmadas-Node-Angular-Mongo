import { Component, OnInit } from '@angular/core';
import { UPLOAD_IMPORTS } from './importsModule';
import Swal from 'sweetalert2';
import { VerifyDocumentService } from '../../../services/verifyDocument/verify-document.service';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface VerifiDocument {
  id: string;
  cedula: string;
  nombresCompletos: string;
  tipoCurso: string;
  notaGrado: number;
  documento: string;
  estadoVerificacion: string;
  estadoDocumento: string;
  typeDocument: string;
}

@Component({
  selector: 'app-end-process',
  standalone: true,
  imports: [UPLOAD_IMPORTS, HttpClientModule],
  templateUrl: './end-process.component.html',
  styleUrls: ['./end-process.component.scss'],
  providers: [VerifyDocumentService],
})
export class EndProcessComponent implements OnInit {

  data: VerifiDocument[] = [];
  searchTerm: string = '';
  filteredData: VerifiDocument[] = [];

  Comprobante: boolean = false;
  selectedDocumentUrl: SafeUrl = '';
  selectedDocument: VerifiDocument | null = null;

  constructor(private VerifyDocumentService: VerifyDocumentService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.VerifyDocumentService.getRelationsVerifyDocument().subscribe(
      (response) => {
        this.data = response.map((item: any) => ({
          id: item._id,
          cedula: item.identification,
          nombresCompletos: item.name,
          tipoCurso: item.commandType,
          notaGrado: item.gradeNote,
          documento: item.document,
          estadoVerificacion: item.verifyDocumentState,
          estadoDocumento: item.uploadDocumentState,
          typeDocument: item.typeDocument
        }));
        this.filteredData = this.data;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  filterData(): void {
    if (this.searchTerm) {
      this.filteredData = this.data.filter(
        (curso) =>
          curso.id.toString().includes(this.searchTerm) ||
          curso.cedula.includes(this.searchTerm) ||
          curso.nombresCompletos
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          curso.tipoCurso
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          curso.estadoVerificacion
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          curso.estadoDocumento
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
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

  verComprobante(rowData: VerifiDocument): void {
    this.Comprobante = true;
    this.selectedDocument = rowData;
    console.log(rowData.documento);
    console.log(rowData.typeDocument);
    // Verifica y sanitiza la URL del documento
    if (rowData.typeDocument.startsWith('image/')) {
      this.selectedDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${rowData.typeDocument};base64,${rowData.documento}`);
    } else {
      this.selectedDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${rowData.typeDocument};base64,${rowData.documento}`);
    }
  }

  updateVerifyData(id: string, updatedData: any): void {
    this.VerifyDocumentService.updateVerifyDocument(id, updatedData).subscribe(
      (response) => {
        console.log('Dato actualizado:', response);
      },
      (error) => {
        console.error('Error al actualizar el dato:', error);
      }
    );
  }

  aceptar(rowData: VerifiDocument): void {
    if (rowData.estadoVerificacion === 'Pendiente') {
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Se aceptará la inscripcion del aspirante.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedData = {
            updated_at: new Date()
          };
          this.updateVerifyData(rowData.id, updatedData);
          Swal.fire({
            title: 'Inscripcion aceptada',
            text: 'Se emitira el correo de confirmación al aspirante.',
            icon: 'success',
          }).then(() => {
            this.updateTable();
          });
        }
      });
    }
  }

  deleteVerifyDocument(id: string): void {
    this.VerifyDocumentService.deleteVerifyDocument(id).subscribe(
      (response) => {
        console.log('Dato eliminado:', response);
      },
      (error) => {
        console.error('Error al eliminar el dato:', error);
      }
    );
  }

  rechazar(rowData: VerifiDocument): void {
    if (rowData.estadoVerificacion === 'Pendiente') {
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Se rechazara la inscripcion del aspirante.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Rechazar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteVerifyDocument(rowData.id);
          Swal.fire({
            title: 'Inscripcion rechazada',
            text: 'Se emitira el correo al aspirante.',
            icon: 'success',
          }).then(() => {
            this.updateTable();
          });
        }
      });
    }
  }

  reenviarEnlace(id: string): void {
    this.VerifyDocumentService.updateUploadDocumentAgain(id).subscribe(
      (response) => {
        console.log('Correo Reenviado:', response);
      },
      (error) => {
        console.error('Error al reeviar el correo:', error);
      }
    );
  }

  reenviarEnlaceAlert(rowData: VerifiDocument): void {
    if (rowData.estadoVerificacion === 'Pendiente') {
      Swal.fire({
        title: '¿Está seguro?',
        text: 'Se reenviará el enlace para que el aspirante suba el documento nuevamente.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Reenviar enlace',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.reenviarEnlace(rowData.id);
          Swal.fire({
            title: 'Enlace reenviado',
            text: 'Se ha enviado el correo al aspirante con el enlace para subir el documento.',
            icon: 'success'
          });
        }
      });
    }
  }
  
  updateTable(): void {
    this.fetchData();
    this.filterData();
  }
}
