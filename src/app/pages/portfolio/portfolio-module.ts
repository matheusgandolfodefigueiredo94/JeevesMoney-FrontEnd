// src/app/pages/portfolio/portfolio.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PortfolioRoutingModule } from '../portfolio/portfolio-routing-module'; // Corrigido para importar do arquivo correto

@NgModule({
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    HttpClientModule
  ]
})
export class PortfolioModule {}