import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToursService } from 'src/app/services/tours/tours.service';
import { ExportService } from 'src/app/services/export/export.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {

  displayedColumns: string[] = ['No.','id_tour', 'nombreTour', 'fechaTour', 'tipoTour', 'valorNeto', 'valorComisionable', 'valor_agencias', 'infante', 'nino', 'adulto', 'adulto_mayor', 'cod_aero', 'sal_fec_vuelo', 'sal_hr_vuelo', 'reg_fec_vuelo', 'reg_hr_vuelo', 'observacion', 'observacion_factura', 'acciones'];
  dataSourceTours = new MatTableDataSource();
  listTours = [];
  spinner: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }

  constructor(private _toursService: ToursService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private _exportService: ExportService) { }

  ngOnInit(): void {
    this.getTours();
  }

  exportAsExcelFiltered():void{
    this._exportService.exportToExcel(this.dataSourceTours.filteredData, 'Tours');
  }

  getTours(): void {
          this.spinner = true;
          this._toursService.getTours().subscribe(
            {next:
              datos => {
                this.spinner = false;
                this.listTours = datos;
                this.listTours.shift();
                this.dataSourceTours = new MatTableDataSource(this.listTours);
                this.dataSourceTours.paginator = this.paginator;
                this.dataSourceTours.sort = this.sort;            
  
      }, error: err => {
        console.log(err);
      }            
      }
    );
  }

  eliminarTour(id: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar el cliente?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {

        this._toursService.deleteTour(id).subscribe(
          {next: 
            datos => {
              if(datos.message_error){
                console.log(datos.message);
                this.snackBar.open('El Tour no puede ser eliminado porque esta asociado a otra tabla','', {
                  duration: 7000
                  });
              } 
              else if(datos.message) {
                this.getTours();
                this.snackBar.open('El Tour fue eliminado con éxito','', {
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





