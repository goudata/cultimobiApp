import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HarvestPlantPage } from './harvest-plant';

@NgModule({
  declarations: [
    HarvestPlantPage,
  ],
  imports: [
    IonicPageModule.forChild(HarvestPlantPage),
  ],
})
export class HarvestPlantPageModule {}
