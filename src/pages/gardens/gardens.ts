import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garden} from "../../models/garden";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the GardensPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gardens',
  templateUrl: 'gardens.html',
})
export class GardensPage {

  garden = {} as Garden;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
  }


  createGarden() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.garden.createdBy = auth.uid;
      this.garden.createdDate = Date.now();
      this.garden.isActive = true;
      this.afDatabase.list(`gardens`).push(this.garden)
        .then(() => this.navCtrl.pop())
    })
  }

}
