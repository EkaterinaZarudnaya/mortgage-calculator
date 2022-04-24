import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanksComponent } from './components/banks/banks.component';
import { CalcComponent } from './components/calc/calc.component';

const routes: Routes = [
  {path:'banks', component: BanksComponent },
  {path:'calculator', component: CalcComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
