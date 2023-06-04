import { AfterContentInit, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';

import { environment } from 'src/environments/envirionment';
import { Payload } from './payload';
import { CookieService } from './cookie.service';
import { JwtDecodeService } from './jwt-decode.service';
import { CredentialResponse } from './one-tap';

@Component({
  selector: 'one-tap',
  templateUrl: './one-tap.component.html',
  styleUrls: ['./one-tap.component.scss']
})

export class OneTapComponent implements OnInit{
  public clientId: string = environment.clientId
  private gIdCookie = {
    name: 'sid',
    value: true,
    session: true,
  };
  private response?: Payload;
  public imgUrl = signal('');
  public tokenStored?: string | null;

  constructor(public cookie: CookieService, private jwt: JwtDecodeService) {}

  // ngAfterContentInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit() {
    this.tokenStored = localStorage.getItem('token');
    if (!this.tokenStored) {
      (window as any).credencialResponse = (token: CredentialResponse) => {
        try {
          localStorage.setItem('token', token.credential);
          this.response = this.jwt.decodeJwtResponse(token.credential);
          this.cookie.setCookie(this.gIdCookie);
          this.imgUrl.set(this.response.picture);
        } catch (e) {
          console.log('Error ', e);
        }
      };
    } else {
      this.response = this.jwt.decodeJwtResponse(this.tokenStored);
      this.imgUrl.set(this.response.picture);
    }
  }

}
