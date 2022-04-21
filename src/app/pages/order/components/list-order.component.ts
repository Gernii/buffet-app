import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-order',
  template: `
    <cdk-virtual-scroll-viewport
      itemSize="60"
      class="h-[600px]"
      (scroll)="onScroll($event)"
    >
      <ul>
        <ng-container
          *cdkVirtualFor="let item of items; let last = last; index as i"
        >
          <ng-container
            *ngTemplateOutlet="
              listItemTemplate!;
              context: { $implicit: item, index: i }
            "
          >
          </ng-container>
          <ng-container *ngIf="border">
            <hr *ngIf="!last" />
          </ng-container>
        </ng-container>
      </ul>
    </cdk-virtual-scroll-viewport>
  `,
})
export class ListOrderComponent {
  @Input() items: unknown[] | undefined;
  @Input() listItemTemplate: TemplateRef<unknown> | undefined;
  @Input() listHeight = 'h-600px';
  @Input() border = true;
  @Output() scrollEvent = new EventEmitter<HTMLElement>();
  onScroll(event: Event) {
    this.scrollEvent.emit(event.target as HTMLElement);
  }
}
