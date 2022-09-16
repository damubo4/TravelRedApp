import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DevolucionesService } from 'src/app/services/devoluciones/devoluciones.service';
import { ExportService } from 'src/app/services/export/export.service';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'nombre_cliente', 'doc_cliente', 'cel_cliente', 'nombre_tour', 'fecha_tour', 'acom', 'extra', 'abono1', 'abono2', 'abono3', 'fechaabono1', 'fechaabono2', 'fechaabono3', 'lugarabono1', 'lugarabono2', 'lugarabono3', 'observación', 'acciones'];
  dataSourceDevoluciones = new MatTableDataSource();  
  listDevoluciones = [];
  spinner: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }

  constructor(private _devolucionesService: DevolucionesService,
              public dialog: MatDialog,              
              private snackBar: MatSnackBar,
              private _exportService: ExportService) { }

  ngOnInit(): void {
    this.getDevoluciones();
  }

  exportAsExcelFiltered():void{
    this._exportService.exportToExcel(this.dataSourceDevoluciones.filteredData, 'Devoluciones');
  }

  getDevoluciones(): void {
      this.spinner = true;
      this._devolucionesService.getDevoluciones().subscribe(
        {next: 
          datos => {
            this.spinner = false;
            this.listDevoluciones = datos;
            this.dataSourceDevoluciones = new MatTableDataSource(this.listDevoluciones);
            this.dataSourceDevoluciones.paginator = this.paginator;
            this.dataSourceDevoluciones.sort = this.sort;
            // console.log(datos);
  
      }, error: err => {
        console.log(err);
      }        
        }
    );
  }

  eliminarDevolucion(index: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar el registro?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {
        this._devolucionesService.deleteDevolucion(index).subscribe(
          {next: 
            datos => {
            this.getDevoluciones();
            this.snackBar.open('El item fue eliminado con éxito','', {
            duration: 3000
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
      this.dataSourceDevoluciones.filter = filterValue.trim().toLowerCase();
    }

}
