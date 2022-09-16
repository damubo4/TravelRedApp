import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToursService } from 'src/app/services/tours/tours.service';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'cuenta_banco', 'cuenta_numero', 'cuenta_titular', 'acciones'];
  dataSourceCuentas = new MatTableDataSource();
  listCuentas = [];
  spinner: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }

  constructor(private _toursService: ToursService,
              private _cuentasService: CuentasService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCuentas();
  }

  getCuentas(): void {
      this.spinner = true;
      this._cuentasService.getCuentas().subscribe(
        {next: 
          datos => {        
            this.spinner = false;      
            this.listCuentas = datos;
            this.listCuentas.shift();             
            this.dataSourceCuentas = new MatTableDataSource(this.listCuentas);
            this.dataSourceCuentas.paginator = this.paginator;
            this.dataSourceCuentas.sort = this.sort;
            // console.log(datos);
  
      }, error: err => {
        console.log(err);
      }          
        }
    );
  }

  eliminarCuenta(id: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar la cuenta bancaria?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {

        this._cuentasService.deleteCuenta(id).subscribe(
          {next:
            datos => {
            this.getCuentas();
            this.snackBar.open('La cuenta bancaria ha sido eliminada con éxito','', {
            duration: 3000
            });
  
          }, error: err => {
            console.log("hubo un error");
          }          
          }
        )
      }
    });
}

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceCuentas.filter = filterValue.trim().toLowerCase();
    }

}
