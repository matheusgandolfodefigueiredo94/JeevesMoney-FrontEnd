import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule,DecimalPipe } from '@angular/common';
import { StockService } from '../../../services/stock.service';
import { StockQuote } from '../../../domain/stockQuote';


@Component({
  selector: 'app-portfolio-view',
 standalone: true,
  imports: [CommonModule,DecimalPipe],
  templateUrl: './portfolio-view.html',
  styleUrls: ['./portfolio-view.scss'],
})
export class PortfolioView implements OnInit {
  stockSymbol = 'PETR4';
  stockPrice: number | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(private stockService: StockService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchStockQuote();
  }

  fetchStockQuote() {
    this.isLoading = true;
    this.errorMessage = '';
    this.stockService.getQuote(this.stockSymbol)
      .subscribe({
        next: (data: StockQuote) => {
          this.stockPrice = data.price;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage = 'Erro ao buscar cotação.';
          this.isLoading = false;
        }
      });
  }
}
