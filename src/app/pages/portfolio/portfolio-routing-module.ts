import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioView } from './portfolio-view/portfolio-view'; // Importe

const routes: Routes = [
  { path: '', component: PortfolioView } // Rota padrão do módulo
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }