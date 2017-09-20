import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ManageUsersPage } from "./manage-users/manage-users";
import {GardensPage} from "../gardens/gardens";

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

  goToUsers() {
    this.navCtrl.push(ManageUsersPage);
  }

  goToGardens() {
    this.navCtrl.push(GardensPage);
  }

}
