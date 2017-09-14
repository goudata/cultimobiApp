import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from "../login/login";
import { AngularFireDatabase } from "angularfire2/database";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.email);
      if(result){
        var USER = this.afAuth.auth.currentUser;
        USER.sendEmailVerification().then(function(){
        }).catch(function(err){
          this.toast.create({
            message: err,
            duration: 3000,
            position: 'center'
          }).present();
        })

        this.toast.create({
          message: `Please check your email ${USER.email} to verify your account before you log in.`,
          duration: 6000,
          position: 'center'
        }).present();

        this.afAuth.authState.take(1).subscribe(auth => {
          this.user.createdDate = Date.now();
          this.user.avatar = "assets/images/add-image.png";
          this.afDatabase.object(`users/${auth.uid}`).set(this.user)
        })

        this.navCtrl.setRoot(LoginPage);
      }
    } catch (error) {
      this.toast.create({
        message: error,
        duration: 3000,
        position: 'center'
      }).present();
    }
  }

}
