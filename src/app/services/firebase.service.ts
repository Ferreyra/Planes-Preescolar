import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { Observable, Subscription, from, map, of, tap } from 'rxjs';

import { FirebaseApp } from '@angular/fire/app';
import { getFirestore, doc, getDoc, collection, collectionData, DocumentData } from '@angular/fire/firestore';
import { Auth, authState, GoogleAuthProvider, signInWithCredential, signOut, User, user } from '@angular/fire/auth';

export interface Item {
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseService implements OnDestroy {
  private auth = inject(Auth);
  private fbApp = inject(FirebaseApp);
  
  private user: User | null = null;
  public isUserLoggedIn = signal(false)
  public authState$ = authState(this.auth)  
  private db = getFirestore(this.fbApp);
  private session$: Subscription;
  // private calendario?: Promise<DocumentData | undefined>;

  constructor() {  
    this.session$ = this.authState$.subscribe( (user) => {      
      console.log('fbsUser', user)
      this.user = user;
      this.isUserLoggedIn.set(user ? true : false)
    });
  }

  userAuth$(idToken: string): Observable< User > {
    // Autenticar al usuario en Firebase Authentication usando el ID token
    const credential = GoogleAuthProvider.credential(idToken);
    return from( signInWithCredential( this.auth, credential ))
      .pipe(
        tap( userCred => {
          console.log('signIn', userCred)
        }),
        map( userCred => userCred.user )
    )
  }

  logIn( token: string ) {
    const credential = GoogleAuthProvider.credential(token)
    return signInWithCredential(this.auth, credential)
  }

  logOut() {
    return signOut(this.auth);
  }

  get curretUser(): User | undefined{
    if(!this.user) return undefined
    return structuredClone( this.user )
  }

  docFirebase (path: string, document: string){
    const docReference = doc(this.db, path, document);
    return getDoc(docReference) 
  }

  getColletion(path: string): Observable<DocumentData[]> {
    const collectionInstance = collection(this.db, path);
    return collectionData(collectionInstance)
  }

  ngOnDestroy(): void {
    this.session$.unsubscribe();   
  }

}
