import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlantsPage } from './plants';

@NgModule({
  declarations: [
    PlantsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlantsPage),
  ],
})
export class PlantsPageModule {}
