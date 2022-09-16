import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ExportService } from './services/export/export.service';


import { AuthGuard } from './auth.guard';
import { CheckLogOutGuard } from './check-log-out.guard';
import { InterceptorService } from './services/interceptor/interceptor.service';

import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AhorroProgramadoComponent } from './components/apps/ahorro-programado/ahorro-programado.component';
import { CajaMayorComponent } from './components/apps/caja-mayor/caja-mayor.component';
import { CajaMenorComponent } from './components/apps/caja-menor/caja-menor.component';
import { ClientesComponent } from './components/apps/clientes/clientes.component';
import { CuentasComponent } from './components/apps/cuentas/cuentas.component';
import { DevolucionesComponent } from './components/apps/devoluciones/devoluciones.component';
import { HomeComponent } from './components/apps/home/home.component';
import { MensajeConfirmacionComponent } from './components/apps/mensaje-confirmacion/mensaje-confirmacion.component';
import { ReservasComponent } from './components/apps/reservas/reservas.component';
import { ToursComponent } from './components/apps/tours/tours.component';
import { NavComponent } from './components/nav/nav.component';
import { NavBarComponent } from './components/nav/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/nav/side-bar/side-bar.component';

import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './components/loginRegister/login/login.component';
import { RegisterComponent } from './components/loginRegister/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AddEditAhorroComponent } from './components/apps/ahorro-programado/add-edit-ahorro/add-edit-ahorro.component';
import { AddEditClienteComponent } from './components/apps/clientes/add-edit-cliente/add-edit-cliente.component';
import { AddEditCuentaComponent } from './components/apps/cuentas/add-edit-cuenta/add-edit-cuenta.component';
import { AddEditDevolucionComponent } from './components/apps/devoluciones/add-edit-devolucion/add-edit-devolucion.component';
import { AddEditReservaComponent } from './components/apps/reservas/add-edit-reserva/add-edit-reserva.component';
import { AddEditTourComponent } from './components/apps/tours/add-edit-tour/add-edit-tour.component';
import { GruposComponent } from './components/apps/grupos/grupos.component';
import { AddEditGruposComponent } from './components/apps/grupos/add-edit-grupos/add-edit-grupos.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { RolesComponent } from './components/configuracion/roles/roles.component';
import { AddEditRolesComponent } from './components/configuracion/roles/add-edit-roles/add-edit-roles.component';
import { AddEditCajaMenorComponent } from './components/apps/caja-menor/add-edit-caja-menor/add-edit-caja-menor.component';
import { AddEditCajaMayorComponent } from './components/apps/caja-mayor/add-edit-caja-mayor/add-edit-caja-mayor.component';
import { CajaCuentasComponent } from './components/apps/caja-cuentas/caja-cuentas.component';
import { AddEditCajaCuentasComponent } from './components/apps/caja-cuentas/add-edit-caja-cuentas/add-edit-caja-cuentas.component';

@NgModule({
  declarations: [
    AppComponent,
    AhorroProgramadoComponent,
    CajaMayorComponent,
    CajaMenorComponent,
    ClientesComponent,
    CuentasComponent,
    DevolucionesComponent,
    HomeComponent,
    MensajeConfirmacionComponent,
    ReservasComponent,
    ToursComponent,
    NavComponent,
    NavBarComponent,
    SideBarComponent,    
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AddEditAhorroComponent,
    AddEditClienteComponent,
    AddEditCuentaComponent,
    AddEditDevolucionComponent,
    AddEditReservaComponent,
    AddEditTourComponent,
    GruposComponent,
    AddEditGruposComponent,
    ConfiguracionComponent,
    RolesComponent,
    AddEditRolesComponent,
    AddEditCajaMenorComponent,
    AddEditCajaMayorComponent,
    CajaCuentasComponent,
    AddEditCajaCuentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScrollingModule,
    FormsModule,
    AngularMaterialModule
  ],
  providers: [CookieService, AuthGuard, ExportService, CheckLogOutGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
