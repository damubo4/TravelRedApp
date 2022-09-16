import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToursService } from 'src/app/services/tours/tours.service';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { ExportService } from 'src/app/services/export/export.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'id_grupo', 'nombreCliente', 'cedulaCliente', 'celularCliente', 'valorTotal', 'valorSaldo', 'observacion', 'acciones'];
  dataSourceGrupos = new MatTableDataSource();
  listGrupos = [];
  spinner: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }

  constructor(private _toursService: ToursService,              
              public dialog: MatDialog,
              private _gruposService: GrupoService,
              private snackBar: MatSnackBar,
              private _exportService: ExportService) { }

  ngOnInit(): void {
    this.getGrupos();
  }

  exportAsExcelFiltered():void{
    this._exportService.exportToExcel(this.dataSourceGrupos.filteredData, 'Grupos');
  }

  getGrupos(): void {
      this.spinner = true;
      this._gruposService.getGrupos().subscribe(
        { next: 
          datos => {  
            this.spinner = false;
            this.listGrupos = datos;
            this.listGrupos.shift();
            this.dataSourceGrupos = new MatTableDataSource(this.listGrupos);
            this.dataSourceGrupos.paginator = this.paginator;
            this.dataSourceGrupos.sort = this.sort;
            // console.log(datos);
  
      }, error: err => {
        console.log(err);
      }
      }
    );
  }

  eliminarGrupo(id: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar el grupo?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {

        this._gruposService.deleteGrupo(id).subscribe(datos => {
          this.getGrupos();
          this.snackBar.open('El Grupo fue eliminado con éxito','', {
          duration: 7000
          });

        }, error => {
          console.log("hubo un error");

        })
      }
    });
}

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceGrupos.filter = filterValue.trim().toLowerCase();
    }

}

