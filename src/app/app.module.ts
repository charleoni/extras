import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { FormtipoidComponent } from './pages/tipoid/formtipoid.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { TipoidComponent } from './pages/tipoid/tipoid.component';
import { RangosComponent } from './pages/rangos/rangos.component';
import { FormrangosComponent } from './pages/rangos/formrangos.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { FormturnosComponent } from './pages/turnos/formturnos.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { FrmfuncionariosComponent } from './pages/funcionarios/frmfuncionarios.component';
import { ExtrasComponent } from './pages/extras/extras.component';
import { FrmextrasComponent } from './pages/extras/frmextras.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    TipoidComponent,
    FormtipoidComponent,
    RangosComponent,
    FormrangosComponent,
    TurnosComponent,
    FormturnosComponent,
    FuncionariosComponent,
    FrmfuncionariosComponent,
    ExtrasComponent,
    FrmextrasComponent    
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
