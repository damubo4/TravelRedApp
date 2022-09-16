import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AhorroService } from 'src/app/services/ahorro/ahorro.service';
import { ExportService } from 'src/app/services/export/export.service';

@Component({
  selector: 'app-ahorro-programado',
  templateUrl: './ahorro-programado.component.html',
  styleUrls: ['./ahorro-programado.component.css']
})
export class AhorroProgramadoComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'nombre_cliente', 'doc_cliente', 'cel_cliente', 'abono1', 'abono2', 'abono3', 'fechaabono1', 'fechaabono2', 'fechaabono3', 'lugarabono1', 'lugarabono2', 'lugarabono3', 'observación', 'acciones'];
  dataSourceAhorros = new MatTableDataSource();
  dataSourceClientes = new MatTableDataSource();
  listAhorros = [];
  spinner: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }

  constructor(private _ahorrosService: AhorroService,
              public dialog: MatDialog,
              private _clientesService: ClientesService,
              private snackBar: MatSnackBar,
              private _exportService: ExportService) { }

  ngOnInit(): void {
    this.getAhorros();
  }

  exportAsExcelFiltered():void{
    this._exportService.exportToExcel(this.dataSourceAhorros.filteredData, 'Ahorros');
  }

  getAhorros(): void {
    this.spinner = true;
      this._ahorrosService.getAhorros().subscribe(
        {next: 
          datos => {
            this.spinner = false;
            this.listAhorros = datos;
            // this.listAhorros.shift();
            this.dataSourceAhorros = new MatTableDataSource(this.listAhorros);
            this.dataSourceAhorros.paginator = this.paginator;
            this.dataSourceAhorros.sort = this.sort;
            // console.log(datos);
  
      }, error: err => {
        console.log(err);
      }        
        }
    );
  }

  eliminarAhorro(index: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar el registro?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {
        this._ahorrosService.deleteAhorro(index).subscribe(
          {next: 
            datos => {
            this.getAhorros();
            this.snackBar.open('El item fue eliminado con éxito','', {
            duration: 7000
            });
  
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
      this.dataSourceAhorros.filter = filterValue.trim().toLowerCase();
    }

}
