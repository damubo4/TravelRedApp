import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AhorroService } from 'src/app/services/ahorro/ahorro.service';
import { CajaCuentasService } from 'src/app/services/caja-cuentas/caja-cuentas.service';
import { CajaMenorService } from 'src/app/services/caja-menor/caja-menor.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { ToursService } from 'src/app/services/tours/tours.service';

@Component({
  selector: 'app-add-edit-ahorro',
  templateUrl: './add-edit-ahorro.component.html',
  styleUrls: ['./add-edit-ahorro.component.css']
})
export class AddEditAhorroComponent implements OnInit {

  myForm: FormGroup
  idAhorro: any;
  accion = 'Agregar';
  stateFormVar = false;
  buttonState = true;
  iniciarReserva: boolean = true;

  nombreCliente: string = null;
  cedulaCliente: number = null;
  idCliente : number = null;

  nombreTour: string = null;
  fechaTour: Date = null;
  idTour : number = null;

  cuentas = [];


  constructor(private fb: FormBuilder,
              private _clienteService: ClientesService,              
              private _cuentasService: CuentasService,              
              private _ahorrosService: AhorroService,
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute,
              private _cajaMenor: CajaMenorService,
              private _cajaCuentas: CajaCuentasService ) {

    this.myForm = this.fb.group({
      tou_id: [''],
      cln_id: [''],
      rep_gr: [''],
      grp_id: ['0'],
      obs_gr: [''],
      aho_acom: [''],
      aho_extra: [''],
      fecha_abono1: [''],
      fecha_abono2: [''],
      fecha_abono3: [''],
      fecha_abono4: [''],
      fecha_abono5: [''],
      fecha_abono6: [''],
      valor_abono2: [0],
      valor_abono3: [0],
      valor_abono4: [0],
      valor_abono1: [0],
      valor_abono5: [0],
      valor_abono6: [0],
      lugar_abono1: [0, [Validators.required]],
      lugar_abono2: [0, [Validators.required]],
      lugar_abono3: [0, [Validators.required]],
      lugar_abono4: [0, [Validators.required]],
      lugar_abono5: [0, [Validators.required]],
      lugar_abono6: [0, [Validators.required]],
      obs: ['']
    });

    this.idAhorro = this.aRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
    if (this.idAhorro !== undefined) {
      this.accion = 'Editar';
      this.buttonState = false;
      this.stateFormVar = true;
      this.editarAhorro();
    } 

    this._cuentasService.getCuentas().subscribe(datos => {
      this.cuentas = datos;
      // console.log(this.cuentas)
    });

     this.myForm.get('rep_gr').valueChanges.subscribe(data => {
      // console.log(valorPais);
      if(data === true){
        this.myForm.get('grp_id').disable();
      }
      else if (data === false) {
        this.myForm.get('grp_id').enable();
      }
    });    
  }

  agregarAhorro() {
    const AHORRO = {           
      cln_id: this.idCliente,        
      aho_abono1: this.myForm.get('valor_abono1').value,
      aho_abono2: this.myForm.get('valor_abono2').value,
      aho_abono3: this.myForm.get('valor_abono3').value,
      aho_fecha_abono1: this.myForm.get('fecha_abono1').value,
      aho_fecha_abono2: this.myForm.get('fecha_abono2').value,
      aho_fecha_abono3: this.myForm.get('fecha_abono3').value,
      aho_cuen_abono1: this.myForm.get('lugar_abono1').value,
      aho_cuen_abono2: this.myForm.get('lugar_abono2').value,
      aho_cuen_abono3: this.myForm.get('lugar_abono3').value,
      aho_observaciones: this.myForm.get('obs').value
    }

    if (this.idAhorro !== undefined){
      this._ahorrosService.editAhorro(this.idAhorro, AHORRO).subscribe(datos =>{
        this.snackBar.open('El registro ha sido editado con éxito','', {
          duration: 7000
          });
          this.route.navigate(['/dashboard/ahorros'])
      }), error => {
        this.myForm.reset();
      }
    } else {
      this._ahorrosService.addAhorro(AHORRO).subscribe(datos => {
        this.snackBar.open('El ahorro fue registrado con éxito','', {
          duration: 7000
          });
        this.route.navigate(['/dashboard/ahorros'])
      }), error => {
        this.myForm.reset();
      }
    }
    this.addCajas();
  }

  editarAhorro() {
    this._ahorrosService.getAhorro(this.idAhorro).subscribe(datos => {
      // console.log(datos);
      this.nombreCliente = datos.CLN_NOMBRE;
      this.cedulaCliente = datos.CLN_CEDULA;
      this.idCliente = datos.CLN_ID;
      this.nombreTour = datos.TOU_NOMBRE;
      this.fechaTour = datos.TOU_FECHA;
      this.idTour = datos.TOU_ID;

      this.myForm.patchValue({
        // grp_id: datos.grp_id,
        // rep_gr: datos.rep_gr,
        // obs_gr: datos.obs_gr,
        aho_acom: datos.AHO_ACOM,
        aho_extra: datos.AHO_EXTRA,
        fecha_abono1: datos.AHO_FECHA_ABONO1,
        fecha_abono2: datos.AHO_FECHA_ABONO2,
        fecha_abono3: datos.AHO_FECHA_ABONO3,
        valor_abono1: datos.AHO_ABONO1,
        valor_abono2: datos.AHO_ABONO2,
        valor_abono3: datos.AHO_ABONO3,
        lugar_abono1: datos.AHO_CUEN_ABONO1,
        lugar_abono2: datos.AHO_CUEN_ABONO2,
        lugar_abono3: datos.AHO_CUEN_ABONO3,
        obs: datos.AHO_OBSERVACIONES
      })
    });
  }

  stateForm(){
    this.stateFormVar = !this.stateFormVar;
  }

  buscarCliente() {
    // console.log(this.idCliente);
    this._clienteService.getClienteReserva(this.cedulaCliente).subscribe({
      next: datos => {
        this.nombreCliente = datos.CLN_NOMBRE;
        this.cedulaCliente = datos.CLN_CEDULA;
        this.idCliente = datos.CLN_ID;      
        if(this.nombreCliente != null){
          this.iniciarReserva = false; }
    }, error: err => {
      this.nombreTour = null;
      this.fechaTour = null;
      this.idTour = null;
    }}
    );
  }

  addCajas() {    
    var valorCajaMenor = 0;
    var valorCajaCuentas = 0;
    //CONDICIONES PARA CAJAS      

      if(this.myForm.get('lugar_abono1').value == 3){
        valorCajaMenor = valorCajaMenor + this.myForm.get('valor_abono1').value;
      }  else if(this.myForm.get('lugar_abono1').value != 3){
        valorCajaCuentas = valorCajaCuentas + this.myForm.get('valor_abono1').value;
      }

      if(this.myForm.get('lugar_abono2').value == 3){
        valorCajaMenor = valorCajaMenor + this.myForm.get('valor_abono2').value;
      }  else if(this.myForm.get('lugar_abono2').value != 3){
        valorCajaCuentas = valorCajaCuentas + this.myForm.get('valor_abono2').value;
      }

      if(this.myForm.get('lugar_abono3').value == 3){
        valorCajaMenor = valorCajaMenor + this.myForm.get('valor_abono3').value;
      }  else if(this.myForm.get('lugar_abono3').value != 3){
        valorCajaCuentas = valorCajaCuentas + this.myForm.get('valor_abono3').value;
      }

      if(this.myForm.get('lugar_abono4').value == 3){
        valorCajaMenor = valorCajaMenor + this.myForm.get('valor_abono4').value;
      }  else if(this.myForm.get('lugar_abono4').value != 3){
        valorCajaCuentas = valorCajaCuentas + this.myForm.get('valor_abono4').value;
      }

      if(this.myForm.get('lugar_abono5').value == 3){
        valorCajaMenor = valorCajaMenor + this.myForm.get('valor_abono5').value;
      } else if(this.myForm.get('lugar_abono5').value != 3){
        valorCajaCuentas = valorCajaCuentas + this.myForm.get('valor_abono5').value;
      }        

    // valorTotal = valor1 + valor2 + valor3 + valor4 + valor5 + valor6 + valor7;
    // console.log(valorCajaMenor);
    // console.log(valorCajaCuentas);
                     
    const C_MENOR = {
      CJA_EGRESO: 0,
      CJA_SALDO: 0, //esta variable siempre se debe ir con un 0 como valor, porque asi lo requiere la bd
      CJA_INGRESO: valorCajaMenor,
      CJA_FECHA: new Date(),      
      CJA_BENEFICIARIO: this.nombreCliente,
      CJA_CONCEPTO: 'Abono'
    }

    const C_CUENTAS = {
      CJA_EGRESO: 0,
      CJA_SALDO: 0, //esta variable siempre se debe ir con un 0 como valor, porque asi lo requiere la bd
      CJA_INGRESO: valorCajaCuentas,
      CJA_FECHA: new Date(),      
      CJA_BENEFICIARIO: this.nombreCliente,
      CJA_CONCEPTO: 'Abono'
    }
    
    if(valorCajaMenor > 0){
      this._cajaMenor.addCajaMenor(C_MENOR).subscribe( datos => {  
      });
    }

    if(valorCajaCuentas > 0){
      this._cajaCuentas.addCajaCuentas(C_CUENTAS).subscribe( datos => {          
      });
    }
  }

  // statesAbono(){
  //   this.myForm.get('lugar_abono1').disable();    
  //   this.myForm.get('valor_abono1').valueChanges.subscribe(valor => {      
  //     if(valor != 0 && this.idAhorro == undefined){        
  //       this.myForm.get('lugar_abono1').enable();
  //     } 
  //     if(valor == 0 || valor == null || valor == '' || valor == '0')
  //       this.myForm.get('lugar_abono1').disable();
  //   });

  //   this.myForm.get('lugar_abono2').disable();    
  //   this.myForm.get('valor_abono2').valueChanges.subscribe(valor => {      
  //     if(valor != 0 && this.idAhorro == undefined){        
  //       this.myForm.get('lugar_abono2').enable();
  //     } 
  //     if(valor == 0 || valor == null || valor == '' || valor == '0')
  //       this.myForm.get('lugar_abono2').disable();
  //   });

  //   this.myForm.get('lugar_abono3').disable();    
  //   this.myForm.get('valor_abono3').valueChanges.subscribe(valor => {      
  //     if(valor != 0 && this.idAhorro == undefined){        
  //       this.myForm.get('lugar_abono3').enable();
  //     } 
  //     if(valor == 0 || valor == null || valor == '' || valor == '0')
  //       this.myForm.get('lugar_abono3').disable();
  //   });

  //   this.myForm.get('lugar_abono4').disable();    
  //   this.myForm.get('valor_abono4').valueChanges.subscribe(valor => {      
  //     if(valor != 0 && this.idAhorro == undefined){        
  //       this.myForm.get('lugar_abono4').enable();
  //     } 
  //     if(valor == 0 || valor == null || valor == '' || valor == '0')
  //       this.myForm.get('lugar_abono4').disable();
  //   });

  //   this.myForm.get('lugar_abono5').disable();    
  //   this.myForm.get('valor_abono5').valueChanges.subscribe(valor => {      
  //     if(valor != 0 && this.idAhorro == undefined){        
  //       this.myForm.get('lugar_abono5').enable();
  //     } 
  //     if(valor == 0 || valor == null || valor == '' || valor == '0')
  //       this.myForm.get('lugar_abono5').disable();
  //   });

  //   this.myForm.get('lugar_abono6').disable();    
  //   this.myForm.get('valor_abono6').valueChanges.subscribe(valor => {      
  //     if(valor != 0 && this.idAhorro == undefined){        
  //       this.myForm.get('lugar_abono6').enable();
  //     }
  //     if(valor == 0 || valor == null || valor == '' || valor == '0')
  //       this.myForm.get('lugar_abono6').disable(); 
  //   });
  // }

  // buscarTour() {    
  //   this._toursService.getTour(this.idTour).subscribe(datos => {
  //     this.nombreTour = datos.TOU_NOMBRE;
  //     this.fechaTour = datos.TOU_FECHA;
  //     this.idTour = datos.TOU_ID;
  //   });
  // }

}
