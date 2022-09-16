import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { ExportService } from 'src/app/services/export/export.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
})
export class ReservasComponent implements OnInit {
  displayedColumns: string[] = [
    'No.',
    'nombres_cliente',
    'valor_unitario',
    'cedula_cliente',
    'celular_cliente',
    'nombre_tour',
    'fecha_tour',
    'id_grupo',
    'lider_grupo',
    'Acom',
    'Extra',
    'abono1',
    'valorTotal',
    'abono2',
    'abono3',
    'abono4',
    'abono5',
    'fechaabono1',
    'fechaabono2',
    'fechaabono3',
    'fechaabono4',
    'fechaabono5',
    'lugarabono1',
    'lugarabono2',
    'lugarabono3',
    'lugarabono4',
    'lugarabono5',
    'observación',
    'rol',
    'acciones',
  ];
  dataSourceReservas = new MatTableDataSource();
  listReservas = [];
  spinner: boolean = false;
  hola = 'holaaaaa';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {}

  constructor(
    private _reservasService: ReservasService,
    public dialog: MatDialog,
    private _clientesService: ClientesService,
    private snackBar: MatSnackBar,
    private _exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.getReservas();
  }

  exportAsExcel(): void {
    this._exportService.exportToExcel(this.dataSourceReservas.data, 'Reservas');
  }

  exportAsExcelFiltered(): void {
    this._exportService.exportToExcel(
      this.dataSourceReservas.filteredData,
      'Reservas'
    );
  }

  getReservas(): void {
    this.spinner = true;
    this._reservasService.getReservas().subscribe({
      next: (datos) => {
        this.spinner = false;
        this.listReservas = datos;
        this.dataSourceReservas = new MatTableDataSource(this.listReservas);
        this.dataSourceReservas.paginator = this.paginator;
        this.dataSourceReservas.sort = this.sort;
        console.log(datos);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  eliminarReserva(index: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: { mensaje: 'Estas seguro de eliminar la reserva?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'aceptar') {
        this._reservasService.deleteReserva(index).subscribe({
          next: (datos) => {
            this.getReservas();
            this.snackBar.open('La reserva fue eliminada con éxito', '', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log('hubo un error');
          },
        });
      }
    });
  }

  createPdf(CLN_NOMBRE) {
    console.log(CLN_NOMBRE);
    const pdfDefinition: any = {
      pageOrientation: 'landscape',
      pageSize: 'B5',
      margins: [50, 10, 50, 10],
      content: [
        {
          color: '#2e3092',
          width: '100%',
          columns: [
            {
              width: '80%',
              type: 'none',
              ol: [
                [
                  {
                    width: '100%',
                    columns: [
                      {
                        width: '20%',
                        text: 'https://picsum.photos/id/1080/367/267',                        
                      },
                      { 
                        width: '50%',                       
                        type: 'none',
                        ol: [
                          {
                            text: 'Yesica Alexandra Sánchez Ordoñez',
                            fontSize: 12,
                            italics: true,
                          },
                          { text: 'TRAVELRED', fontSize: 30, bold: true },
                          {
                            text: 'Agencia de Viajes y Turismo',
                            fontSize: 13,
                            italics: true,
                          },
                          { text: '(+57) 3106267546', fontSize: 16 },
                        ],
                      },
                      { 
                        width: '30%',                       
                        fontSize: 8,
                        type: 'none',
                        ol: [
                          { text: 'Cra. 11 # 16N-66 Local 2B, Antonio Nariño' },
                          { text: 'www.travelred.com.co' },
                          { text: 'travelred20@gmail.com' },
                          { text: '@travelredco' },
                          { text: 'Travelred Agencia de Viajes y Turismo' },
                        ],
                      },
                    ],
                  },
                ],
                {
                  margin: [0, 0, 0, 1],
                  table: {
                    widths: ['100%'],
                    body: [
                      [
                        {
                          text: "SEÑORE(A)S: "+CLN_NOMBRE,
                          border: [false, false, false, false],
                          bold: true,
                        },
                      ],
                    ],
                  },
                  layout: {
                    fillColor: '#e0dfef',
                  },
                },
                {
                  margin: [0, 0, 0, 1],
                  table: {
                    widths: ['100%'],
                    body: [
                      [
                        {
                          text: 'NIT:  TEL:',
                          border: [false, false, false, false],
                          bold: true,
                        },
                      ],
                    ],
                  },
                  layout: {
                    fillColor: '#e0dfef',
                  },
                },
                {
                  margin: [0, 0, 0, 1],
                  table: {
                    widths: ['100%'],
                    body: [
                      [
                        {
                          text: 'DIRECCIÓN:',
                          border: [false, false, false, false],
                          bold: true,
                        },
                      ],
                    ],
                  },
                  layout: {
                    fillColor: '#e0dfef',
                  },
                },
              ],
            },
            {
              alignment: 'center',
              fontSize: 8,
              width: '20%',
              type: 'none',
              ol: [
                [
                  { text: 'RNT: 64955', fontSize: 11, bold: true },
                  {
                    text: 'FACTURA DE VENTA ORIGINAL',
                    fontSize: 12,
                    bold: true,
                  },
                  { text: 'No responsable de IVA,', fontSize: 8 },
                  { text: 'No somos grandes contribuyentes', fontSize: 8 },
                  {
                    table: {
                      heights: 30,
                      widths: ['100%'],
                      alignment: 'center',
                      body: [[{ text: '' }]],
                    },
                    layout: {
                      hLineColor: '#2e3092',
                      vLineColor: '#2e3092'                      
                    },
                  },
                  {
                    columns: [
                      {
                        alignment: 'left',
                        fontSize: 7,
                        type: 'none',
                        bold: true,
                        ol: ['FECHA EMISIÓN'],
                      },
                      {
                        alignment: 'left',
                        fontSize: 7,
                        type: 'none',
                        bold: true,
                        ol: ['FECHA DE VENCIMIENTO'],
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        alignment: 'left',
                        fontSize: 10,
                        type: 'none',
                        bold: true,
                        text: 'D',
                        opacity: 0.5,
                      },
                      {
                        alignment: 'left',
                        fontSize: 10,
                        type: 'none',
                        bold: true,
                        text: 'M',
                        opacity: 0.5,
                      },
                      {
                        alignment: 'left',
                        fontSize: 10,
                        type: 'none',
                        bold: true,
                        text: 'A',
                        opacity: 0.5,
                      },
                      {
                        alignment: 'left',
                        fontSize: 10,
                        type: 'none',
                        bold: true,
                        text: 'D',
                        opacity: 0.5,
                      },
                      {
                        alignment: 'left',
                        fontSize: 10,
                        type: 'none',
                        bold: true,
                        text: 'M',
                        opacity: 0.5,
                      },
                      {
                        alignment: 'left',
                        fontSize: 10,
                        type: 'none',
                        bold: true,
                        text: 'A',
                        opacity: 0.5,
                      },
                    ],
                  },
                ],
              ],
            },
          ],
        },
        {
          style: 'tableExample',
          width: '100%',
          table: {
            heights: 14,
            widths: ['60%', '10%', '15%', '15%'],
            body: [
              [
                {
                  text: 'DESCRIPCIÓN',
                  alignment: 'center',
                  style: 'tableHeader',
                  fillColor: '#2e3092',
                  color: '#fff',
                  bold: true,
                },
                {
                  text: 'CANT.',
                  alignment: 'center',
                  style: 'tableHeader',
                  fillColor: '#2e3092',
                  color: '#fff',
                  bold: true,
                },
                {
                  text: 'VALOR. UNIT',
                  alignment: 'center',
                  style: 'tableHeader',
                  fillColor: '#2e3092',
                  color: '#fff',
                  bold: true,
                },
                {
                  text: 'VALOR. TOTAL',
                  alignment: 'center',
                  style: 'tableHeader',
                  fillColor: '#2e3092',
                  color: '#fff',
                  bold: true,
                },
              ],
              ['', '', '', ''],
              ['', '', '', ''],
              ['', '', '', ''],
              ['', '', '', ''],
              ['', '', '', ''],
              ['', '', '', ''],
              [
                {
                  text: 'OBSERVACIONES:',
                  color: '#2e3092',
                  fontSize: 10,
                  bold: true,
                },
                '',
                { text: 'TOTAL:', color: '#2e3092', bold: true, alignment: 'right' },
                { text: '$', color: '#2e3092', bold: true },
              ],
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 1 : 1;
            },
            vLineWidth: function (i, node) {
              return i === 0 || i === node.table.widths.length ? 1 : 1;
            },
            hLineColor: '#2e3092',
            vLineColor: '#2e3092',
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex % 2 === 0 ? '#e0dfef' : null;
            },
          },
        },
        {
          width: '100%',
          margin: [0, 5, 0, 0],
          columns: [
            {
              width: '70%',
              fontSize: 6,
              color: '#2e3092',
              type: 'none',
              text: 'Esta factura de venta se asimila en todos sus efectos legales a la letra de cambio, en caso de mora causará al inetrés autorizado por la ley. Se hace constar que la firma de una persona distinta al comprador, implica que esta autorizada para firmar, confesar la deuda y obligar al comprador. La presente factura es un titulo valor conforme al articulo 779 del Código de Comercio; modificado por el articulo 3 ley 1231 del 2088. Cancelaciones sujetas a términos y condiciones.',
            },
            {
              width: '30%',
              type: 'none',
              ul: [
                
                  {
                    margin: [0, 0, 0, 5],
                    width: '100%',
                    columns: [
                      {
                        color: '#2e3092',
                        type: 'none',
                        width: '50%',
                        fontSize: 12,
                        alignment: 'right',
                        text: 'ABONO:',
                        margin: [0, 0, 4, 0]
                      },
                      {
                        color: '#2e3092',                        
                        type: 'none',
                        width: '50%',
                        fontSize: 12,
                        text: '$'
                      }
                    ]
                    },
                  {
                    columns: [
                      {
                        color: '#2e3092',                        
                        type: 'none',
                        fontSize: 12,
                        alignment: 'right',
                        text: 'SALDO:',
                        margin: [0, 0, 6, 0]
                      },
                      {
                        color: '#2e3092',
                        
                        type: 'none',
                        fontSize: 12,
                        text: '$'
                      }
                    ]
                    }
                ]
                            
            },
          ],
        },
        {
          margin: [0, 5, 0, 5],
          color: '#2e3092',
          fontSize: 8,
          columns:[            
              {
                width: 300,
                text: 'Firma: _______________________________________ C.C.:_____________________________'
              },
              {
                width: 300,
                text: 'Firma: _______________________________________ C.C.:______________________________'
              }            
          ]
        },
        {
          width: '100%',
          alignment: 'center',
          color: '#2e3092',
          bold: true,
          fontSize: 10,
          columns: [
            {
              text: 'AUTORIZADO'
            },
            {
              text: 'ACEPTO'
            }
          ]
        },
        {          
          color: '#2e3092',
          fontSize: 8,  
          width: '100%',             
          table: {
            widths: [210,400],
            body:[
              [
                { bold: true,               
                  margin:[55,0,0,0],
                  text: 'Depósitos y Condiciones de pago:'
                },
                {                  
                  text: 'Si su pago desea realizarlo por medio de consignación o transferencia, lo puede hacer en las cuentas:\n CUENTA DE AHORROS BANCOLOMBIA:91293296401.DAVIPLATA:3106267546.NEQUI:3103767648'
                }
              ],
              [
                {
                  alignment: 'center',
                  bold: true,
                  colSpan: 2,
                  text: 'UNA VEZ ACEPTE ESTE RECIBO Y LOS PLANES NO SON REEMBOLSABLES, NI ENDOSABLES, CUALQUIER CAMBIO GENERA PENALIDADES'
                }
              ]
            ]
          },
          layout: {
            fillColor: '#e0dfef',
            hLineColor: '#e0dfef',
            vLineColor: '#e0dfef' 
          },
        }
      ],
    };
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceReservas.filter = filterValue.trim().toLowerCase();
  }
}
