import { Component, EventEmitter,Output,NgModule } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormField,MatLabel } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-loggin',
  standalone: true,
  imports: [FormsModule,CommonModule,MatCardModule,
            MatError,MatFormField,MatLabel,MatToolbar,
            MatIconModule,MatInput,MatButton],
  templateUrl: './loggin.component.html',
  styleUrl: './loggin.component.css'
})
export class LogginComponent {
  userName!: string;
  password!: string;
  errorMessage!: string;
  log!: 'se connecter';

  @Output() seLoguer = new EventEmitter<string>(); 


  
  constructor(private authService: AuthService, private router:Router){
    // le construteur qui permet:
  }
  loggin(){
    if(this.authService.loggin(this.userName,this.password)){
        this.router.navigate(['/home']);
        //this.seLoguer.emit(this.loguer);
        this.authService.seloguer ="se deconnecter";
    }else{
      this.errorMessage="Nom d'utilisateur ou mot de pass incorrect";
    }
    
  }
  

  /// on loggin tableau d'authentification

  onLogin(): void {
    const loggedIn = this.authService.login(this.userName, this.password);
    if (loggedIn) {
      alert("ok SE CONNECTER")
      this.router.navigate(['/home']);
    } else {
      // Gérer les erreurs de connexion
      alert('Nom d’utilisateur ou mot de passe incorrect');
    }
  }

}
