import { Component, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public title: string = 'Planeaciones Preescolar'
  private fbs = inject(FirebaseService)

  checkSesion() {
    let is = this.fbs.isUserLoggedIn()
    this.title = Boolean(is).toString()
  }
}
