import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DataRoutingModule } from './data-routing.module';
import { ControlPanelComponent, DataComponent, DataTableComponent } from '../ui';

@NgModule({
  declarations: [
    DataComponent,
    ControlPanelComponent,
    DataTableComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    DataRoutingModule,
  ],
  bootstrap: [],
})
export class DataModule { }
