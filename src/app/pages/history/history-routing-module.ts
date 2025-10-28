import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryView } from './history-view/history-view';

const routes: Routes = [
  { path: '', component: HistoryView }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
