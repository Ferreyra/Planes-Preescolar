import { Injectable } from '@angular/core';
import { Payload } from './payload';

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {
  constructor() { }
  
  public decodeJwtResponse(token: string): Payload {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
