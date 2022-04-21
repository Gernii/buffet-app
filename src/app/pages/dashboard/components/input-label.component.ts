import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-input-label',
  template: `
    <div class="relative text-base bg-slate-100 px-4 border-2">
      <input
        [type]="inputType"
        [id]="formName"
        [ngModel]="input"
        (ngModelChange)="onInput($event)"
        class="border-b  pt-4 w-full outline-none bg-transparent peer"
        required
      />

      <label
        [for]="formName"
        class="absolute top-0 left-0 py-2 px-4 pointer-events-none duration-500 peer-focus:peer-required:-top-2 peer-focus:peer-required:text-xs peer-focus:peer-required:text-[#1890ff] peer-valid:peer-required:-top-2 peer-valid:peer-required:text-xs peer-valid:peer-required:text-[#1890ff]"
      >
        {{ formName }}
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputLabelComponent,
    },
  ],
})
export class InputLabelComponent implements ControlValueAccessor {
  @Input() iconBgColor = 'bg-slate-100';
  @Input() inputBgColor = 'bg-slate-100';

  @Input() iconColor = '!text-[#1890FF]';
  @Input() inputColor = 'text-black';

  @Input() iconType = 'user';
  @Input() inputType = 'text';
  @Input() formName = '';
  input = '';
  private readonly inputEvent = new BehaviorSubject<string>('');
  private readonly disabledEvent = new BehaviorSubject<boolean>(false);

  private onChange: ((value: string) => void) | undefined;
  private onTouched: (() => void) | undefined;

  writeValue(value: string): void {
    this.input = value || '';
    this.inputEvent.next(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(value: boolean) {
    this.disabledEvent.next(value);
  }

  onInput(value: string) {
    if (this.input !== value) {
      this.input = value;
      this.inputEvent.next(value);
      this.onChange?.(value);
      this.onTouched?.();
    }
  }
}
