import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportService } from 'src/app/services/export/export.service';
import { CajaMenorService } from 'src/app/services/caja-menor/caja-menor.service';

@Component({
  selector: 'app-caja-menor',
  templateUrl: './caja-menor.component.html',
  styleUrls: ['./caja-menor.component.css']
})
export class CajaMenorComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'id', 'fecha', 'beneficiario', 'concepto', 'ingreso', 'egreso', 'saldo', 'acciones'];
  dataSourceCajaMenor = new MatTableDataSource();
  listCajaMenor = [];
  spinner: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dialog: MatDialog,              
              private snackBar: MatSnackBar,
              private _exportService: ExportService,
              private _cajaMenor: CajaMenorService) { }

  ngOnInit(): void {
    this.getCajaMenor();
  }

  exportAsExcelFiltered():void{
    this._exportService.exportToExcel(this.dataSourceCajaMenor.filteredData, 'Caja_Menor');
  }

  getCajaMenor(): void {
      this.spinner = true;
      this._cajaMenor.getRegistrosCajaMenor().subscribe(
        { next: 
          datos => {  
            this.spinner = false;
            this.listCajaMenor = datos;
            for(let i = 1; i < this.listCajaMenor.length; i++){   
              this.listCajaMenor[i].CJA_SALDO = this.listCajaMenor[i-1].CJA_SALDO + this.listCajaMenor[i].CJA_INGRESO - this.listCajaMenor[i].CJA_EGRESO;                    
            } 
            this.listCajaMenor.shift();
            this.listCajaMenor.sort((a, b) => {
              if (a.CJA_ID < b.CJA_ID){
                return -1;
              }
              if (a.CJA_ID > b.CJA_ID){
                return 1;
              }
              return 0;
            });
            this.dataSourceCajaMenor = new MatTableDataSource(this.listCajaMenor);
            this.dataSourceCajaMenor.paginator = this.paginator;
            this.dataSourceCajaMenor.sort = this.sort;            
  
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

        this._cajaMenor.deleteRegistroCajaMenor(index).subscribe(
          { next: datos => {
          this.getCajaMenor();
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
      this.dataSourceCajaMenor.filter = filterValue.trim().toLowerCase();
    }

}


