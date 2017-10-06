import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Plant } from '../../../models/plant';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the HarvestPlantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-harvest-plant',
  templateUrl: 'harvest-plant.html',
})
export class HarvestPlantPage {

  plant = {} as Plant;
  key: any;
  gardens = [];
  products = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {

    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        const productRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`products`);
        const membersRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`members`);
        this.gardens.push(res);
        if (res.createdBy == USER.uid) {

          productRef.on('child_added', snapshot => {
            this.products.push(snapshot.val());
          })

        } else {

          membersRef.on('child_added', snapshot => {
            if (snapshot.val() == USER.uid) {
              productRef.on('child_added', snapshot => {
                this.products.push(snapshot.val());
              })
            }
          })
        }
      })
    })

    const detail = this.navParams.get('info')
    this.key = detail.$key;
    this.plant = this.navParams.get('info');
  }

  updatePlantHarvest() {

    this.afAuth.authState.take(1).subscribe(auth => {
      this.plant.updatedBy = auth.uid;
      this.plant.updatedDate = Date.now();
      this.plant.stage = 'Dry';
      this.afDatabase.object(`gardens/${this.plant.gardenId}/plants/${this.plant.plantId}`).set(this.plant)
        .then(() => this.navCtrl.pop())
    })
  }

}
