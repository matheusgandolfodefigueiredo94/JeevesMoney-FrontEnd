import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStockRoutingModule } from './add-stock-routing-module';
import { AddStockForm } from './add-stock-form/add-stock-form';


@NgModule({
  imports: [
    CommonModule,
    AddStockRoutingModule,
    AddStockForm
  ]
})
export class AddStockModule { }
