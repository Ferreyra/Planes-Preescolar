import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { Observable, Observer, Subscription, catchError, from, map, of, tap, throwError } from 'rxjs';

import { FirebaseApp } from '@angular/fire/app';
import { getFirestore, doc, getDoc, collection, collectionData, DocumentData, query, where } from '@angular/fire/firestore';
import { Auth, authState, GoogleAuthProvider, signInWithCredential, signOut, User } from '@angular/fire/auth';

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
  
  private authObserver?: Observer<User | null>  = {
    next: (user: User | null) => {
      console.log('fbsUser', user)
      this.user = user;
      this.isUserLoggedIn.set(user ? true : false)
    },
    error: (error: any) => {console.log('authState', error);},
    complete: () => {console.log('authStateComplete');},
  };

  constructor() {  
    this.session$ = this.authState$.subscribe( this.authObserver );
  }

  userAuth$(idToken: string): Observable< User > {
    // Autenticar al usuario en Firebase Authentication usando el ID token
    const credential = GoogleAuthProvider.credential(idToken);
    return from( signInWithCredential( this.auth, credential ))
      .pipe(
        tap( userCred => {
          console.log('signIn', userCred)
        }),
        map( userCred => userCred.user ),
        catchError( err => {
          console.log('signin error', err);
          return throwError( () => err.error )
        } )
    )
  }

  logIn( token: string ) {
    const credential = GoogleAuthProvider.credential(token)
    return signInWithCredential(this.auth, credential)
  }

  logOut() {
    return signOut(this.auth);
  }

  get currentUser(): User | undefined{
    if(!this.user) return undefined
    return structuredClone( this.user )
  }

  docFirebase (path: string, document: string){
    const docReference = doc(this.db, path, document);
    return getDoc(docReference) 
  }

  getCollection(path: string, filter?: string): Observable<DocumentData[]> {
    const collectionInstance = collection(this.db, path);
    let q = query( collectionInstance )
    if( filter ) {
      q = query( collectionInstance, where('fecha', '==', filter) )
    }
    return collectionData(collectionInstance)
  }

  ngOnDestroy(): void {
    this.session$.unsubscribe();   
  }

}
