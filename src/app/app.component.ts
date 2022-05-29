import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
// import { CommonService } from '../app/services/common.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public storage: Storage,
    public router: Router,
    public navController: NavController
    // public common: CommonService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkUserInfo();

    });
  }

  checkUserInfo() {
    // Check whether user has logged in from this device,
    // if true redirect to home page
    this.storage.get('userInfo').then((val) => {
      if (val) {
        // this.router.navigate(['tabs']);
        this.navController.navigateRoot('tabs');
      } else {
        this.navController.navigateRoot('');
      }
    });
  }

}
