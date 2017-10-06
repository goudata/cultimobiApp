import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DryPlantPage } from './dry-plant';

@NgModule({
  declarations: [
    DryPlantPage,
  ],
  imports: [
    IonicPageModule.forChild(DryPlantPage),
  ],
})
export class DryPlantPageModule {}
