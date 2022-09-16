import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { ToursService } from 'src/app/services/tours/tours.service';

@Component({
  selector: 'app-add-edit-cuenta',
  templateUrl: './add-edit-cuenta.component.html',
  styleUrls: ['./add-edit-cuenta.component.css']
})
export class AddEditCuentaComponent implements OnInit {

  myForm: FormGroup
  idCuenta: any;
  accion = 'Agregar';

  constructor(private fb: FormBuilder,
              private _toursService: ToursService,
              private _cuentasService: CuentasService,
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute ) {

    this.myForm = this.fb.group({
      cuenta_banco: [''],
      cuenta_numero: [''],
      cuenta_titular: ['']
    });

    this.idCuenta = this.aRoute.snapshot.params['id'];

   }

  ngOnInit(): void {
    if (this.idCuenta !== undefined) {
      this.accion = 'Editar';
      this.editarCuenta();
    }
  }

  agregarCuenta() {

    const CUENTA = {
      cta_banco: this.myForm.get('cuenta_banco').value,
      cta_numerocuenta: this.myForm.get('cuenta_numero').value,
      cta_nombre: this.myForm.get('cuenta_titular').value
    }

    if (this.idCuenta !== undefined){
      this._cuentasService.editCuenta(this.idCuenta, CUENTA).subscribe(datos =>{
        this.snackBar.open('El Tour ha sido editado con éxito','', {
          duration: 3000
          });
          this.route.navigate(['/dashboard/cuentas'])
      }), error => {
        this.myForm.reset();
      }
    } else {
      this._cuentasService.addCuenta(CUENTA).subscribe(datos => {
        this.snackBar.open('El Tour fue registrado con éxito','', {
          duration: 3000
          });
        this.route.navigate(['/dashboard/cuentas'])
      }), error => {
        this.myForm.reset();
      }
    }
  }

  editarCuenta() {
    this._cuentasService.getCuenta(this.idCuenta).subscribe(datos => {
      this.myForm.patchValue({
        cuenta_banco: datos.CTA_BANCO,
        cuenta_numero: datos.CTA_NUMEROCUENTA,
        cuenta_titular: datos.CTA_NOMBRE
      })
    });
  }

}

