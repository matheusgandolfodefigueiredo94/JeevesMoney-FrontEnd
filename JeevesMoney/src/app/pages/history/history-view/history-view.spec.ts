import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryView } from './history-view';

describe('HistoryView', () => {
  let component: HistoryView;
  let fixture: ComponentFixture<HistoryView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
