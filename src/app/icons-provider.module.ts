import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  CheckOutline,
  EditOutline,
  MoneyCollectOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';

const icons = [UserOutline, MoneyCollectOutline, EditOutline, CheckOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
