import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToursService } from 'src/app/services/tours/tours.service';

@Component({
  selector: 'app-add-edit-tour',
  templateUrl: './add-edit-tour.component.html',
  styleUrls: ['./add-edit-tour.component.css']
})
export class AddEditTourComponent implements OnInit {

  myForm: FormGroup;
  idTour: any;
  accion = 'Agregar';

  constructor(private fb: FormBuilder,
              private _toursService: ToursService,
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute ) {

    this.myForm = this.fb.group({
      tou_name: [''],
      tou_tipo: [''],
      tou_fecha: [''],
      tou_valorNeto: [''],
      tou_valorCom: [''],
      tou_infante: [''],
      tou_nino: [''],
      tou_adulto: [''],
      tou_adulto_mayor: [''],
      tou_agencias: [''],
      tou_obs: [''],
      cod_aero: [''],
      hr_ida: [''],
      hr_vuelta: [''],
      fecha_ida: [''],
      fecha_vuelta: [''],
      obs_factura: ['']
    });

    this.idTour = this.aRoute.snapshot.params['id'];

   }

  ngOnInit(): void {
    if (this.idTour !== undefined) {
      this.accion = 'Editar';
      this.editarTour();
    }
  }

  agregarTour() {
    const TOUR = {
      tou_nombre: this.myForm.get('tou_name').value,
      tou_tipo: this.myForm.get('tou_tipo').value,
      tou_fecha: this.myForm.get('tou_fecha').value,
      tou_valorneto: this.myForm.get('tou_valorNeto').value,
      tou_valorcomisionable: this.myForm.get('tou_valorCom').value,
      tou_infante: this.myForm.get('tou_infante').value,
      tou_nino: this.myForm.get('tou_nino').value,
      tou_adulto: this.myForm.get('tou_adulto').value,
      tou_adulto_mayor: this.myForm.get('tou_adulto_mayor').value,
      tou_agencias: this.myForm.get('tou_agencias').value,
      tou_observaciones: this.myForm.get('tou_obs').value,
      tou_vuelo_salida: this.myForm.get('fecha_ida').value,
      tou_hora_salida: this.myForm.get('hr_ida').value,
      tou_vuelo_regreso: this.myForm.get('fecha_vuelta').value,
      tou_hora_regreso: this.myForm.get('hr_vuelta').value,
      tou_observaciones_factura: this.myForm.get('obs_factura').value,
      tou_codigo_aerolinea: this.myForm.get('cod_aero').value
    };    

    if (this.idTour !== undefined){
      this._toursService.editTour(this.idTour, TOUR).subscribe(datos =>{
        this.snackBar.open('El Tour ha sido editado con éxito','', {
          duration: 3000
          });
          this.route.navigate(['dashboard/tours'])
      }), error => {
        this.myForm.reset();
      }

    } else {
      this._toursService.addTour(TOUR).subscribe(datos => {
        this.snackBar.open('El Tour fue registrado con éxito','', {
          duration: 3000
          });
        this.route.navigate(['dashboard/tours'])
      }), error => {
        this.myForm.reset();
      }
    }
  }

  editarTour() {
    this._toursService.getTour(this.idTour).subscribe(datos => {
      this.myForm.patchValue({
        tou_name: datos.TOU_NOMBRE,
        tou_tipo: datos.TOU_TIPO,
        tou_fecha: datos.TOU_FECHA,
        tou_valorNeto: datos.TOU_VALORNETO,
        tou_valorCom: datos.TOU_VALORCOMISIONABLE,
        tou_infante: datos.TOU_INFANTE,
        tou_nino: datos.TOU_NINO,
        tou_adulto: datos.TOU_ADULTO,
        tou_adulto_mayor: datos.TOU_ADULTO_MAYOR,
        tou_agencias: datos.TOU_AGENCIAS,
        tou_obs: datos.TOU_OBSERVACIONES,
        cod_aero: datos.TOU_CODIGO_AEROLINEA,
        fecha_ida: datos.TOU_VUELO_SALIDA,
        fecha_vuelta: datos.TOU_VUELO_REGRESO,
        hr_ida: datos.TOU_HORA_SALIDA,
        hr_vuelta: datos.TOU_HORA_REGRESO
      })
    });
  }

}
