import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Plant } from '../../../models/plant';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the CutPlantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cut-plant',
  templateUrl: 'cut-plant.html',
})
export class CutPlantPage {

  plant = {} as Plant;
  key: any;
  gardens = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {

    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        this.gardens.push(res);
      })
    })

    const detail = this.navParams.get('info')
    this.key = detail.$key;
    this.plant = this.navParams.get('info');
  }

  updatePlantCut() {

    this.afAuth.authState.take(1).subscribe(auth => {
      this.plant.updatedBy = auth.uid;
      this.plant.updatedDate = Date.now();
      this.plant.stage = 'Clone';
      this.afDatabase.object(`gardens/${this.plant.gardenId}/plants/${this.plant.plantId}`).set(this.plant)
        .then(() => this.navCtrl.pop())
    })
  }

}
