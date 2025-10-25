import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfitabilityReport } from './profitability-report/profitability-report';

const routes: Routes = [
  { path: '', component: ProfitabilityReport }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitabilityRoutingModule { }
