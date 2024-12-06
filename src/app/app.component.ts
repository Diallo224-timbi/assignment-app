import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AssignmentDetailComponent} from "./assignments/assignment-detail/assignment-detail.component";
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AuthService } from './shared/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  
  imports: [
    RouterOutlet,
    AssignmentsComponent,
    CommonModule,
    MatToolbarModule,
    MatIcon,
    MatButtonModule, MatTooltipModule, MatSidenavModule, MatListModule,
    AssignmentDetailComponent,MatCardModule,RouterOutlet,RouterLink,MatSlideToggle
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Application de gestion des dévoirs à rendre (Assignments)';
  log = "login";
  constructor (private AuthService:AuthService,private router:Router){
  }
  login(){
    if(!this.AuthService.loggedIn){
      this.AuthService.isloggedIn();
      this.log="log out"

    }else{
      this.AuthService.logOut();
      this.router.navigate(['home']);
      this.log="login";
    }
  }
  nomDevoir!: string;
  opened: boolean = false;
  ajoutActive=false;

  ngOnInit(): void{
    setTimeout(()=>{
      this.ajoutActive=true;
    },5000);
  }
  onSubmit(event:any) {
    console.log(this.nomDevoir)
  }
  toggleOpen(){
    this.opened =!this.opened
  }
  conn!:'connecter';
}
