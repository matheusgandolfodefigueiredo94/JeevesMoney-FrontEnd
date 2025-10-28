import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BottomNav } from '../bottom-nav/bottom-nav';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, BottomNav],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
})
export class MainLayoutComponent {

}
