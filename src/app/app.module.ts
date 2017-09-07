import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlantsPage } from "../pages/plants/plants";
import { CreatePlantPage } from "../pages/plants/create-plant/create-plant";
import { ScanBarcodePage } from "../pages/scan-barcode/scan-barcode";
import { ProductsPage } from "../pages/products/products";
import { CreateProductPage } from "../pages/products/create-product/create-product";
import { TutorialPage } from "../pages/tutorial/tutorial";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Camera } from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
    TutorialPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PlantsPage,
    CreatePlantPage,
    ScanBarcodePage,
    ProductsPage,
    CreateProductPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TutorialPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PlantsPage,
    CreatePlantPage,
    ScanBarcodePage,
    ProductsPage,
    CreateProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
