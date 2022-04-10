import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-edit-modal',
  animations: [
    trigger('openModal', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
  styles: [
    `
      .box {
        @apply grid gap-2 items-center;
      }
      .bg-black-w-opacity {
        background-color: rgba(0, 0, 0, 0.4);
      }
    `,
  ],
  templateUrl: 'edit-modal.component.html',
})
export class EditModalComponent {
  typeList = ['text', 'boolean', 'categorical', 'float', 'list', 'any'];
  editingSlot: Slot | undefined = undefined;
  modalStatus$ = this.slotService.modalStatus$;
  form$: Observable<FormGroup | undefined>;

  constructor(private fb: FormBuilder) {
    this.form$ = this.slotService.selectedSlot$.pipe(
      filter((u): u is Slot => !!u),
      map((slot) => {
        this.editingSlot = slot;
        return this.fb.group({
          name: [slot.name, Validators.required],
          type: [slot.type, Validators.required],
          influenceConversation: slot.influenceConversation,
          autoFill: slot.autoFill,
          categorical: slot.type === 'categorical' ? [] : undefined,
          content: slot.content,
        });
      })
    );
  }

  onConfirm(form: FormGroup) {
    this.sdkSLotService.addSlot(form.value).subscribe(() => {
      this.onClear();
    });
  }

  onClear() {
    this.slotService.modalStatus = undefined;
  }

  onReset(form: FormGroup) {
    if (this.editingSlot !== undefined) form.reset(this.editingSlot);
    else form.reset();
  }
}
