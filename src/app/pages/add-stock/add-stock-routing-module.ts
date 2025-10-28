import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStockForm } from './add-stock-form/add-stock-form'; // Importe

const routes: Routes = [
  { path: '', component: AddStockForm } // Rota padrão do módulo
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddStockRoutingModule { }