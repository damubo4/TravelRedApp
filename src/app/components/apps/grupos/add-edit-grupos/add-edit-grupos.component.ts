import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { ToursService } from 'src/app/services/tours/tours.service';

@Component({
  selector: 'app-add-edit-grupos',
  templateUrl: './add-edit-grupos.component.html',
  styleUrls: ['./add-edit-grupos.component.css']
})
export class AddEditGruposComponent implements OnInit {

  myForm: FormGroup
  idGrupo: any;
  accion = 'Agregar';

  nombreCliente: string = null;
  cedulaCliente: number = null;
  idCliente : number = null;

  constructor(private fb: FormBuilder,
              private _gruposService: GrupoService,
              private route: Router,
              private _clienteService: ClientesService,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute ) {

    this.myForm = this.fb.group({
      grp_obs: ['']
    });

    this.idGrupo = this.aRoute.snapshot.params['id'];

   }

  ngOnInit(): void {
    if (this.idGrupo !== undefined) {
      this.accion = 'Editar';
      this.editarGrupo();
    }
  }

  agregarGrupo() {

    const GRUPO = {      
      CLN_ID: this.idCliente,
      GRP_OBSERVACION: this.myForm.get('grp_obs').value
    }

    if (this.idGrupo !== undefined){

      this._gruposService.editGrupo(this.idGrupo, GRUPO).subscribe(datos =>{
        this.snackBar.open('El Grupo ha sido editado con éxito','', {
          duration: 3000
          });
          this.route.navigate(['/dashboard/grupos'])
      }), error => {
        this.myForm.reset();
      }

    } else {

      this._gruposService.addGrupo(GRUPO).subscribe(datos => {
        this.snackBar.open('El Grupo fue registrado con éxito','', {
          duration: 3000
          });
        this.route.navigate(['/dashboard/grupos'])
      }), error => {
        this.myForm.reset();
      }
    }
  }

  editarGrupo() {
    this._gruposService.getGrupo(this.idGrupo).subscribe(datos => {
      this.nombreCliente = datos.CLN_NOMBRE;
      this.cedulaCliente = datos.CLN_CEDULA;
      this.idCliente = datos.CLN_ID;
      this.myForm.patchValue({
        grp_obs: datos.GRP_OBSERVACION
      })
    });
  }

  buscarCliente() {
    // console.log(this.idCliente);
    this._clienteService.getClienteReserva(this.cedulaCliente).subscribe(datos => {
      this.nombreCliente = datos.CLN_NOMBRE;
      this.cedulaCliente = datos.CLN_CEDULA;
      this.idCliente = datos.CLN_ID;
      // console.log(this.nombreCliente);
    });
  }

}
