import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: any;
  currentUser: any;

  constructor(public AfAuth: AngularFireAuth, private router: Router) { }
  readonly ISLOGGEDKEY = 'islogged';
  public urlUsuarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  async loginGoogle(){
    try{
      return this.AfAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res:any) => {
        console.log(res);
        if(res.user.emailVerified)
        { 
          this.router.navigate(['/dashboards/dashboard1']);
        }
      });
    }catch (error){
      console.log(error);
    }
  }
    
  login() {
    localStorage.setItem(this.ISLOGGEDKEY, 'true');
    console.log("entro");
    this.changeLoginStatusSubject.next(true);
    this.router.navigate(['/dashboards/dashboard1']);
  }

  register(){

  }

  logout() {
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);
  }

  isLoggedIn(url: string) {
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    if (!isLogged) {
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
}