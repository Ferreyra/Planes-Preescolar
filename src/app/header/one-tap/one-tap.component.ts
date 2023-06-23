import { Component, OnInit, inject, signal } from '@angular/core';
import { Subscription, filter } from 'rxjs';


import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'one-tap',
  templateUrl: './one-tap.component.html',
  styleUrls: ['./one-tap.component.scss']
})

export class OneTapComponent {
  private fbs = inject(FirebaseService)
  private router = inject(Router)

  public imgUrl = signal('');
  public userName = signal('User Logo');
  
  public session$ = this.fbs.authState$.pipe(
    filter( session => session ? true : false )
  )

  async logOut() {
    await this.fbs.logOut();
    this.imgUrl.set('');
    this.userName.set('');
    this.router.navigate(['/']);
  }

}
