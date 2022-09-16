import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { DevolucionesService } from 'src/app/services/devoluciones/devoluciones.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { ToursService } from 'src/app/services/tours/tours.service';

@Component({
  selector: 'app-add-edit-devolucion',
  templateUrl: './add-edit-devolucion.component.html',
  styleUrls: ['./add-edit-devolucion.component.css']
})
export class AddEditDevolucionComponent implements OnInit {

  myForm: FormGroup
  idCuenta: any;
  accion = 'Agregar';
  stateFormVar = false;
  buttonState = true;

  nombreCliente: string = null;
  cedulaCliente: number = null;
  idCliente : number = null;

  nombreTour: string = null;
  fechaTour: Date = null;
  idTour : number = null;

  cuentas = [];


  constructor(private fb: FormBuilder,
              private _clienteService: ClientesService,
              private _toursService: ToursService,
              private _cuentasService: CuentasService,
              private _reservasService: ReservasService,
              private _devolucionService: DevolucionesService,
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute ) {

    this.myForm = this.fb.group({
      tou_id: [''],
      cln_id: [''],
      rep_gr: [''],
      grp_id: [''],
      obs_gr: [''],
      aho_acom: [''],
      aho_extra: [''],
      fecha_abono1: [''],
      fecha_abono2: [''],
      fecha_abono3: [''],
      valor_abono1: [''],
      valor_abono2: [''],
      valor_abono3: [''],
      lugar_abono1: [''],
      lugar_abono2: [''],
      lugar_abono3: [''],
      obs: ['']
    });

    this.idCuenta = this.aRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
    if (this.idCuenta !== undefined) {
      this.accion = 'Editar';
      this.buttonState = false;
      this.stateFormVar = true;
      this.editarAhorro();
    }

    this._cuentasService.getCuentas().subscribe(datos => {
      this.cuentas = datos;
      console.log(this.cuentas)
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

  agregarDevolucion() {

    const DEVOLUCION = {
      
      cln_id: this.idCliente,
      tou_id: this.idTour,
      // rep_gr: this.myForm.get('rep_gr').value,
      // grp_id: this.myForm.get('grp_id').value,
      // obs_gr: this.myForm.get('obs_gr').value,
      dev_acom: this.myForm.get('aho_acom').value,
      dev_extra: this.myForm.get('aho_extra').value,
      dev_abono1: this.myForm.get('valor_abono1').value,
      dev_abono2: this.myForm.get('valor_abono2').value,
      dev_abono3: this.myForm.get('valor_abono3').value,
      dev_fecha_abono1: this.myForm.get('fecha_abono1').value,
      dev_fecha_abono2: this.myForm.get('fecha_abono2').value,
      dev_fecha_abono3: this.myForm.get('fecha_abono3').value,
      dev_cuen_abono1: this.myForm.get('lugar_abono1').value,
      dev_cuen_abono2: this.myForm.get('lugar_abono2').value,
      dev_cuen_abono3: this.myForm.get('lugar_abono3').value,
      dev_observaciones: this.myForm.get('obs').value,
      dev_cancelado: true
    }

    if (this.idCuenta !== undefined){

      this._devolucionService.editDevolucion(this.idCuenta, DEVOLUCION).subscribe(datos =>{
        this.snackBar.open('El registro ha sido editado con éxito','', {
          duration: 3000
          });
          this.route.navigate(['/dashboard/devoluciones'])
      }), error => {
        this.myForm.reset();
      }

    } else {

      this._devolucionService.addDevolucion(DEVOLUCION).subscribe(datos => {
        this.snackBar.open('La Devolución fue registrado con éxito','', {
          duration: 3000
          });
        this.route.navigate(['/dashboard/devoluciones'])
      }), error => {
        this.myForm.reset();
      }
    }
  }

  editarAhorro() {
    this._devolucionService.getDevolucion(this.idCuenta).subscribe(datos => {
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
        aho_acom: datos.DEV_ACOM,
        aho_extra: datos.DEV_EXTRA,
        fecha_abono1: datos.DEV_FECHA_ABONO1,
        fecha_abono2: datos.DEV_FECHA_ABONO2,
        fecha_abono3: datos.DEV_FECHA_ABONO3,
        valor_abono1: datos.DEV_ABONO1,
        valor_abono2: datos.DEV_ABONO2,
        valor_abono3: datos.DEV_ABONO3,
        lugar_abono1: datos.DEV_CUEN_ABONO1,
        lugar_abono2: datos.DEV_CUEN_ABONO2,
        lugar_abono3: datos.DEV_CUEN_ABONO3,
        obs: datos.DEV_OBSERVACIONES
      })
    });
  }

  stateForm(){
    this.stateFormVar = !this.stateFormVar;
  }

  buscarCliente() {
    // console.log(this.idCliente);
    this._clienteService.getClienteReserva(this.cedulaCliente).subscribe(datos => {
      this.nombreCliente = datos.CLN_NOMBRE;
      this.cedulaCliente = datos.CLN_CEDULA;
      this.idCliente = datos.CLN_ID;
      
    });
  }

  buscarTour() {
    // console.log(this.idTour);
    this._toursService.getTour(this.idTour).subscribe(datos => {
      this.nombreTour = datos.TOU_NOMBRE;
      this.fechaTour = datos.TOU_FECHA;
      this.idTour = datos.TOU_ID;
    });
  }

}
