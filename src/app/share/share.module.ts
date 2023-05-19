import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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



@NgModule({
  declarations: [
    PlanesComponent,
    AprendizajeTreeComponent,
    BackdropComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    // FormControl,
    FormGroup,
    MatButtonModule,
    MatCardModule,
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
