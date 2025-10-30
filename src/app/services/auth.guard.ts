// src/app/services/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth'; // Importe seu serviço

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Usamos o Observable 'currentUser' do nosso serviço
    return this.authService.currentUser.pipe(
      take(1), // Pega apenas o valor mais recente
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true; // Usuário está logado, permite o acesso
        }
        
        // Usuário NÃO está logado, redireciona para a página de login
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}