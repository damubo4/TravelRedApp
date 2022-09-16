import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportService } from 'src/app/services/export/export.service';
import { CajaMayorService } from 'src/app/services/caja-mayor/caja-mayor.service';

@Component({
  selector: 'app-caja-mayor',
  templateUrl: './caja-mayor.component.html',
  styleUrls: ['./caja-mayor.component.css']
})
export class CajaMayorComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'id', 'fecha', 'origen', 'destino', 'ingreso', 'egreso', 'saldo', 'obs', 'acciones'];
  dataSourceCajaMayor = new MatTableDataSource();
  listCajaMayor = [];
  spinner: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dialog: MatDialog,              
              private snackBar: MatSnackBar,
              private _exportService: ExportService,
              private _cajaMayor: CajaMayorService) { }

  ngOnInit(): void {
    this.getCajaMayor();
  }

  exportAsExcelFiltered():void{
    this._exportService.exportToExcel(this.dataSourceCajaMayor.filteredData, 'Caja_Mayor');
  }

  getCajaMayor(): void {
    this.spinner = true;
      this._cajaMayor.getRegistrosCajaMayor().subscribe(
        { next: 
          datos => {  
            this.spinner = false;
            this.listCajaMayor = datos;
            for(let i = 1; i < this.listCajaMayor.length; i++){   
              this.listCajaMayor[i].CJA_SALDO = this.listCajaMayor[i-1].CJA_SALDO + this.listCajaMayor[i].CJA_INGRESO - this.listCajaMayor[i].CJA_EGRESO;               
            }
            this.listCajaMayor.shift();
            this.listCajaMayor.sort((a, b) => {
              if (a.CJA_ID < b.CJA_ID){
                return -1;
              }
              if (a.CJA_ID > b.CJA_ID){
                return 1;
              }
              return 0;
            });
            this.dataSourceCajaMayor = new MatTableDataSource(this.listCajaMayor);
            this.dataSourceCajaMayor.paginator = this.paginator;
            this.dataSourceCajaMayor.sort = this.sort;           
  
      }, error: err => {
        console.log(err);
      }
      }
    );
  }

  eliminarRegistro(index: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar el registro?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {

        this._cajaMayor.deleteRegistroCajaMayor(index).subscribe(
          { next: datos => {
          this.getCajaMayor();
          this.snackBar.open('El registro fue eliminado con éxito','', {
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
      this.dataSourceCajaMayor.filter = filterValue.trim().toLowerCase();
    }    

}
