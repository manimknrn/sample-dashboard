import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, CommonModule, FormsModule, MatSelectModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class SelectInputComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() options: Array<{ value: string; label: string }> = [];
  @Input() required: boolean = false;
  @Input() control!: FormControl;

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
