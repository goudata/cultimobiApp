import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  templateUrl: 'view-plant.html'
})
export class ViewPlantPage {

  plant = {} as Plant;
  currentImage: any;
  key: any;
  gardens = [];
  products = [];

  options: CameraOptions = {
    quality: 75,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private camera: Camera
  ) {


    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        const productRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`products`);
        const membersRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`members`);
        this.gardens.push(res);
        if(res.createdBy == USER.uid){

          productRef.on('child_added', snapshot => {
            this.products.push(snapshot.val());
          })

        } else {

          membersRef.on('child_added', snapshot => {
            if(snapshot.val() == USER.uid){
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
    this.currentImage = this.plant.imageURL;
  }

  updatePlant() {

    this.afAuth.authState.take(1).subscribe(auth => {
      this.plant.updatedBy = auth.uid;
      this.plant.updatedDate = Date.now();

      this.afDatabase.object(`gardens/${this.plant.gardenId}/plants/${this.plant.plantId}`).set(this.plant)
        .then(() => this.navCtrl.pop())
    })
  }

  deletePlant() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`gardens/${this.plant.gardenId}/plants/${this.plant.plantId}`).remove()
        .then(() => this.navCtrl.pop())
    })
  }
}
