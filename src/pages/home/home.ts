import { Component } from '@angular/core';
import { NavController, ToastController, IonicPage } from 'ionic-angular';
import { PlantsPage } from "../plants/plants";
import { CreatePlantPage } from "../plants/create-plant/create-plant";
import { ScanBarcodePage } from "../scan-barcode/scan-barcode";
import { ProductsPage } from "../products/products";
import { TutorialPage } from "../tutorial/tutorial";
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from "../login/login";
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Profile } from "../../models/profile";
import { ManagePage } from "../manage/manage";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profileData: FirebaseObjectObservable<Profile>;

  constructor(private toast: ToastController, public navCtrl: NavController, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {

  }


  goToPlants() {
    this.navCtrl.push(PlantsPage)
  }

  goToNewPlant() {
    this.navCtrl.push(CreatePlantPage)
  }

  goToScanPlant() {
    this.navCtrl.push(ScanBarcodePage)
  }

  goToProducts() {
    this.navCtrl.push(ProductsPage)
  }

  goToManage() {
    this.navCtrl.push(ManagePage)
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid && data.emailVerified) {
        // this.toast.create({
        //   message: `Welcome back, ${data.email}`,
        //   duration: 3000
        // }).present();
      } else {
        this.navCtrl.setRoot(LoginPage);
      }

      // this.profileData = this.afDatabase.object(`profile/${data.uid}`);

    })
  }

}
