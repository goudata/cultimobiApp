import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../login/login';

/**
 * Generated class for the LogoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
    // afAuth.auth.signOut();
    // navCtrl.setRoot(LoginPage)
  }

  ionViewDidLoad() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage)
  }

}
