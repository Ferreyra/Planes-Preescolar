import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from 'src/app/services/firebase.service';
import { environment } from 'src/environments/environment';
import { CredentialResponse } from 'src/interfaces/one-tap.interface';

@Component({
  templateUrl: './no-session.component.html',
  styleUrls: [ './no-session.component.scss' ],
})
export class NoSessionComponent implements OnInit {
  public clientId: string = environment.clientId;
  private fbs = inject(FirebaseService);
  private router = inject(Router);
  public loggedIn: boolean = false;

  ngOnInit(): void {
    if( this.loggedIn ) {
      console.log('onInit true')
    }
    (window as any).callback = (token: CredentialResponse) => {
      try {
        this.fbs.logIn(token.credential)
          .then( () => {
            console.log('oneTap logIn')
            this.router.navigate(['/planeacion'])
          })
          .catch( error => {
            console.log('oneTap error', error)
          });
      } catch (e) {
        console.log('token error', e);
      }
    };    
  }


}
