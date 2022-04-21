import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard/dashboard.service';
@Component({
  templateUrl: 'order.component.html',

  styles: [
    `
      :host {
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100vw;
        height: 100vh;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .app-layout {
        height: 100vh;
      }

      nz-content {
        overflow-y: auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  foods = this.dashboardService.foods;
  id: string | null | undefined;
  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onOrder(value: number) {}
}
