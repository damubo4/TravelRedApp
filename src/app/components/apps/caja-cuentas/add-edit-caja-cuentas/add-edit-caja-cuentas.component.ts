import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CajaCuentasService } from 'src/app/services/caja-cuentas/caja-cuentas.service';
import { MensajeConfirmacionComponent } from '../../mensaje-confirmacion/mensaje-confirmacion.component';


@Component({
  selector: 'app-add-edit-caja-cuentas',
  templateUrl: './add-edit-caja-cuentas.component.html',
  styleUrls: ['./add-edit-caja-cuentas.component.css']
})
export class AddEditCajaCuentasComponent implements OnInit {

  myForm: FormGroup
  idRegistro: any;
  accion = 'Agregar';
  stateFormVar = false;
  
  cuentas = [];

  constructor(private fb: FormBuilder,                         
              private route: Router,
              private snackBar: MatSnackBar,             
              private _cajaCuentas: CajaCuentasService,
              public dialog: MatDialog,
              private aRoute: ActivatedRoute ) {

    this.idRegistro = this.aRoute.snapshot.params['id'];

    this.myForm = this.fb.group({
      beneficiario: ['', Validators.required],      
      concepto: ['', Validators.required],
      ingreso: [, Validators.required],
      egreso: [, Validators.required]     
    }); 
   }

  ngOnInit(): void {   
    if (this.idRegistro !== undefined) {
          this.accion = 'Editar';
          this.editarRegistro();
    }

     this.myForm.get('ingreso').valueChanges.subscribe(valor => {      
      if(valor > 0){
        this.myForm.get('egreso').setValue(0);
        this.myForm.get('egreso').disable();      
         }   
      if(valor == null){
        this.myForm.get('egreso').enable();      
        }   
       });

    this.myForm.get('egreso').valueChanges.subscribe(valor => {      
     if(valor > 0){
        this.myForm.get('ingreso').setValue(0);
        this.myForm.get('ingreso').disable();      
        }   
     if(valor == null){
        this.myForm.get('ingreso').enable();      
      }   
      });
  }   

  agregarCajaCuentas() {   
    
    if (this.idRegistro !== undefined){
      const REGISTRO = {        
        CJA_BENEFICIARIO: this.myForm.get('beneficiario').value,      
        CJA_CONCEPTO: this.myForm.get('concepto').value,      
        CJA_INGRESO: this.myForm.get('ingreso').value,
        CJA_EGRESO: this.myForm.get('egreso').value,   
        CJA_SALDO: 0  
      }
      this._cajaCuentas.editRegistroCajaCuentas(this.idRegistro, REGISTRO).subscribe(datos =>{
        this.snackBar.open('El Registro ha sido editado con éxito','', {
          duration: 3000
          });
          this.route.navigate(['/dashboard/caja-cuentas'])
      }), error => {
        this.myForm.reset();
      };

    } else {
      const REGISTRO = {
        CJA_FECHA: new Date(),
        CJA_BENEFICIARIO: this.myForm.get('beneficiario').value,      
        CJA_CONCEPTO: this.myForm.get('concepto').value,      
        CJA_INGRESO: this.myForm.get('ingreso').value,
        CJA_EGRESO: this.myForm.get('egreso').value,   
        CJA_SALDO: 0  
      }      
      const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
        width: '350px',
        data: {mensaje: 'Estas seguro de realizar el regístro?'},
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result === 'aceptar') {
          this._cajaCuentas.addCajaCuentas(REGISTRO).subscribe(datos => {
            this.snackBar.open('El registro fue realizado con éxito','', {
              duration: 3000
              });
            this.route.navigate(['/dashboard/caja-cuentas'])
          }), error => {
            this.myForm.reset();
          }        
        }
      });
    }         
  }
  
  editarRegistro() {
    this._cajaCuentas.getRegistroCajaCuentas(this.idRegistro).subscribe(datos => {
      console.log(datos)
      this.myForm.patchValue({
        beneficiario: datos.CJA_BENEFICIARIO,
        concepto: datos.CJA_CONCEPTO,
        ingreso: datos.CJA_INGRESO,
        egreso: datos.CJA_EGRESO
      })
    });
  }
}
