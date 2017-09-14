import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateGardenPage } from './create-garden';

@NgModule({
  declarations: [
    CreateGardenPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateGardenPage),
  ],
})
export class CreateGardenPageModule {}
