import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  isLogged: boolean = false;
  idLogin: number;

  constructor(private fb: FormBuilder,
              private route: Router,
              private snackBar: MatSnackBar,
              private _loginService: LoginService) {

        this.myForm = this.fb.group({
          log_cedula: ['', Validators.required],
          log_pass: ['', Validators.required]                 
        });
        }

  ngOnInit(): void {
  }

  loginCliente() {
    const LOGIN = {
      cedula: this.myForm.get('log_cedula').value,
      pass: this.myForm.get('log_pass').value
    }
    
    this._loginService.login(LOGIN).subscribe(
      {next:
        data => {   
          
        this.idLogin = data.ROL_ID;
        console.log(this.idLogin);
        this._loginService.idLogin$.emit(this.idLogin);
        localStorage.setItem('token', data.token); 
        localStorage.setItem('idRol', data.ROL_ID); 
        // this._loginService.setToken(data.token);
        this.route.navigate(['/dashboard/home']);           
        
      }, error: (error) => {
        this.snackBar.open('La cédula o password son incorrectos','', {
          duration: 3000
        });
      },         
      } 
  ); 
 }
}
