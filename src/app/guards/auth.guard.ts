import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afa: AngularFireAuth) {}

  canActivate(): Promise<boolean> {
    return new Promise(async (resolve) => {
      await this.afa.onAuthStateChanged((user) => {
        if (!user) {
          this.router.navigate(['login']);
        }

        resolve(user ? true : false);
      });
    });
  }
}
