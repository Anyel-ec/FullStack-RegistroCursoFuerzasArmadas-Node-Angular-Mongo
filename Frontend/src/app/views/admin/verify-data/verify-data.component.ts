import { Component, OnInit } from '@angular/core';
import { UPLOAD_IMPORTS } from './ImportsModule';
import Swal from 'sweetalert2';
import { VerifyDataService } from '../../../services/verifyData/verify-data.service';
import { HttpClientModule } from '@angular/common/http';

interface verifyData {
  id: string;
  cedula: string;
  nombresCompletos: string;
  genero: string;
  provincia: string;
  tipoCurso: string;
  estado: string; 
}

@Component({
  selector: 'app-verify-data',
  standalone: true,
  imports: [UPLOAD_IMPORTS, HttpClientModule],
  templateUrl: './verify-data.component.html',
  styleUrls: ['./verify-data.component.scss'],
  providers: [VerifyDataService],
})
export class VerifyDataComponent implements OnInit {

  data: verifyData[] = [];
  searchTerm: string = '';
  filteredData: verifyData[] = [];

  constructor(private verifyDataService: VerifyDataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.verifyDataService.getRelationsVerifyData().subscribe(
      (response) => {
        this.data = response.map((item: any) => ({
          id: item._id,
          cedula: item.identification,
          nombresCompletos: item.name,
          genero: item.gender,
          provincia: item.province,
          tipoCurso: item.commandType,
          estado: item.state
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
          curso.cedula.includes(this.searchTerm) ||
          curso.nombresCompletos.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.genero.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.provincia.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.tipoCurso.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.estado.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  updateVerifyData(id: string, updatedData: any): void {
    this.verifyDataService.updateVerifyData(id, updatedData).subscribe(
      (response) => {
        console.log('Dato actualizado:', response);
      },
      (error) => {
        console.error('Error al actualizar el dato:', error);
      }
    );
  }

  aceptar(rowData: verifyData): void {
    console.log('Aceptar:', rowData);
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
        const updatedData = {
          updated_at: new Date()
        };
        this.updateVerifyData(rowData.id, updatedData);

        Swal.fire({
          title: "Aspirante aceptado",
          text: "Se emitirá el correo de confirmación al aspirante.",
          icon: "success"
        }).then(() => {
          this.updateTable();
        });
      }
    });
  }

  deleteVerifyData(id: string): void {
    this.verifyDataService.deleteVerifyData(id).subscribe(
      (response) => {
        console.log('Dato eliminado:', response);
      },
      (error) => {
        console.error('Error al eliminar el dato:', error);
      }
    );
  }

  rechazar(rowData: verifyData): void {
    console.log('Declinar:', rowData);
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
        this.deleteVerifyData(rowData.id); 
        Swal.fire({
          title: "Aspirante rechazado",
          text: "Se emitirá el correo al aspirante.",
          icon: "success"
        }).then(() => {
          this.updateTable();
        });
      }
    });
  }

  updateTable(): void {
    this.fetchData();
    this.filterData();
  }
}
