import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';

import { PlanesComponent } from './planes/planes.component';
import { AprendizajeTreeComponent } from './aprendizaje-tree/aprendizaje-tree.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { HeaderComponent } from './header/header.component';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { FechasComponent } from './fechas/fechas.component';
import { ActividadComponent } from './actividad/actividad.component';
import { OneTapComponent } from './one-tap/one-tap.component';



@NgModule({
  declarations: [
    PlanesComponent,
    AprendizajeTreeComponent,
    BackdropComponent,
    HeaderComponent,
    FechasComponent,
    ActividadComponent,
    OneTapComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTreeModule,
  ],
  providers: [
    MatDatepickerIntl
  ],
  exports: [
    PlanesComponent,
    BackdropComponent,
    HeaderComponent,
  ]
})
export class ShareModule { }
