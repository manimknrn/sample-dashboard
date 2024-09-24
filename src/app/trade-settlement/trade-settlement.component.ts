import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { DateInputComponent } from '../components/shared/components/date-input/date-input.component';
import { NumberInputComponent } from '../components/shared/components/number-input/number-input.component';
import { SelectInputComponent } from '../components/shared/components/select-input/select-input.component';
import { TextInputComponent } from '../components/shared/components/text-input/text-input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Trade } from '../components/shared/models/trade.model';

@Component({
  selector: 'app-trade-settlement',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    TextInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    DateInputComponent,
    FormsModule],
  templateUrl: './trade-settlement.component.html',
  styleUrl: './trade-settlement.component.scss',
  providers: [
    DatePipe
  ]
})
export class TradeSettlementComponent {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  settlementFormGroup: FormGroup;
  paymentMethods = [
    { value: 'creditCard', label: 'Credit Card' },
    { value: 'bankTransfer', label: 'Bank Transfer' },
    { value: 'paypal', label: 'PayPal' },
  ];
  tradeId!: number;
  isEditMode: boolean = false;
  router = inject(Router);

  constructor(private _formBuilder: FormBuilder, private datePipe: DatePipe, readonly cdr: ChangeDetectorRef, private route: ActivatedRoute) {
    this.firstFormGroup = this._formBuilder.group({
      stockSymbol: ['', [Validators.required, Validators.pattern('[A-Z]{1,5}')]],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });

    this.secondFormGroup = this._formBuilder.group({
      price: ['', [Validators.required, Validators.min(0)]],
      notes: [''],
    });

    this.settlementFormGroup = this._formBuilder.group({
      settlementDate: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      transactionFee: ['', [Validators.required, Validators.min(0)]],
    });

  }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   if (params['id']) {
    //     this.tradeId = params['id'];
    //     this.isEditMode = true;
    //   }
    // });

    const data = history.state.data;
    if (data) {
      console.log(data)
      data.settlementDate = new Date(data.settlementDate);
      this.patchFormValues(data);
    }
  }

  patchFormValues(data: any) {
    this.firstFormGroup.patchValue(data);
    const formattedDate = this.datePipe.transform(data.settlementDate, 'yyyy-MM-dd'); // Change the format as needed
    this.secondFormGroup.patchValue({
      settlementDate: formattedDate
    });
    this.secondFormGroup.patchValue(data);
    this.settlementFormGroup.patchValue(data);
  }

  // ngAfterViewInit(): void {
  //   if (this.isEditMode && this.tradeId) {
  //     this.loadTradeData(this.tradeId);
  //   }
  //   this.cdr.detectChanges();
  // }

  getControl(name: string): FormControl {
    return this.firstFormGroup.get(name) as FormControl;
  }

  getSecondFormControl(name: string): FormControl {
    return this.secondFormGroup.get(name) as FormControl;
  }

  getSettlementFormControl(name: string): FormControl {
    return this.settlementFormGroup.get(name) as FormControl;
  }

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.settlementFormGroup.valid
    ) {
      const formData = { ...this.firstFormGroup.value, ...this.secondFormGroup.value, ...this.settlementFormGroup.value };
      if (!!formData) {
        if (history.state.data) {
          this.updateLocalStorage(formData, history.state.data.id); // Update existing entry
        } else {
          const newTradeData = {
            id: this.generateId(),
            ...formData
          };
          this.addToLocalStorage(newTradeData);
        }
      }
      console.log('Form Submitted!', formData);
    } else {
      console.log('Form is invalid');
    }
  }

  loadTradeData() {
    this.router.navigate(['/manage-trades']);
  }

  generateId(): number {
    const existingData = this.getTradeSettlementData();
    return existingData.length === 0 ? 1 : Math.max(...existingData.map((item: Trade) => item.id)) + 1;
  }

  addToLocalStorage(newData: any) {
    const existingData = this.getTradeSettlementData();
    existingData.push(newData);
    localStorage.setItem('tradeSettlementData', JSON.stringify(existingData));
    this.loadTradeData();
  }

  updateLocalStorage(updatedData: any, id: any) {
    const existingData = this.getTradeSettlementData();
    const index = existingData.findIndex((item: Trade) => item.id === id);
    if (index !== -1) {
      updatedData.id = id;
      existingData[index] = updatedData; // Update the existing entry
      localStorage.setItem('tradeSettlementData', JSON.stringify(existingData));
    }
    this.loadTradeData();
  }

  getTradeSettlementData() {
    const data = localStorage.getItem('tradeSettlementData');
    return data ? JSON.parse(data) : { data: [] };
  }
}
