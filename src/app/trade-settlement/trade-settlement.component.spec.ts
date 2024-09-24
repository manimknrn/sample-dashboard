import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeSettlementComponent } from './trade-settlement.component';


describe('TradeSubmissionComponent', () => {
  let component: TradeSettlementComponent;
  let fixture: ComponentFixture<TradeSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeSettlementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
