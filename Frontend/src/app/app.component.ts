import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './views/user/registration-form/registration-form.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadReceiptComponent } from './views/user/upload-receipt/upload-receipt.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UploadReceiptComponent,
    CommonModule,
    RegistrationFormComponent,
    NavComponent,
    FooterComponent,
    NavAdminComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'project';
  showHeader: boolean = true;
  isAdmin: boolean = false;
  showFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const loginRoute = ['/login', '/error-404'];
        const adminRoutes = ['/verificar-registros', '/finalizar-proceso'];
        const uploadReceiptRoute = '/subir-recibo/';

        const currentUrl = event.urlAfterRedirects;
        this.showHeader = !loginRoute.includes(currentUrl) && !currentUrl.startsWith(uploadReceiptRoute);
        this.showFooter = !loginRoute.includes(currentUrl) && !currentUrl.startsWith(uploadReceiptRoute);
        this.isAdmin = adminRoutes.some(route => currentUrl.startsWith(route));
      }
    });
  }


}
