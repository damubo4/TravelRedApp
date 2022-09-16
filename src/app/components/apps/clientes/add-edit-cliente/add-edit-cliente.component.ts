import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes/clientes.service';

@Component({
  selector: 'app-add-edit-cliente',
  templateUrl: './add-edit-cliente.component.html',
  styleUrls: ['./add-edit-cliente.component.css']
})
export class AddEditClienteComponent implements OnInit {

  myForm: FormGroup
  idCliente: any;
  accion = 'Agregar';

  constructor(private fb: FormBuilder,
              private _clienteService: ClientesService,
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute ) {
    this.myForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      direccion: ['', Validators.required],
      celular: ['',],
      edad: ['',],
      fecha_nac: [''],
      correo: ['', Validators.email],
      observacion: ['']
    });

    this.idCliente = this.aRoute.snapshot.params['id'];

   }

  ngOnInit(): void {
    if (this.idCliente !== undefined) {
      this.accion = 'Editar';
      this.editarCliente();
    }
  }

  agregarCliente() {
    const id_cliente = Math.floor((Math.random() * (10000 - 1 + 1)) + 1);

    const fecha_hoy = new Date();
    const ano_hoy = fecha_hoy.getFullYear();
    const mes_hoy = fecha_hoy.getMonth();
    const dia_hoy = fecha_hoy.getDate();
    const ano_nac = new Date(this.myForm.get('fecha_nac').value).getFullYear();
    const mes_nac = new Date(this.myForm.get('fecha_nac').value).getMonth();
    const dia_nac = new Date(this.myForm.get('fecha_nac').value).getDate();

    var age = ano_hoy - ano_nac;

    if (mes_hoy < (mes_nac - 1)) {
      age--;
    }
    if (((mes_nac - 1) == mes_hoy) && (dia_hoy < dia_nac)) {
      age--;
    }
    const CLIENTE = {
      cln_nombre: this.myForm.get('nombres').value,
      cln_apellido: this.myForm.get('apellidos').value,
      cln_cedula: this.myForm.get('cedula').value,
      cln_celular: this.myForm.get('celular').value,
      cln_correo: this.myForm.get('correo').value,
      cln_direccion: this.myForm.get('direccion').value,
      cln_fechanac: this.myForm.get('fecha_nac').value,
      cln_edad: age,
      cln_observaciones: this.myForm.get('observacion').value,
    }

    if (this.idCliente !== undefined){

      this._clienteService.editCliente(this.idCliente, CLIENTE).subscribe(datos =>{
        this.snackBar.open('El Cliente ha sido editado con éxito','', {
          duration: 3000
          });
          this.route.navigate(['/dashboard/clientes'])
      }), error => {
        this.myForm.reset();
      }

    } else {

       this._clienteService.addClientes(CLIENTE).subscribe(datos => {
        this.snackBar.open('El Cliente fue registrado con éxito','', {
          duration: 3000
          });
        this.route.navigate(['/dashboard/clientes'])
      }), error => {
        console.log(error);
        this.myForm.reset();
      }
    }
  }

  editarCliente() {
    this._clienteService.getCliente(this.idCliente).subscribe(datos => {
      this.myForm.patchValue({
        nombres: datos.CLN_NOMBRE,
        apellidos: datos.CLN_APELLIDO,
        cedula: datos.CLN_CEDULA,
        celular: datos.CLN_CELULAR,
        fecha_nac: datos.CLN_FECHANAC,
        edad: datos.CLN_EDAD,
        correo: datos.CLN_CORREO,
        observacion: datos.CLN_OBSERVACIONES
      })
    });
  }

}
