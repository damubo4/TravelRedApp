import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  rolNombre: any;
  rolCedula: any;
  idRol: any;
  

  constructor(private _loginService: LoginService,
              private route: Router,
              ) { }

  ngOnInit(): void {       
    this.userLogin2(); 
  } 

  ngOnChanges(): void {
  //  this.userLogin(); 
  }  

  logOut() {
    this._loginService.deleteToken(); //borramos lo que hay en LocalStorage
    this._loginService.logout().subscribe( data => { 
      this.route.navigate(['/login']);      
    });
  }

  userLogin2() {
    this.idRol = localStorage.getItem('idRol');
    this._loginService.getRolData(this.idRol).subscribe(dataUserRol => { 
      // console.log(dataUserRol);       
      this.rolNombre = dataUserRol.ROL_NOMBRE;
      this.rolCedula = dataUserRol.ROL_CEDULA;            
    })
  }

  // userLogin() {      
  //   this._loginService.idLogin$.subscribe( idUserRol => {  
  //       this.idRol = idUserRol;  
  //       console.log(idUserRol);      
  //       // this.userLogin2(this.idRol);
  //   })            
  // }  

}
