import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Plugins,
  // PushNotification,
  // PushNotificationToken,
  // PushNotificationActionPerformed,
  Capacitor
} from '@capacitor/core';

// const { PushNotifications } = Plugins;
const { Device } = Plugins;
const { App } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submittedForm = false;
  errorMessage: string;
  platformName: string;
  deviceToken: string;
  bbSubscription: any;
  showPassword: boolean = false;

  constructor(private common: CommonService, private formBuilder: FormBuilder) { }

  async ngOnInit() {

    // this.common.storage.clear();

    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (Capacitor.platform !== 'web') {

      // this.platformName = this.getPlatform();
      await Device.getInfo().then((deviceInfo) => {
        console.log('Device Info:', deviceInfo);
        this.deviceToken = deviceInfo.uuid;
        this.platformName = deviceInfo.platform;
      });
      // this.registerPush();

    } else {

      this.deviceToken = 'ba4c534c9a889600';
      this.platformName = 'android';

    }

  }

  ionViewDidEnter() {

    this.bbSubscription = this.common.platform.backButton.subscribe(() => {

      // navigator['app'].exitApp();
      App.exitApp();

    });
  }

  ionViewWillLeave() {
    this.bbSubscription.unsubscribe();
  }

  // getPlatform() {
  //   if (Capacitor.platform === 'android' || Capacitor.platform === 'ios') {

  //     // this.registerPush();

  //     if (Capacitor.platform === 'android') {

  //       return 'android';

  //     } else {

  //       return 'ios';

  //     }

  //   }
  // }

  // registerPush() {
  //   PushNotifications.requestPermission().then((permission) => {
  //     if (permission.granted) {
  //       // Register with Apple / Google to receive push via APNS/FCM
  //       PushNotifications.register();
  //     } else {
  //       // No permission for push granted
  //     }
  //   });

  //   PushNotifications.addListener(
  //     'registration',
  //     (token: PushNotificationToken) => {
  //       console.log('My token: ' + JSON.stringify(token));
  //       this.deviceToken = token.value;
  //     }
  //   );

  //   PushNotifications.addListener('registrationError', (error: any) => {
  //     console.log('Error: ' + JSON.stringify(error));
  //   });

  //   PushNotifications.addListener(
  //     'pushNotificationReceived',
  //     async (notification: PushNotification) => {
  //       console.log('Push received: ' + JSON.stringify(notification));
  //     }
  //   );

    // PushNotifications.addListener(
    //   'pushNotificationActionPerformed',
    //   async (notification: PushNotificationActionPerformed) => {
    //     const data = notification.notification.data;
    //     console.log('Action performed: ' + JSON.stringify(notification.notification));
    //     if (data.detailsId) {
    //       this.common.router.navigateByUrl(`/home/${data.detailsId}`);
    //     }
    //   }
    // );
  // }

  onPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  async login() {

    this.submittedForm = true;

    this.loginForm.value.device_type = this.platformName;
    this.loginForm.value.device_token = this.deviceToken;
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {

      await this.common.presentLoading();

      const category = 'login';
      // const loginParams = {
      //   name: 'test@gmail.com',
      //   password: 'User123!'
      // };
      // this.loginForm.value, loginParams
      this.common.postData(category, this.loginForm.value).then( (res: any) => {
        console.log('Login Response:', res);
        const response = JSON.parse(res.data);

        if (response.status === true) {

          this.common.stopLoading();
          this.common.setStorage('userInfo', response.user_details[0]);
          this.common.navController.navigateRoot('tabs');
  
        } else {

          this.common.stopLoading();

          if (response.message.length > 45) {
            this.common.presentAlert(response.message);
          } else {
            this.errorMessage = response.message;
          }

        }

        }, error => {
          this.common.stopLoading();
          this.common.ajaxErrorToast();
          console.log('Error:', error);
      });
    }
  }

  goToRegister() {
    this.common.router.navigate(['register']);

  }

  async fpAlert() {
    // Alert to get email for forgot password

    const email = '';

    const alert = await this.common.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Enter your email',
      inputs: [
        {
          type: 'email',
          placeholder: 'Email',
          value: email,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          // cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);

            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data[0])) {

              console.log('Email valid');
              this.fpAjax(data[0]);

            } else {

              console.log('Email not valid');
              this.common.presentAlert('Sorry, you have entered an invalid email.!');

            }

          }
        }
      ]
    });

    await alert.present();
  }

  async fpAjax(emailId: string) {
    // Forgot Password Ajax

    await this.common.presentLoading();

    const params = {
      email: emailId
      // device_token: this.deviceToken
    };
    this.common.postData('forgotPassword_new', params).then(async (res: any) => {
      console.log('Forgot Password Response:', res);

      this.common.stopLoading();
      this.common.presentAlert(res.message);

    }, error => {
      this.common.stopLoading();
      this.common.ajaxErrorToast();
      console.log('Error:', error);
    });

  }

}
