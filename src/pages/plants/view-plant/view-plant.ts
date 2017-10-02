import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera } from '@ionic-native/camera';
import { Plant } from '../../../models/plant';

/**
 * Generated class for the ViewPlantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-plant',
  templateUrl: 'view-plant.html',
})
export class ViewPlantPage {

  plant = {} as Plant;
  currentImage: any;
  key: any;
  gardens = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private camera: Camera
  ) {


    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        if (res.createdBy == USER.uid) {
          this.gardens.push(res);
        } else {
          if (res.members && res.members.userkey == USER.uid) {
            this.gardens.push(res);
          }
        }
      });
    });

    const detail = this.navParams.get('info')
    this.key = detail.$key;
    this.plant = this.navParams.get('info');
    this.currentImage = this.plant.imageURL;
  }
}
