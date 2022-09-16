import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../../apps/mensaje-confirmacion/mensaje-confirmacion.component'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToursService } from 'src/app/services/tours/tours.service';
import { RolesService } from 'src/app/services/roles/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  displayedColumns: string[] = ['No.','rol_nombre', 'rol_apellido', 'rol_cedula', 'rol_correo', 'rol_celular', 'rol_cargo', 'rol_valorComisionable', 'acciones'];
  dataSourceTours = new MatTableDataSource();
  listTours = [];
  spinner: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }

  constructor(private _rolesService: RolesService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
          this.spinner = true;
          this._rolesService.getRoles().subscribe(
            {next:
              datos => {
                this.spinner = false;
                this.listTours = datos;
                this.dataSourceTours = new MatTableDataSource(this.listTours);
                this.dataSourceTours.paginator = this.paginator;
                this.dataSourceTours.sort = this.sort;
                // console.log(datos);
  
      }, error: err => {
        console.log(err);
      }            
      }
    );
  }

  eliminarRol(id: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar el rol?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {

        this._rolesService.deleteRol(id).subscribe(
          {next: 
            datos => {
              if(datos.message_error){
                console.log(datos.message);
                this.snackBar.open('El Rol no puede ser eliminado porque esta asociado a otra tabla','', {
                  duration: 7000
                  });
              } 
              else if(datos.message) {
                this.getRoles();
                this.snackBar.open('El Rol fue eliminado con éxito','', {
                duration: 7000
                });
              }
  
          }, error: error => {
            console.log("hubo un error");
          }          
          }
        )
      }
    });
}

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceTours.filter = filterValue.trim().toLowerCase();
    }

}
