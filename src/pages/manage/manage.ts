import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ManageLocationsPage } from "./manage-locations/manage-locations";
import { ManageUsersPage } from "./manage-users/manage-users";

/**
 * Generated class for the ManagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToLocations() {
    this.navCtrl.push(ManageLocationsPage);
  }

  goToUsers() {
    this.navCtrl.push(ManageUsersPage);
  }

}
