import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const admin = localStorage.getItem('admin');
    // Verifica si el usuario es admin (valor 1)
    if (admin && Number(admin) === 1) {
      return true;
    } else {
      // Redirige si no tiene permisos
      this.router.navigate(['/tabs']);
      return false;
    }
  }
}
