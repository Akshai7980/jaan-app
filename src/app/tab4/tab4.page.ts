import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  levels: { image: string; name: string; percentage: number; style: string; }[];
  profile: { image: string; name: string; route: string }[];
  userInfo: any;
  currentYear = new Date().getFullYear();
  profileImage: string;
  image: any;

  constructor(public common: CommonService,
              // private camera: Camera,
              ) {
    this.common.storage.get('userInfo').then((val) => {
      console.log('Storage Value of userInfo:', val);
      this.userInfo = val;
    });
  }

  ngOnInit() {

    this.common.storage.get('profileImage').then((val) => {
      console.log('Storage Value of Profile Image:', val);
      if (val) {
        this.profileImage = val;
      } else {
        this.profileImage = '../../assets/icon/dummy-profile.jpg';
      }

    });

    this.levels = [
      {
        image: '../../assets/icon/home-listening.png',
        name: 'Listening',
        percentage: this.common.listeningScore,
        style: ''
      },
      {
        image: '../../assets/icon/home-speaking.png',
        name: 'Speaking',
        percentage: this.common.speakingingScore,
        style: '--progress-background: #019934; --background: #a1d9b4;'
      },
      {
        image: '../../assets/icon/home-reading.png',
        name: 'Reading',
        percentage: this.common.readingScore,
        style: '--progress-background: #01a0e4; --background: #c5e9f9;'
      },
      {
        image: '../../assets/icon/home-vocabulary.png',
        name: 'Vocabulary',
        percentage: this.common.vovabularyScore,
        style: '--progress-background: #0672a0; --background: #e6f1f5;'
      },
      {
        image: '../../assets/icon/home-grammar.png',
        name: 'Grammar',
        percentage: this.common.grammarScore,
        style: '--progress-background: #e6158c; --background: #fde7f4;'
      }
    ];

    this.profile = [
      {
        image: '../../assets/icon/profile-payment.png',
        name: 'Payment History',
        route: 'payment-history'
      },
      {
        image: '../../assets/icon/profile-cp.png',
        name: 'Change Password',
        route: 'change-password'
      }
    ];
  }

  async pickImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    });

    console.log(image);
    this.profileImage = 'data:image/jpeg;base64,' + image.base64String;
    this.common.setStorage('profileImage', this.profileImage);

    // const blobData = this.common.b64toBlob(image.base64String, `image/${image.format}`);

    // this.common.uploadImage(blobData, image.format).subscribe((newImage) => {
    //   console.log(newImage);
    // }, err => {
    //   console.log(err);
    // });
  }

  // pickImage(source: any) {

  //   const options: CameraOptions = {
  //     quality: 100,
  //     sourceType: source,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };

  //   this.camera.getPicture(options).then((imageData) => {
  //    // imageData is either a base64 encoded string or a file URI
  //    // If it's base64 (DATA_URL):
  //    this.image = imageData;
  //    this.profileImage = 'data:image/jpeg;base64,' + imageData;
  //    this.common.setStorage('profileImage', this.profileImage);

  //   }, (err) => {
  //    alert(err);
  //   });

  // }

  async selectOption() {
    const actionSheet = await this.common.actionSheetController.create({
      // header: 'Select your option',
      buttons: [{
        text: 'Gallery',
        icon: 'images',
        handler: () => {
          this.pickImage(CameraSource.Photos);
        }
      },
      {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.pickImage(CameraSource.Camera);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  async logoutAlert() {
    const alert = await this.common.alertController.create({
      // cssClass: 'my-custom-class',
      // header: 'Warning!',
      message: 'Are you sure to logout ?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.logout('logout');
          }
        },
        {
          text: 'Cancel',
        }
      ]
    });

    await alert.present();
  }

  async logout(value: string) {

    await this.common.presentLoading();

    const category = value;
    const params = {
      user_id: this.common.userInfo.id
    };

    this.common.postData(category, params).then((res: any) => {
      console.log('Logout Response:', res);

      this.common.stopLoading();
      this.common.storage.clear();
      this.common.navController.navigateRoot('');

      }, error => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        console.log('Error:', error);
    });

  }

}
