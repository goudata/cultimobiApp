import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../../models/user';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { AddToGardenPage } from '../add-to-garden/add-to-garden';
/**
 * Generated class for the ManageUsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-users',
  templateUrl: 'manage-users.html',
})
export class ManageUsersPage {

  userList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`users`).forEach(data=> {
      data.map(res => {
        if(res && res.$key != USER.uid) {
          this.userList.push(res);
        }
      });
    });
  }

  showDetail(data: any) {
    this.navCtrl.push(AddToGardenPage, {info: data});
  }
}
