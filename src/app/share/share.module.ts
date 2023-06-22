import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';

import { PlanesComponent } from './planes/planes.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { FechasComponent } from './fechas/fechas.component';
import { ActividadComponent } from './actividad/actividad.component';
import { NoSessionComponent } from './no-session/no-session.component';



@NgModule({
  declarations: [
    ActividadComponent,
    BackdropComponent,
    FechasComponent,
    NoSessionComponent,
    PlanesComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTreeModule,
    ReactiveFormsModule,
  ],
  providers: [
    MatDatepickerIntl,
  ],
  exports: [
    BackdropComponent,
  ]
})
export class ShareModule { }
