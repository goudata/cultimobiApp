import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageLocationsPage } from './manage-locations';

@NgModule({
  declarations: [
    ManageLocationsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageLocationsPage),
  ],
})
export class ManageLocationsPageModule {}
