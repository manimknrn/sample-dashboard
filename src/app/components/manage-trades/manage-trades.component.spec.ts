import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ManageTradesComponent } from './manage-trades.component';

describe('ManageTradesComponent', () => {
  let component: ManageTradesComponent;
  let fixture: ComponentFixture<ManageTradesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MatTableModule, HttpClientTestingModule],
      providers: [HttpClient, HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTradesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load customer data on initialization', fakeAsync(() => {
    const mockCustomerData: any = [
      {
        "id": 1,
        "stockSymbol": "USD",
        "quantity": 1,
        "price": 1,
        "notes": "test notes",
        "settlementDate": "Sep 5, 2024",
        "paymentMethod": "bankTransfer",
        "transactionFee": 56
      }
    ];

    tick();
    fixture.detectChanges();

    expect(component.data).toBeFalsy(mockCustomerData);
  }));

});
