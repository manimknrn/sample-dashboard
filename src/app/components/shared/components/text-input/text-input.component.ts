import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() control!: FormControl;
  @Input() type = 'text';
  showCard: boolean = false;
  @Input() isPwdType = false;
  @Output() valueChange = new EventEmitter<string>();
  originalValue: string = '';
  @Input() showPassword: boolean = false;
  @Input() maxLength?: number;
  value: string = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    console.log('registerOnChange called');
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    console.log('registerOnTouched called');
    this.onTouched = fn;
  }

  onInput(value: string) {
    if (!this.isPwdType) {
      // Only format for credit card input
      const cleaned = value.replace(/\D/g, ''); // Remove non-digit characters
      this.originalValue = cleaned; // Update original value without formatting
      this.value = this.formatCreditCardMask(cleaned); // Apply masking
    } else {
      this.value = value; // No formatting for password
    }

    this.onChange(this.originalValue); // Call onChange with original value
    this.valueChange.emit(this.value); // Emit masked value for display
  }

  private formatCreditCardMask(value: string): string {
    const formatted = value.replace(/(.{4})/g, '$1 ').trim(); // Format with spaces
    const masked = formatted.replace(/\d/g, '•'); // Mask digits with dots
    return masked;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  get inputType() {
    return !this.showPassword ? 'text' : 'password';
  }
}