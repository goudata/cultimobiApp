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
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from "../pages/login/login";
import { ProfilePage } from "../pages/profile/profile";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { ViewProductPage } from "../pages/products/view-product/view-product";
import { LogoutPage } from "../pages/logout/logout";

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
    CreateProductPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ViewProductPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
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
    CreateProductPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ViewProductPage ,
    LogoutPage
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
