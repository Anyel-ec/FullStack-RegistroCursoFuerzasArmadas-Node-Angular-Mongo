import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms'; 
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ImageModule } from 'primeng/image';

export const UPLOAD_IMPORTS = [
  CommonModule,
  FormsModule,
  TableModule,
  ButtonModule,
  InputTextModule,
  InputSwitchModule,
  TagModule,
  DialogModule,
  ToastModule,
  RippleModule,
  ImageModule
];