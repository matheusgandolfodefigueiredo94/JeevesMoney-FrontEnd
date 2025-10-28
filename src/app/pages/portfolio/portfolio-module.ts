import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing-module';
import { PortfolioView } from './portfolio-view/portfolio-view';


@NgModule({
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    PortfolioView
  ]
})
export class PortfolioModule { }
