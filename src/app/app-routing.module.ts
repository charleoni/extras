import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtrasComponent } from './pages/extras/extras.component';
import { FrmextrasComponent } from './pages/extras/frmextras.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { FrmfuncionariosComponent } from './pages/funcionarios/frmfuncionarios.component';
import { HomeComponent } from './pages/home/home.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { FormturnosComponent } from './pages/turnos/formturnos.component';
import { RangosComponent } from './pages/rangos/rangos.component';
import { FormrangosComponent } from './pages/rangos/formrangos.component';
import { TipoidComponent } from './pages/tipoid/tipoid.component';
import { FormtipoidComponent } from './pages/tipoid/formtipoid.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'tipoid', component: TipoidComponent},
  { path: 'tipoidnew', component: FormtipoidComponent},
  { path: 'tipoidnew/:id', component: FormtipoidComponent},
  { path: 'rangos', component: RangosComponent},
  { path: 'rangosnew', component: FormrangosComponent},
  { path: 'rangosnew/:id', component: FormrangosComponent},
  { path: 'turnos', component: TurnosComponent},
  { path: 'turnosnew', component: FormturnosComponent},
  { path: 'turnosnew/:id', component: FormturnosComponent},
  { path: 'funcionarios', component: FuncionariosComponent},
  { path: 'funcionariosnew', component: FrmfuncionariosComponent},
  { path: 'funcionariosnew/:id', component: FrmfuncionariosComponent},
  { path: 'extras', component: ExtrasComponent},
  { path: 'extrasnew', component: FrmextrasComponent},
  { path: 'extrasnew/:id', component: FrmextrasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
