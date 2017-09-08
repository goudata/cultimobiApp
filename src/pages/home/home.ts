import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { PlantsPage } from "../plants/plants";
import { CreatePlantPage } from "../plants/create-plant/create-plant";
import { ScanBarcodePage } from "../scan-barcode/scan-barcode";
import { ProductsPage } from "../products/products";
import { TutorialPage } from "../tutorial/tutorial";
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from "../login/login";
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Profile } from "../../models/profile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profileData: FirebaseObjectObservable<Profile>;

  constructor(private toast: ToastController, public navCtrl: NavController, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {

  }


  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
      if(!auth){
        this.navCtrl.setRoot(LoginPage);
      }
    })
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

  async ionViewWillLoad() {
    await this.afAuth.authState.subscribe(data => {
      // this.toast.create({
      //   message: `Welcome back, ${data.email}`,
      //   duration: 3000  
      // }).present();

      this.profileData = this.afDatabase.object(`profile/${data.uid}`);

    })
  }

}
