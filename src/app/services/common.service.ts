import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ModalController,
  ToastController,
  Platform,
  NavController,
  AlertController,
} from "@ionic/angular";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { LoadingController } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { ActionSheetController } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import { Howl } from "howler";
import { UserIdleService } from "angular-user-idle";
import { HTTP } from "@awesome-cordova-plugins/http/ngx";

// const baseUrl = 'http://web.sicsglobal.com/jaan/api/';
let baseUrl: string;
baseUrl = "https://dashboard.jayonweb.com/api/";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  colors = [
    "#e3eedd",
    "#fbdddd",
    "#eceaff",
    "#e9e7db",
    "#dfebe1",
    "#eadcdb",
    "#dbdbe3",
    "#dbe0da",
    "#eee8dc",
  ];
  colors2 = [
    "#01aced",
    "#e3007d",
    "#e14500",
    "#03296b",
    "#00a650",
    "#75727d",
    "#2d3093",
    "#8ebdd9",
    "#f08025",
    "#0b5676",
    "#1e94c2",
    "#11c52a",
    "#bc0e93",
    "#000101",
    "#4c00fc",
    "#e70605",
  ];
  audioFile: MediaObject;
  userInfo: any;
  loading: HTMLIonLoadingElement;
  notificationCount: number;
  favourites = false;
  levelId: number;
  sublevelId: number;
  aspectId: number;
  userType: string;
  trialDuration: string;
  premiumDuration: number;
  audioType = "html5";
  sounds: any = [];
  playerGif: Howl = null;
  gifPath = "";
  listeningScore = 0;
  readingScore = 0;
  grammarScore = 0;
  vovabularyScore = 0;
  speakingingScore = 0;
  bookClass = 0;
  idleGifPath: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public modalController: ModalController,
    public toastController: ToastController,
    public alertController: AlertController,
    public navController: NavController,
    public platform: Platform,
    public http: HttpClient,
    public storage: Storage,
    public media: Media,
    public loadingController: LoadingController,
    public popoverController: PopoverController,
    public file: File,
    public actionSheetController: ActionSheetController,
    public userIdle: UserIdleService,
    private httpNative: HTTP
  ) {}

  getData(category: string, params: any) {
    console.log("Category:", category);
    console.log("Params:", params);
    const headers = {
      'Accept': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    };
    if (this.platform.is("cordova")) {
      console.log("is cordova");
      this.httpNative
        .get(baseUrl + category, params, headers)
        .then((data) => {
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);
        })
        .catch((error) => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
        });
    } else {
    return this.http
      .get(params ? baseUrl + category + params : baseUrl + category)
      .pipe(map((res) => res));
    }
  }

  postData(category: string, params: any) {
    console.log("Category:", category);
    console.log("Params:", params);
      return new Promise((resolve, reject) => {
        this.httpNative.post(baseUrl + category, params, {}).then(
          (res) => {
            resolve(res);
            console.log(res.status);
            // console.log(res.data); // data received by server
            // console.log(res.headers);
          },
          (error) => {
            reject(error);
            console.log(error.status);
            // console.log(error.error); // error message as string
            // console.log(error.headers);
          }
        );
      });
  }

  postOtp(params: any) {
    if (this.platform.is("cordova")) {
      console.log("is cordova");
      this.httpNative
        .get('https://dashboard.jayonweb.com/jaan_twilio/twilio.php?phone=' +  params.number, '', '')
        .then((data) => {
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);
        })
        .catch((error) => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
        });
    } else {
    return this.http
      .get(
        "https://dashboard.jayonweb.com/jaan_twilio/twilio.php?phone=" +
          params.number
      )
      .pipe(map((res) => res));
    }
  }

  uploadImage(category: string, formData: any) {
    return this.http.post(`${baseUrl}${category}`, formData);
  }

  b64toBlob(b64Data, contentType = "", sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  setStorage(key: string, value: any) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    await this.storage.get(key).then((val) => {
      console.log("Value From Storage:", val);
      return val;
    });
  }

  async presentAlert(alertMessage: string) {
    const alert = await this.alertController.create({
      message: alertMessage,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async presentToast(m: string) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000,
    });
    toast.present();
  }

  async ajaxErrorToast() {
    const toast = await this.toastController.create({
      message: "Something went wrong. Please try again later.!",
      duration: 2000,
    });
    toast.present();
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  openPage(page: string, tab: any, navigationExtras: any) {
    let route: string;

    route = tab ? "tabs/tab" + tab + "/" + page : page;

    this.router.navigate([route], navigationExtras ? navigationExtras : "");
  }

  async playAudio(url: string) {
    if (url) {
      await this.presentLoading();

      console.log("Audio Url:", url);

      this.audioFile = this.media.create(url);
      this.stopLoading();
      this.audioFile.play();
    } else {
      this.presentToast("Sorry, No audio to play.!!");
    }
  }

  audioSeekTo(val: number) {
    const seconds = val * 1000;
    this.audioFile.seekTo(seconds);
  }

  pauseAudio() {
    this.audioFile.pause();
  }

  stopAudio() {
    this.audioFile.release();
  }

  playGif(audioFile: string, type: any) {
    if (type !== "") {
      this.gifPath = "../../assets/icon/" + type + ".gif";
    }

    const audioPath = "../../assets/audio/" + audioFile;

    this.playerGif = new Howl({
      src: audioPath,
      html5: true,
      onend: () => {
        console.log("Audio Finished playing!");
        this.gifPath = "";
      },
    });
    this.playerGif.play();
  }

  playIdleGif() {
    this.userIdle.startWatching();

    this.userIdle.onTimerStart().subscribe((count) => {
      console.log(count);
    });

    this.userIdle.onTimeout().subscribe(() => {
      console.log("Idle time !");
      this.gifPath = "../../assets/icon/walking.gif";
      setTimeout(() => {
        this.gifPath = "";
      }, 6000);
      this.userIdle.resetTimer();
    });
  }

  clearIdleGif() {
    this.gifPath = "";
    this.userIdle.stopTimer();
    this.userIdle.stopWatching();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({});
    await this.loading.present();
  }

  async stopLoading() {
    await this.loading.dismiss();
  }

  // filterItems(searchTerm: string, segment: string){

  //   console.log(searchTerm, this.dictionaryData);

  //   if (segment === 'english') {

  //     return this.dictionaryData.filter((item) => {
  //       return item.meaning.toLowerCase().includes(searchTerm.toLowerCase());
  //     });

  //   } else {

  //     return this.dictionaryData.filter((item) => {
  //       return item.pronounciation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.dic_word?.toLowerCase().includes(searchTerm.toLowerCase());
  //     });

  //   }

  // }

  // async filterList(res: any, search: string) {
  //   // this.foodList = await this.initializeItems();
  //   const data = res;
  //   const searchTerm = search;

  //   if (!searchTerm) {
  //     return;
  //   }

  //   return data.filter(element => {
  //     // if (currentFood.level_name && searchTerm) {
  //       return (element.level_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
  //       // return (currentFood.level_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentFood.type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
  //     // }
  //   });
  // }
}
