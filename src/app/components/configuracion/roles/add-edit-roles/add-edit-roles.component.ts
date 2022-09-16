import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles/roles.service';

@Component({
  selector: 'app-add-edit-roles',
  templateUrl: './add-edit-roles.component.html',
  styleUrls: ['./add-edit-roles.component.css']
})
export class AddEditRolesComponent implements OnInit {

  myForm: FormGroup;
  myForm2: FormGroup;
  idRol: any;
  accion = 'Agregar';
  type_input = "password";

  cargos = [
    { tag: "Administrador", value: 1 },
    { tag: "Colaborador", value: 2 }
  ]

  constructor(private fb: FormBuilder,
              private _rolesService: RolesService,
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute ) {

    this.myForm = this.fb.group({
      rol_nombre: ['', Validators.required],
      rol_apellido: [''],
      rol_cedula: ['', Validators.required],
      rol_correo: [''],
      rol_celular: [''],
      rol_password: ['', Validators.required],
      rol_cargo: ['', Validators.required],
      rol_valorCom: [0]
    });

    this.myForm2 = this.fb.group({
      pass_1: ['', Validators.required],
      pass_2: ['', Validators.required]
      
    });

    this.idRol = this.aRoute.snapshot.params['id'];

   }

  ngOnInit(): void {
    if (this.idRol !== undefined) {
      this.accion = 'Editar';
      this.editarRol();
    }
  }

  agregarRol() {

    let ROL = {
      rol_nombre: this.myForm.get('rol_nombre').value,
      rol_apellido: this.myForm.get('rol_apellido').value,
      rol_cedula: this.myForm.get('rol_cedula').value,
      rol_correo: this.myForm.get('rol_correo').value,
      rol_celular: this.myForm.get('rol_celular').value,
      rol_cargo: this.myForm.get('rol_cargo').value,
      rol_valorcomision: this.myForm.get('rol_valorCom').value,
      rol_password: this.myForm.get('rol_password').value
    };

    // console.log(ROL);

    if (this.idRol !== undefined){
      delete ROL.rol_password;
      console.log(ROL);

      this._rolesService.editRol(this.idRol, ROL).subscribe(datos =>{
        this.snackBar.open('El Rol ha sido editado con éxito','', {
          duration: 3000
          });
          this.route.navigate(['dashboard/settings/roles'])
      }), error => {
        this.myForm.reset();
      }

    } else {

      this._rolesService.addRol(ROL).subscribe(datos => {
        this.snackBar.open('El Rol fue registrado con éxito','', {
          duration: 3000
          });
        this.route.navigate(['dashboard/settings/roles'])
      }), error => {
        this.myForm.reset();
      }
    }
  }

  editarRol() {
    this._rolesService.getRol(this.idRol).subscribe(datos => {
      this.myForm.patchValue({
        rol_nombre: datos.ROL_NOMBRE,
        rol_apellido: datos.ROL_APELLIDO,
        rol_cedula: datos.ROL_CEDULA,
        rol_correo: datos.ROL_CORREO,
        rol_celular: datos.ROL_CELULAR,
        rol_cargo: datos.ROL_CARGO,
        rol_password: datos.ROL_PASSWORD,
        rol_valorcomision: datos.ROL_VALORCOMISION
      })
    });
  }

  changeEyePass() {
    if(this.type_input === "text"){
      this.type_input = "password";
      return;
    } 
    if(this.type_input === "password"){
      this.type_input = "text";
    }
  }

  cambiaPass() {
    const PASSWORD = {
      rol_id: this.idRol,
      rol_password: this.myForm2.get('pass_1').value
    }

    this._rolesService.cambiarPass(PASSWORD).subscribe(datos =>{
      this.snackBar.open('El Password editado con éxito','', {
        duration: 7000
        });
        this.route.navigate(['dashboard/settings/roles'])
    }), error => {
      this.myForm.reset();
    }
  }

}
