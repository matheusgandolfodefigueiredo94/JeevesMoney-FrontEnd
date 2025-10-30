import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { LoginComponent } from './pages/login/login';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard], 
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
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    // component: NotFoundComponent // (Descomente se criar o componente)
    redirectTo: 'login' // Ou simplesmente redirecione para o login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }