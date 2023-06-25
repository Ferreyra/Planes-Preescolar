import { Component, NgZone, OnInit, inject } from '@angular/core';
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
  private _ngZone = inject(NgZone)
  private fbs = inject(FirebaseService);
  private router = inject(Router);
  public loggedIn: boolean = false;

  ngOnInit(): void {
    
    (window as any).callback = (token: CredentialResponse) => {   
      try {
        this.fbs.logIn(token.credential)
          .then( () => {
            console.log('oneTap logIn')
            this._ngZone.run( () => {
              this.router.navigate(['/planeacion'])
            })
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
