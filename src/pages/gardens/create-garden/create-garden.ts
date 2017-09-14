import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garden} from "../../../models/garden";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the CreateGardenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-garden',
  templateUrl: 'create-garden.html',
})
export class CreateGardenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
  }

  garden = {} as Garden;

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
