import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

import { NoSessionComponent } from './share/no-session/no-session.component';
import { PlanesComponent } from './share/planes/planes.component';

const routes: Routes = [
  { path: '', 
    component: NoSessionComponent,
    pathMatch: 'full'
  },
  { path: 'planeacion',
    // canActivate: [ AngularFireAuthGuard ],
    component: PlanesComponent
    // loadChildren: () => import('./share/planes/planes.component').then( m => m.PlanesComponent)
  },
  { path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
