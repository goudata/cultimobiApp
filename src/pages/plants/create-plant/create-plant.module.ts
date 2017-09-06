import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePlantPage } from './create-plant';

@NgModule({
  declarations: [
    CreatePlantPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePlantPage),
  ],
})
export class CreatePlantPageModule {}
