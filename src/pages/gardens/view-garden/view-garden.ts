import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garden} from "../../../models/garden";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the ViewGardenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-garden',
  templateUrl: 'view-garden.html',
})
export class ViewGardenPage {

  garden = {} as Garden;
  currentImage: any;
  key: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    const detail = this.navParams.get('info')
    this.key = detail.$key;
    this.garden = this.navParams.get('info');
    // this.currentImage = this.product.imageURL;
  }


  updateGarden() {

    this.afAuth.authState.take(1).subscribe(auth => {
      this.garden.updatedBy = auth.uid;
      this.garden.updatedDate = Date.now();

      this.afDatabase.object(`gardens/${this.key}`).set(this.garden)
        .then(() => this.navCtrl.pop())
    })
  }

  deleteGarden() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`gardens/${this.key}`).remove()
        .then(() => this.navCtrl.pop())
    })
  }
}
