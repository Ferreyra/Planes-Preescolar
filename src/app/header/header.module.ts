import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { OneTapComponent } from './one-tap/one-tap.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    HeaderComponent,
    OneTapComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule { }
