import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  
  const authService = inject(AuthService);
  const router = inject(Router);
  

  return authService.isAdmin().then(isAdmin => {
    if (isAdmin) {
      
      console.log("[AuthGuard] Admin authentifié, accès autorisé.");
      return true;
    } else {
      console.warn("[AuthGuard] Accès refusé : l'utilisateur n'est pas admin.");
      router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }).catch(error => {
    console.error("[AuthGuard] Erreur lors de la vérification de l'authentification : ", error);
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  });

  
  
}

