import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-nav-admin',
  standalone: true,
  imports: [RouterLink, MenubarModule],
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.scss'
})
export class NavAdminComponent {
  isNavActive: boolean = false;

  toggleNav(){
    this.isNavActive = !this.isNavActive;
  }

  items: MenuItem[];


  ngOnInit() {
      this.items = [
          {
            label:'Verificar Registros',
            icon: "pi pi-fw pi-search",
            routerLink: ['/verificar-registros']
          },
          {
            label:'Verificar Documentos',
            icon:'pi pi-fw pi-verified',
            routerLink: ['/finalizar-proceso']
          },
      ];
  }
}
