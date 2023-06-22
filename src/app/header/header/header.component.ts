import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public title: string = 'Planeaciones Preescolar'
  private fbs = inject(FirebaseService)
  private loggedIn: boolean;

  constructor() {
    this.loggedIn = this.fbs.isUserLoggedIn();
    console.log('constructor', this.loggedIn)
  }

}
