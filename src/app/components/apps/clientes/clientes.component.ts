import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportService } from 'src/app/services/export/export.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'nombres', 'apellidos', 'cedula', 'celular', 'direccion', 'edad', 'fecha_nac', 'correo', 'obs', 'acciones'];
  dataSourceClientes = new MatTableDataSource();
  listClientes: [];
  spinner: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }
  
  constructor(private _clientesService: ClientesService, public dialog: MatDialog,
    private snackBar: MatSnackBar, private _exportService: ExportService) { }
    
    ngOnInit(): void {
    this.dataSourceClientes.sort = this.sort;
    this.getClientes();
  }

  exportAsExcelFiltered():void{
    this._exportService.exportToExcel(this.dataSourceClientes.filteredData, 'Clientes');
  }

  getClientes(): void {
      this.spinner = true;
      this._clientesService.getClientes().subscribe(
        { next: 
          datos => {    
            this.spinner = false;  
            this.listClientes = datos;
            this.listClientes.shift();
            this.dataSourceClientes = new MatTableDataSource(this.listClientes);
            this.dataSourceClientes.paginator = this.paginator;
            this.dataSourceClientes.sort = this.sort;
      }, 
          error: err => {
        console.log(err);
      }
    },
    );
  }

  eliminarCliente(index: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar el cliente?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {
        this._clientesService.deleteCliente(index).subscribe(
          { next: datos => {
          this.getClientes();
          this.snackBar.open('El Cliente fue eliminado con éxito','', {
          duration: 3000
          });
        }, 
          error: err => {
          console.log("hubo un error");
        }
      },
      );      
    }
  })
 }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceClientes.filter = filterValue.trim().toLowerCase();
    }
}
