import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  styleUrl: './trade-settlement.component.scss'
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

  constructor(private _formBuilder: FormBuilder) {
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

  getControl(name: string): FormControl {
    return this.firstFormGroup.get(name) as FormControl;
  }

  getSecondFormControl(name: string): FormControl {
    return this.secondFormGroup.get(name) as FormControl;
  }

  getSettlementFormControl(name: string): FormControl {
    return this.settlementFormGroup.get(name) as FormControl;
  }

  getErrorMessage(controlName: string): string {
    const control = this.firstFormGroup.get(controlName);
    
    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    if (control?.hasError('pattern')) {
      return 'Invalid format.';
    }
    if (control?.hasError('min')) {
      return 'Value must be greater than 0.';
    }
    return '';
  }

  onSubmit() {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.settlementFormGroup.valid
    ) {
      const formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.settlementFormGroup.value,
      };
      console.log('Form Submitted!', formData);
    } else {
      console.log('Form is invalid');
    }
  }
}
