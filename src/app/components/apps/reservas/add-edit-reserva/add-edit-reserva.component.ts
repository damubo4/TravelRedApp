import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CajaCuentasService } from 'src/app/services/caja-cuentas/caja-cuentas.service';
import { CajaMenorService } from 'src/app/services/caja-menor/caja-menor.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { ToursService } from 'src/app/services/tours/tours.service';



@Component({
  selector: 'app-add-edit-reserva',
  templateUrl: './add-edit-reserva.component.html',
  styleUrls: ['./add-edit-reserva.component.css']
})
export class AddEditReservaComponent implements OnInit {

  myForm: FormGroup
  idReserva: any;
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

  valorUnitario: number = null;
  valorTotal: number = null;
  valorTotalgrupal: number = null;
  valorComisionable: number = null;

  valor_infante: number = null;
  valor_nino: number = null;
  valor_adulto: number = null;
  valor_adultoMayor: number = null;
  valor_agencias: number = null;

  cuentas = [];


  constructor(private fb: FormBuilder,
              private _clienteService: ClientesService,
              private _toursService: ToursService,
              private _reservasService: ReservasService,
              private _cuentasService: CuentasService,
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute,              
              private _cajaMenor: CajaMenorService,
              private _cajaCuentas: CajaCuentasService ) {

    this.myForm = this.fb.group({
      id_gr: [0],      
      sup_acom: [0],
      sup_acom_cuen: ['', [Validators.required]],
      sup_extra: [0],
      sup_extra_cuen: ['', [Validators.required]],
      grupo_edad: [0],
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
      obs: [''],
      obs_factura: ['']
    });
    this.idReserva = this.aRoute.snapshot.params['id'];
   }

  ngOnInit(): void {    

    if (this.idReserva !== undefined) {
      this.accion = 'Editar';
      this.buttonState = false;
      this.stateFormVar = true;
      this.editarReserva();      
      // this.myForm.get('sup_acom').disable();
      // this.myForm.get('sup_extra').disable();
      // this.myForm.get('valor_abono1').disable();
      // this.myForm.get('valor_abono2').disable();
      // this.myForm.get('valor_abono3').disable();
      // this.myForm.get('valor_abono4').disable();
      // this.myForm.get('valor_abono5').disable();
      // this.myForm.get('valor_abono6').disable();
      // this.myForm.get('fecha_abono1').disable();
      // this.myForm.get('fecha_abono2').disable();
      // this.myForm.get('fecha_abono3').disable();
      // this.myForm.get('fecha_abono4').disable();
      // this.myForm.get('fecha_abono5').disable();
      // this.myForm.get('fecha_abono6').disable();
      // this.myForm.get('grupo_edad').disable();
    }  

    this._cuentasService.getCuentas().subscribe(datos => {
      this.cuentas = datos;  
      this.cuentas.shift();    
    });    
    
    // this.myForm.get('sup_acom_cuen').disable();    
    // this.myForm.get('sup_acom').valueChanges.subscribe(valor => {      
    //   if(valor != 0 && this.idReserva == undefined){        
    //     this.myForm.get('sup_acom_cuen').enable();
    //   }
    //   if(valor == 0 || valor == null || valor == '' || valor == '0')
    //     this.myForm.get('sup_acom_cuen').disable();
    // });

    // this.myForm.get('sup_extra_cuen').disable();    
    // this.myForm.get('sup_extra').valueChanges.subscribe(valor => {      
    //   if(valor != 0 && this.idReserva == undefined){        
    //     this.myForm.get('sup_extra_cuen').enable();
    //   } 
    //   if(valor == 0 || valor == null || valor == '' || valor == '0')
    //     this.myForm.get('sup_extra_cuen').disable();
    // });

    // this.myForm.get('lugar_abono1').disable();    
    // this.myForm.get('valor_abono1').valueChanges.subscribe(valor => {      
    //   if(valor != 0 && this.idReserva == undefined){        
    //     this.myForm.get('lugar_abono1').enable();
    //   } 
    //   if(valor == 0 || valor == null || valor == '' || valor == '0')
    //     this.myForm.get('lugar_abono1').disable();
    // });

    // this.myForm.get('lugar_abono2').disable();    
    // this.myForm.get('valor_abono2').valueChanges.subscribe(valor => {      
    //   if(valor != 0 && this.idReserva == undefined){        
    //     this.myForm.get('lugar_abono2').enable();
    //   } 
    //   if(valor == 0 || valor == null || valor == '' || valor == '0')
    //     this.myForm.get('lugar_abono2').disable();
    // });

    // this.myForm.get('lugar_abono3').disable();    
    // this.myForm.get('valor_abono3').valueChanges.subscribe(valor => {      
    //   if(valor != 0 && this.idReserva == undefined){        
    //     this.myForm.get('lugar_abono3').enable();
    //   } 
    //   if(valor == 0 || valor == null || valor == '' || valor == '0')
    //     this.myForm.get('lugar_abono3').disable();
    // });

    // this.myForm.get('lugar_abono4').disable();    
    // this.myForm.get('valor_abono4').valueChanges.subscribe(valor => {      
    //   if(valor != 0 && this.idReserva == undefined){        
    //     this.myForm.get('lugar_abono4').enable();
    //   } 
    //   if(valor == 0 || valor == null || valor == '' || valor == '0')
    //     this.myForm.get('lugar_abono4').disable();
    // });

    // this.myForm.get('lugar_abono5').disable();    
    // this.myForm.get('valor_abono5').valueChanges.subscribe(valor => {      
    //   if(valor != 0 && this.idReserva == undefined){        
    //     this.myForm.get('lugar_abono5').enable();
    //   } 
    //   if(valor == 0 || valor == null || valor == '' || valor == '0')
    //     this.myForm.get('lugar_abono5').disable();
    // });

    // this.myForm.get('lugar_abono6').disable();    
    // this.myForm.get('valor_abono6').valueChanges.subscribe(valor => {      
    //   if(valor != 0 && this.idReserva == undefined){        
    //     this.myForm.get('lugar_abono6').enable();
    //   }
    //   if(valor == 0 || valor == null || valor == '' || valor == '0')
    //     this.myForm.get('lugar_abono6').disable(); 
    // });
  }      

  agregarReserva() {
    const RESERVA = {
      cln_id: this.idCliente,            
      dev_id: 11,      
      grp_id: this.myForm.get('id_gr').value,
      rol_id: localStorage.getItem('idRol'),      
      tou_id: this.idTour,      
      res_acom: this.myForm.get('sup_acom').value,
      res_acom_cuent: this.myForm.get('sup_acom_cuen').value,
      res_extra: this.myForm.get('sup_extra').value,
      res_extra_cuent: this.myForm.get('sup_extra_cuen').value,
      res_abono1: this.myForm.get('valor_abono1').value,
      res_abono2: this.myForm.get('valor_abono2').value,
      res_abono3: this.myForm.get('valor_abono3').value,
      res_abono4: this.myForm.get('valor_abono4').value,
      res_abono5: this.myForm.get('valor_abono5').value,
      res_abono6: this.myForm.get('valor_abono6').value,
      res_fecha_abono1: this.myForm.get('fecha_abono1').value,
      res_fecha_abono2: this.myForm.get('fecha_abono2').value,
      res_fecha_abono3: this.myForm.get('fecha_abono3').value,
      res_fecha_abono4: this.myForm.get('fecha_abono4').value,
      res_fecha_abono5: this.myForm.get('fecha_abono5').value,
      res_fecha_abono6: this.myForm.get('fecha_abono5').value,
      res_cuen_abono1: this.myForm.get('lugar_abono1').value,
      res_cuen_abono2: this.myForm.get('lugar_abono2').value,
      res_cuen_abono3: this.myForm.get('lugar_abono3').value,
      res_cuen_abono4: this.myForm.get('lugar_abono4').value,
      res_cuen_abono5: this.myForm.get('lugar_abono5').value,
      res_cuen_abono6: this.myForm.get('lugar_abono6').value,
      res_valor_total: this.valorComisionable + this.myForm.get('sup_acom').value + this.myForm.get('sup_extra').value,
      res_observaciones: this.myForm.get('obs').value,
      res_observaciones_factura: this.myForm.get('obs_factura').value,
      res_valor_unitario: this.myForm.get('grupo_edad').value      
    }

    // console.log(RESERVA);

    if (this.idReserva !== undefined){

      this._reservasService.editReserva(this.idReserva, RESERVA).subscribe(datos =>{
        this.snackBar.open('La reserva ha sido editada con éxito','', {
          duration: 3000
          });
          this.route.navigate(['/dashboard/reservas'])
      }), error => {
        this.myForm.reset();
      }

    } else {

      this._reservasService.addReserva(RESERVA).subscribe(datos => {
        this.snackBar.open('La reserva fue registrada con éxito','', {
          duration: 3000
          });
        this.route.navigate(['/dashboard/reservas'])
      }), error => {
        this.myForm.reset();
      }
    }
    this.addCajas();
  }

  editarReserva() {
    this._reservasService.getReserva(this.idReserva).subscribe(datos => {
      // console.log(datos);      
      this.nombreCliente = datos.CLN_NOMBRE;
      this.cedulaCliente = datos.CLN_CEDULA;
      this.idCliente = datos.CLN_ID;
      this.nombreTour = datos.TOU_NOMBRE;
      this.fechaTour = datos.TOU_FECHA;
      this.idTour = datos.TOU_ID;

      this.myForm.patchValue({
        id_gr: datos.GRP_ID,
        rep_gr: datos.LIDER,        
        sup_acom: datos.RES_ACOM,
        sup_extra: datos.RES_EXTRA,
        fecha_abono1: datos.RES_FECHA_ABONO1,
        fecha_abono2: datos.RES_FECHA_ABONO2,
        fecha_abono3: datos.RES_FECHA_ABONO3,
        fecha_abono4: datos.RES_FECHA_ABONO4,
        fecha_abono5: datos.RES_FECHA_ABONO5,
        valor_abono1: datos.RES_ABONO1,
        valor_abono2: datos.RES_ABONO2,
        valor_abono3: datos.RES_ABONO3,
        valor_abono4: datos.RES_ABONO4,
        valor_abono5: datos.RES_ABONO5,
        lugar_abono1: datos.RES_CUEN_ABONO1,
        lugar_abono2: datos.RES_CUEN_ABONO2,
        lugar_abono3: datos.RES_CUEN_ABONO3,
        lugar_abono4: datos.RES_CUEN_ABONO4,
        lugar_abono5: datos.RES_CUEN_ABONO5,
        obs: datos.RES_OBSERVACIONES        
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
      }, error: err => {
        console.log(err);
        this.nombreCliente = null;
        this.cedulaCliente = null;
        this.idCliente = null;
    }},
    );    
  }

  buscarTour() {       
    this._toursService.getTour(this.idTour).subscribe({
      next: datos => {
        this.nombreTour = datos.TOU_NOMBRE;
        this.fechaTour = datos.TOU_FECHA;
        this.idTour = datos.TOU_ID;        
        this.valorComisionable = datos.TOU_VALORCOMISIONABLE;
        this.valor_infante = datos.TOU_INFANTE;
        this.valor_nino = datos.TOU_NINO;
        this.valor_adulto = datos.TOU_ADULTO;
        this.valor_adultoMayor = datos.TOU_ADULTO_MAYOR;
        this.valor_agencias = datos.TOU_AGENCIAS;
        if(this.nombreCliente != null && this.nombreTour != null){
          this.iniciarReserva = false;         
        }
      }, error: err =>{
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
         
      if(this.myForm.get('sup_acom_cuen').value == 3){
        valorCajaMenor = valorCajaMenor + this.myForm.get('sup_acom').value;
      } else if(this.myForm.get('sup_acom_cuen').value != 3){
        valorCajaCuentas = valorCajaCuentas + this.myForm.get('sup_acom').value;
      }

      if(this.myForm.get('sup_extra_cuen').value == 3){
        valorCajaMenor = valorCajaMenor + this.myForm.get('sup_extra').value;
      }  else if(this.myForm.get('sup_extra_cuen').value != 3){
        valorCajaCuentas = valorCajaCuentas + this.myForm.get('sup_extra').value;
      }

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
      CJA_CONCEPTO: this.nombreTour
    }

    const C_CUENTAS = {
      CJA_EGRESO: 0,
      CJA_SALDO: 0, //esta variable siempre se debe ir con un 0 como valor, porque asi lo requiere la bd
      CJA_INGRESO: valorCajaCuentas,
      CJA_FECHA: new Date(),      
      CJA_BENEFICIARIO: this.nombreCliente,
      CJA_CONCEPTO: this.nombreTour
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
}
