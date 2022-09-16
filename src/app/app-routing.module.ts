import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/loginRegister/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { HomeComponent } from './components/apps/home/home.component';
import { ClientesComponent } from './components/apps/clientes/clientes.component';
import { AddEditClienteComponent } from './components/apps/clientes/add-edit-cliente/add-edit-cliente.component';
import { ReservasComponent } from './components/apps/reservas/reservas.component';
import { AddEditReservaComponent } from './components/apps/reservas/add-edit-reserva/add-edit-reserva.component';
import { DevolucionesComponent } from './components/apps/devoluciones/devoluciones.component';
import { AddEditDevolucionComponent } from './components/apps/devoluciones/add-edit-devolucion/add-edit-devolucion.component';
import { AhorroProgramadoComponent } from './components/apps/ahorro-programado/ahorro-programado.component';
import { AddEditAhorroComponent } from './components/apps/ahorro-programado/add-edit-ahorro/add-edit-ahorro.component';
import { ToursComponent } from './components/apps/tours/tours.component';
import { AddEditTourComponent } from './components/apps/tours/add-edit-tour/add-edit-tour.component';
import { CuentasComponent } from './components/apps/cuentas/cuentas.component';
import { AddEditCuentaComponent } from './components/apps/cuentas/add-edit-cuenta/add-edit-cuenta.component';
import { CajaMenorComponent } from './components/apps/caja-menor/caja-menor.component';
import { CajaMayorComponent } from './components/apps/caja-mayor/caja-mayor.component';
import { AuthGuard } from './auth.guard';
import { CheckLogOutGuard } from './check-log-out.guard';
import { GruposComponent } from './components/apps/grupos/grupos.component';
import { AddEditGruposComponent } from './components/apps/grupos/add-edit-grupos/add-edit-grupos.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { RolesComponent } from './components/configuracion/roles/roles.component';
import { AddEditRolesComponent } from './components/configuracion/roles/add-edit-roles/add-edit-roles.component';
import { AddEditCajaMenorComponent } from './components/apps/caja-menor/add-edit-caja-menor/add-edit-caja-menor.component';
import { AddEditCajaMayorComponent } from './components/apps/caja-mayor/add-edit-caja-mayor/add-edit-caja-mayor.component';
import { CajaCuentasComponent } from './components/apps/caja-cuentas/caja-cuentas.component';
import { AddEditCajaCuentasComponent } from './components/apps/caja-cuentas/add-edit-caja-cuentas/add-edit-caja-cuentas.component';

const routes: Routes = [
  //LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate:[CheckLogOutGuard]},
  //DASHBOARD  
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], children: [
    //HOME
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    // CLIENTES
    { path: 'clientes', component: ClientesComponent},
    { path: 'clientes/addCliente', component: AddEditClienteComponent},
    { path: 'clientes/editCliente/:id', component: AddEditClienteComponent},
    // RESERVAS
    { path: 'reservas', component: ReservasComponent},
    { path: 'reservas/addReserva', component: AddEditReservaComponent},
    { path: 'reservas/editReserva/:id', component: AddEditReservaComponent},
    // DEVOLUCIONES
    { path: 'devoluciones', component: DevolucionesComponent},
    { path: 'devoluciones/addDevolucion', component: AddEditDevolucionComponent},
    { path: 'devoluciones/editDevolucion/:id', component: AddEditDevolucionComponent},
    // AHORRO PROGRAMADO
    { path: 'ahorros', component: AhorroProgramadoComponent},
    { path: 'ahorros/addAhorro', component: AddEditAhorroComponent},
    { path: 'ahorros/editAhorro/:id', component: AddEditAhorroComponent},
    // TOURS
    { path: 'tours', component: ToursComponent},
    { path: 'tours/addTour', component: AddEditTourComponent},
    { path: 'tours/editTour/:id', component: AddEditTourComponent},
    // CUENTAS
    { path: 'cuentas', component: CuentasComponent},
    { path: 'cuentas/addCuenta', component: AddEditCuentaComponent},
    { path: 'cuentas/editCuenta/:id', component: AddEditCuentaComponent},
    // GRUPOS
    { path: 'grupos', component: GruposComponent},
    { path: 'grupos/addGrupo', component: AddEditGruposComponent},
    { path: 'grupos/editGrupo/:id', component: AddEditGruposComponent},
    // CONFIGURACION
    { path: 'settings', component: ConfiguracionComponent, children: [
      { path: 'roles', component: RolesComponent},
      { path: 'roles/addRol', component: AddEditRolesComponent},
      { path: 'roles/editRol/:id', component: AddEditRolesComponent}
    ]},
    // CAJA MENOR
    { path: 'caja-menor', component: CajaMenorComponent},
    { path: 'caja-menor/caja-menor-add', component: AddEditCajaMenorComponent},
    { path: 'caja-menor/caja-menor-edit/:id', component: AddEditCajaMenorComponent},
    // CAJA MAYOR
    { path: 'caja-mayor', component: CajaMayorComponent},
    { path: 'caja-mayor/caja-mayor-add', component: AddEditCajaMayorComponent},
    { path: 'caja-mayor/caja-mayor-edit/:id', component: AddEditCajaMayorComponent},
    // CAJA CUENTAS
    { path: 'caja-cuentas', component: CajaCuentasComponent},
    { path: 'caja-cuentas/caja-cuentas-add', component: AddEditCajaCuentasComponent},
    { path: 'caja-cuentas/caja-cuentas-edit/:id', component: AddEditCajaCuentasComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full'},
  ]},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
