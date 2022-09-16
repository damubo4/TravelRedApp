import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from  '@angular/material/sort' ;
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportService } from 'src/app/services/export/export.service';
import { CajaCuentasService } from 'src/app/services/caja-cuentas/caja-cuentas.service';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';


@Component({
  selector: 'app-caja-cuentas',
  templateUrl: './caja-cuentas.component.html',
  styleUrls: ['./caja-cuentas.component.css']
})
export class CajaCuentasComponent implements OnInit {

  // displayedColumns: string[] = ['No.', 'id', 'fecha', 'beneficiario', 'concepto', 'ingreso', 'egreso', 'saldo'];
  displayedColumns: string[] = ['No.', 'id', 'fecha', 'beneficiario', 'concepto', 'ingreso', 'egreso', 'saldo', 'acciones'];

  dataSourceCajaCuentas = new MatTableDataSource();
  listCajaCuentas = [];
  idRegistro: any;
  accion = 'Agregar';
  spinner: boolean = false;
  saldo = [0];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dialog: MatDialog,              
              private snackBar: MatSnackBar,
              private _exportService: ExportService,
              private _cajaCuentas: CajaCuentasService,
              ) {}

  ngOnInit(): void {
    this.getRegistrosCajaCuentas();
  }

  exportAsExcelFiltered():void{
    this._exportService.exportToExcel(this.dataSourceCajaCuentas.filteredData, 'Caja_Menor');
  }

  getRegistrosCajaCuentas(): void {
    this.spinner = true;
      this._cajaCuentas.getRegistrosCajaCuentas().subscribe(
        { next: 
          datos => {              
            this.spinner = false;            
            console.log(datos);
            this.listCajaCuentas = datos;
            for(let i = 1; i < this.listCajaCuentas.length; i++){   
              this.listCajaCuentas[i].CJA_SALDO = this.listCajaCuentas[i-1].CJA_SALDO + this.listCajaCuentas[i].CJA_INGRESO - this.listCajaCuentas[i].CJA_EGRESO;              
            }            
            this.listCajaCuentas.shift();
            this.listCajaCuentas.sort((a, b) => {
              if (a.CJA_ID < b.CJA_ID){
                return -1;
              }
              if (a.CJA_ID > b.CJA_ID){
                return 1;
              }
              return 0;
            });
            this.dataSourceCajaCuentas = new MatTableDataSource(this.listCajaCuentas);
            this.dataSourceCajaCuentas.paginator = this.paginator;
            this.dataSourceCajaCuentas.sort = this.sort; 
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

        this._cajaCuentas.deleteRegistroCajaCuentas(index).subscribe(
          { next: datos => {
          this.getRegistrosCajaCuentas();
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
      this.dataSourceCajaCuentas.filter = filterValue.trim().toLowerCase();
    }

}