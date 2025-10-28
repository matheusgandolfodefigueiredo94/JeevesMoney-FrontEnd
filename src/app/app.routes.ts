import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // Rota padrão: Redireciona para a carteira
      { path: '', redirectTo: 'portfolio', pathMatch: 'full' },

      // Rota 1: Carteira (Lazy Loading)
      {
        path: 'portfolio',
        loadChildren: () => import('./pages/portfolio/portfolio-module').then(m => m.PortfolioModule)
      },
      // Rota 2: Cadastrar Ação (Lazy Loading)
      {
        path: 'add-stock',
        loadChildren: () => import('./pages/add-stock/add-stock-module').then(m => m.AddStockModule)
      },
      // Rota 3: Rentabilidade (Lazy Loading)
      {
        path: 'profitability',
        loadChildren: () => import('./pages/profitability/profitability-module').then(m => m.ProfitabilityModule)
      },
      // Rota 4: Histórico (Lazy Loading)
      {
        path: 'history',
        loadChildren: () => import('./pages/history/history-module').then(m => m.HistoryModule)
      }
    ]
  },
  // TODO: Adicionar rotas de Login/404 que não usam o layout principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }