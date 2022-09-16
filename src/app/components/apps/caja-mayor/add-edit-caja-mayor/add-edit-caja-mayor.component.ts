import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaMayorService } from 'src/app/services/caja-mayor/caja-mayor.service';
import { CajaMenorService } from 'src/app/services/caja-menor/caja-menor.service';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { MensajeConfirmacionComponent } from '../../mensaje-confirmacion/mensaje-confirmacion.component';


@Component({
  selector: 'app-add-edit-caja-mayor',
  templateUrl: './add-edit-caja-mayor.component.html',
  styleUrls: ['./add-edit-caja-mayor.component.css']
})
export class AddEditCajaMayorComponent implements OnInit {

  myForm: FormGroup;  
  accion = 'Agregar';
  stateFormVar = false;
  buttonState = true;
  idRegistro: any;

  nombreCliente: string = null;
  cedulaCliente: number = null;
  idCliente : number = null;

  nombreTour: string = null;
  fechaTour: Date = null;
  idTour : number = null;

  valorTotal: number = null;
  valorTotalgrupal: number = null;

  cuentas = [];


  constructor(private fb: FormBuilder,                         
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute,                    
              private _cajaMayor: CajaMayorService,
              public dialog: MatDialog,
              private _cuentasService: CuentasService, ) {
               
    this.idRegistro = this.aRoute.snapshot.params['id'];

    this.myForm = this.fb.group({
      origen: ['', Validators.required],      
      destino: ['', Validators.required],
      ingreso: [, Validators.required],
      egreso: [, Validators.required],
      observacion: ['']     
    });  

   }

  ngOnInit(): void {   
    if (this.idRegistro !== undefined) {
      this.accion = 'Editar';
      this.editarRegistro();
    }   
    
    this._cuentasService.getCuentas().subscribe(datos => {
      this.cuentas = datos;      
    }); 

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


  agregarCajaMayor() {    

    if(this.idRegistro !== undefined){
      const REGISTRO = {        
        CJA_ORIGEN_CUENTA: this.myForm.get('origen').value,      
        CJA_DESTINO: this.myForm.get('destino').value,      
        CJA_INGRESO: this.myForm.get('ingreso').value,
        CJA_EGRESO: this.myForm.get('egreso').value,   
        CJA_SALDO: 0,  
        CJA_OBSERVACION: this.myForm.get('observacion').value
      };
      this._cajaMayor.editRegistroCajaMayor(this.idRegistro, REGISTRO).subscribe(datos =>{
        this.snackBar.open('El Registro ha sido editado con éxito','', {
          duration: 3000
          });
          this.route.navigate(['/dashboard/caja-mayor'])
      }), error => {
        this.myForm.reset();
      };
    } else {
      const REGISTRO = {
        CJA_FECHA: new Date(),
        CJA_ORIGEN_CUENTA: this.myForm.get('origen').value,      
        CJA_DESTINO: this.myForm.get('destino').value,      
        CJA_INGRESO: this.myForm.get('ingreso').value,
        CJA_EGRESO: this.myForm.get('egreso').value,   
        CJA_SALDO: 0,  
        CJA_OBSERVACION: this.myForm.get('observacion').value
      };
      const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
        width: '350px',
        data: {mensaje: 'Estas seguro de realizar el regístro?'},
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result === 'aceptar') {
          this._cajaMayor.addCajaMayor(REGISTRO).subscribe(datos => {
            this.snackBar.open('El registro fue realizado con éxito','', {
              duration: 7000
              });
            this.route.navigate(['/dashboard/caja-mayor'])
          }), error => {
            this.myForm.reset();
          }        
        }
      }); 
     }        
    } 

    editarRegistro() {
      this._cajaMayor.getRegistroCajaMayor(this.idRegistro).subscribe(datos => {
        console.log(datos)
        this.myForm.patchValue({
          origen: datos.CJA_ORIGEN_CUENTA,
          destino: datos.CJA_DESTINO,
          ingreso: datos.CJA_INGRESO,
          egreso: datos.CJA_EGRESO,
          observacion: datos.CJA_OBSERVACION
        })
      });
    }
}
