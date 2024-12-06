import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User{
  userName: string;
  password: string;
  role: 'user' | 'admin';
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  seloguer = "se connecter";
  // tableau d'authentification
  private users: User[] = [
    { userName: 'admin', password: 'admin123', role: 'admin' },
    { userName: 'user', password: 'user123', role: 'user' },
  ];
  private loggedInUser: User | null = null;
  authService: any;

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.userName === username && u.password === password);
    if (user) {
      this.loggedInUser = user;
      
      return true;
    }
    return false;
  }
logout(): void {
    this.loggedInUser = null;
  }

  isLogged(): boolean {
    return this.loggedInUser !== null;
  }
  isAdmine(): boolean {
    return this.loggedInUser?.role === 'admin';
  }
  isUser(): boolean {
    return this.loggedInUser?.role === 'user';
  }

 //*******seconde phase************///////////// 
  loggedIn= false;
  logIn(){
    this.loggedIn=true;
  }
  logOut(){
    this.loggedIn=false;
  }
isAdmin(){
  const isUserAdmin= new Promise((resolve, reject)=>{
    resolve(this.loggedIn)
  });
  return isUserAdmin;
}
private isAuthenticated = false;
  constructor(private router:Router) { }
  loggin(userName:string,password:string): boolean|undefined {
    if(userName==="admin" && password === "admin"){
      this.isAuthenticated = true;
      localStorage.setItem('aut_token','123456789');
      return true;
    }
    return false;
  }
  loggout():void{
    this.isAuthenticated=false;
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
  isloggedIn(): boolean{
    return this.isAuthenticated || localStorage.getItem('auth_token')!==null;
  }
}
