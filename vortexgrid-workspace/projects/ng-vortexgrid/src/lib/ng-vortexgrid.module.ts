import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VortexGridTableComponent } from './ng-vortexgrid.component';

@NgModule({
  declarations: [VortexGridTableComponent],
  imports: [CommonModule],
  exports: [VortexGridTableComponent]
})
export class VortexGridModule { }