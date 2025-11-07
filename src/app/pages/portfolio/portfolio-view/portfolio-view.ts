import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { StockService } from '../../../services/stock.service';
import { StockQuote } from '../../../domain/stockQuote';

@Component({
  selector: 'app-portfolio-view',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './portfolio-view.html',
  styleUrls: ['./portfolio-view.scss'],
})
export class PortfolioView implements OnInit {
  stocks: StockQuote[] = [];
  isLoading = false;
  errorMessage = '';
  private stockSymbols = ['PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'MGLU3'];

  constructor(private stockService: StockService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPortfolio();
  }

  loadPortfolio() {
    this.isLoading = true;
    this.errorMessage = '';
    this.stocks = [];

    const observables = this.stockSymbols.map(symbol => 
      this.stockService.getQuote(symbol)
    );

    forkJoin(observables).subscribe({
      next: (quotes) => {
        this.stocks = quotes;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar cotações. Por favor, tente novamente mais tarde.';
        this.isLoading = false;
      }
    });
  }
}
