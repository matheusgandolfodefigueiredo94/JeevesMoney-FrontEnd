import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitabilityReport } from './profitability-report';

describe('ProfitabilityReport', () => {
  let component: ProfitabilityReport;
  let fixture: ComponentFixture<ProfitabilityReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfitabilityReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitabilityReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
