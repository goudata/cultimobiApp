import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlantsPage } from "../plants/plants";
import { CreatePlantPage } from "../plants/create-plant/create-plant";
import { ScanBarcodePage } from "../scan-barcode/scan-barcode";
import { ProductsPage } from "../products/products";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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

}
