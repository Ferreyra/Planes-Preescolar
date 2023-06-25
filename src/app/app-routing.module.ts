import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { NoSessionComponent } from './share/no-session/no-session.component';
import { PlanesComponent } from './share/planes/planes.component';

/* const redirectUnauthorized = () => redirectUnauthorizedTo(['']);
const redirectLoggedIn = () => redirectLoggedInTo(['planeacion']); */

const routes: Routes = [
  { path: '', 
    component: NoSessionComponent,
    /* canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectLoggedIn }, */
    pathMatch: 'full'
  },
  { path: 'planeacion',
    component: PlanesComponent,
    canActivate: [ AuthGuard ],
    // data: { authGuardPipe: redirectUnauthorized },
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
