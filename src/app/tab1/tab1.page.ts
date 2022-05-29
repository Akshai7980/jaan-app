import { Component, ViewChild, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
import { IonContent } from "@ionic/angular";
import { NavigationExtras } from "@angular/router";
import { Plugins, Capacitor } from "@capacitor/core";
import { PaymentModalPage } from "../payment-modal/payment-modal.page";
import { IntroGifPage } from "../intro-gif/intro-gif.page";
import { Howl } from "howler";
import { IonSlides } from "@ionic/angular";

const { Device } = Plugins;
const { App } = Plugins;

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  levels: any;
  sections: any;
  testimonials: any;
  jCorner: any;
  banner: any;
  bbSubscription: any;
  userName: any;
  data: any;
  headerWish = "";
  modal = false;
  notifications: any;
  slideVideoOpts = {
    initialSlide: 0,
    speed: 400,
  };
  slideImageOpts = {
    initialSlide: 0,
    autoplay: true,
    speed: 400,
  };
  notificationInterval: any;

  @ViewChild(IonContent) content: IonContent;
  @ViewChild("slides", { static: false }) slides: IonSlides;
  sliderVideo: HTMLMediaElement;
  videoTitle: string;
  deviceToken: string;
  // sliderVideoHeading

  constructor(public common: CommonService) {
    let today: Date;
    today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      this.headerWish = "Good Morning";
    } else if (curHr < 18) {
      this.headerWish = "Good Afternoon";
    } else {
      this.headerWish = "Good Evening";
    }

    // this.openModal(5);

    this.levels = [
      {
        image: "../../assets/icon/home-listening.png",
        name: "Listening",
        percentage: 0,
        style: "",
      },
      {
        image: "../../assets/icon/home-speaking.png",
        name: "Speaking",
        percentage: 0,
        style: "--progress-background: #019934; --background: #a1d9b4;",
      },
      {
        image: "../../assets/icon/home-reading.png",
        name: "Reading",
        percentage: 0,
        style: "--progress-background: #01a0e4; --background: #c5e9f9;",
      },
      {
        image: "../../assets/icon/home-vocabulary.png",
        name: "Vocabulary",
        percentage: 0,
        style: "--progress-background: #0672a0; --background: #e6f1f5;",
      },
      {
        image: "../../assets/icon/home-grammar.png",
        name: "Grammar",
        percentage: 0,
        style: "--progress-background: #e6158c; --background: #fde7f4;",
      },
      // {
      //   image: '../../assets/icon/home-writing.png',
      //   name: 'Writing',
      //   percentage: 0,
      //   style: '--progress-background: #e1811b; --background: #fcf2e7;'
      // }
    ];

    this.sections = [
      {
        name: "listening",
        image: "../../assets/icon/aspects-1.png",
        dColor: "#393186",
        lColor: "#dff1fd",
        arrow: "../../assets/icon/writing-blue-arrow.png",
      },
      {
        name: "speaking",
        image: "../../assets/icon/aspects-2.png",
        dColor: "#019934",
        lColor: "#dff1fd",
        arrow: "../../assets/icon/level-ar6.png",
      },
      {
        name: "reading",
        image: "../../assets/icon/aspects-3.png",
        dColor: "#01a0e4",
        lColor: "#dff1fd",
        arrow: "../../assets/icon/fun-arrow.png",
      },
      {
        name: "writing",
        image: "../../assets/icon/aspects-4.png",
        dColor: "#ef832b",
        lColor: "#dff1fd",
        arrow: "../../assets/icon/level-ar2.png",
      },
    ];
  }

  ngOnInit() {
    this.getUdid();

    setTimeout(() => {
      this.getUserInfo();
    }, 1000);
  }

  ionViewWillEnter() {
    // setTimeout(() => {
    //   this.getUserInfo();
    // }, 1000);

    this.notificationInterval = setInterval(() => {
      this.getNotifications();
    }, 2000);
  }

  ionViewDidEnter() {
    // this.getUserInfo();
    // this.getData();

    // this.notificationInterval = setInterval(() => {
    //   this.getNotifications();
    // }, 2000);

    this.bbSubscription = this.common.platform.backButton.subscribe(() => {
      // navigator['app'].exitApp();
      if (!this.modal) {
        App.exitApp();
      }
    });
  }

  ionViewWillLeave() {
    this.bbSubscription.unsubscribe();
    clearInterval(this.notificationInterval);
    this.sliderVideo.pause();
  }

  playVideoSlide(i: number) {
    this.sliderVideo = document.getElementById("video" + i) as HTMLMediaElement;
    this.sliderVideo.src = this.banner.videos[i].videos;
    this.sliderVideo.play();
    this.sliderVideo.addEventListener("ended", () => {
      i++;
      if (i < this.banner.videos.length) {
        this.slides.slideNext();
        this.playVideoSlide(i);
      }
    });
  }

  setSlide() {
    this.slides.getActiveIndex().then((index) => {
      if (this.sliderVideo) {
        this.sliderVideo.pause();
      }

      this.videoTitle = this.banner.videos[index].title;

      this.sliderVideo = document.getElementById(
        "video" + index
      ) as HTMLMediaElement;

      // this.playVideoSlide(index);
    });
  }

  doRefresh(event) {
    // clearInterval(this.notificationInterval);
    // Ajax call to update data
    const params = {
      user_id: this.common.userInfo.id,
    };
    this.common.postData("homepage", params).then(
      async (res: any) => {
        console.log("Home Page Response:", res);
        const response = JSON.parse(res.data);

        if (response.status === true) {
          event.target.complete();
          this.initializeValuesOnSuccess(response);

          // this.openModal(res.amount, 0);
        } else {
          event.target.complete();
          this.common.presentToast(response.message);
        }
      },
      (error) => {
        event.target.complete();
        this.common.ajaxErrorToast();
        console.log("Error:", error);
      }
    );
    // setTimeout(() => {
    // event.target.complete();
    // }, 100);
  }

  scrollRight() {
    this.content.scrollToPoint(200, 0);
  }

  async getUserInfo() {
    // Get User Info from storage
    await this.common.storage.get("userInfo").then(async (val) => {
      console.log("Storage Value of userInfo:", val);
      this.common.userInfo = val;
      this.userName = val.name;
      await this.getData(val.id);
      console.log("User Name:", this.userName);
    });
  }

  async getData(id: any) {
    // Ajax call for Homepage data
    await this.common.presentLoading();

    const params = {
      user_id: id,
    };
    this.common.postData("homepage", params).then(
      async (res: any) => {
        const response = JSON.parse(res.data);
        console.log("Home Page Response:", response);

        if (response.status === true) {
          this.common.stopLoading();
          this.initializeValuesOnSuccess(response);
        } else {
          this.common.stopLoading();
          this.common.presentToast(response.message);
        }
      },
      (error) => {
        this.common.stopLoading();
        // this.common.ajaxErrorToast();
        // this.openModal(0, 0, 'Something went wrong. Please try again later.!');
        this.errorAlert();
        console.log("Error:", error);
      }
    );
  }

  async errorAlert() {
    const alert = await this.common.alertController.create({
      // cssClass: 'my-custom-class',
      // header: 'Warning!',
      message: "Something went wrong. Please try again later.!",
      backdropDismiss: true,
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.refreshData(this.common.userInfo.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async getUdid() {
    if (Capacitor.platform !== "web") {
      await Device.getInfo().then((deviceInfo) => {
        console.log("Device Info:", deviceInfo);
        this.deviceToken = deviceInfo.uuid;
      });
    } else {
      this.deviceToken = "ba4c534c9a889600";
    }
  }

  async initializeValuesOnSuccess(res: any) {
    if (this.deviceToken === res.device_token) {
      this.testimonials = res.testimonial;
      this.jCorner = res.jaancorner;
      this.banner = res.banner;

      this.levels[0].percentage = res.listeningscore;
      this.levels[1].percentage = res.speakingscore;
      this.levels[2].percentage = res.readingscore;
      this.levels[3].percentage = res.vocabularyscore;
      this.levels[4].percentage = res.grammarscore;

      this.common.listeningScore = res.listeningscore;
      this.common.speakingingScore = res.speakingscore;
      this.common.readingScore = res.readingscore;
      this.common.vovabularyScore = res.vocabularyscore;
      this.common.grammarScore = res.grammarscore;

      this.common.bookClass = res.bookclass;

      if (res.freetrial === 1 && res.subscription === 0) {
        console.log(this.userName + " is a Free User.");
        this.common.userType = "free";
        this.common.trialDuration = res.timeleftfreetrail;
        this.openModal(res.amount, 0, res.freetrialtext);
      } else if (res.freetrial === 0 && res.subscription === 1) {
        console.log(this.userName + " is a Premium User.");
        this.common.userType = "premium";
        this.common.premiumDuration = res.subscriptiondays;
        if (res.subscriptiondays <= 7 && res.subscriptiondays > 0) {
          this.openModal(0, 4, res.freetrialtext, res.subscriptiondays);
        }
      } else if (res.freetrial === 1 && res.subscription === 1) {
        console.log(this.userName + " is a Premium User.");
        this.common.userType = "premium"; // User activated through admin
      } else if (res.freetrial === 0 && res.subscription === 0) {
        console.log("Access Blocked for", this.userName, ". Pay to continue.");
        this.common.userType = "blocked";
        this.openModal(res.amount, 0, res.freetrialtext);
      }

      setTimeout(() => {
        if (this.banner.videos.length > 0) {
          // this.playVideoSlide(0);
          this.sliderVideo = document.getElementById(
            "video0"
          ) as HTMLMediaElement;
        }
      }, 2000);

      this.videoTitle = this.banner.videos[0].title;
    } else {
      await this.common.presentLoading();

      const category = "logout";
      const params = {
        user_id: this.common.userInfo.id,
      };

      this.common.postData(category, params).then(
        (res: any) => {
          const response = JSON.parse(res.data);
          console.log("Logout Response:", response);

          this.common.stopLoading();
          this.common.storage.clear();
          this.common.presentToast("User has logged in from another device.");
          this.common.navController.navigateRoot("");
        },
        (error) => {
          this.common.stopLoading();
          this.common.ajaxErrorToast();
          console.log("Error:", error);
        }
      );
    }
  }

  async openModal(res: number, v: number, text: string, dLeft?: string) {
    // this.modal = true;

    const modal = await this.common.modalController.create({
      component: PaymentModalPage,
      componentProps: {
        amount: res,
        view: v,
        text,
        durationLeft: dLeft,
      },
      backdropDismiss: false,
      cssClass: "payment-modal",
    });

    modal.onDidDismiss().then(async () => {
      // this.modal = false;
      await this.common.storage.get("introGif").then(async (val) => {
        console.log("Storage Value of introGif:", val);
        if (v === 0 && val !== 1) {
          await this.openIntroGif();
          this.common.setStorage("introGif", 1);
        }
      });
    });

    return await modal.present();
  }

  refreshData(id: any) {
    // Ajax call for Homepage data

    const params = {
      user_id: id,
    };
    this.common.postData("homepage", params).then(
      async (res: any) => {
        const response = JSON.parse(res.data);
        console.log("Home Page Response (Refresh Data):", response);

        if (response.status === true) {
          this.initializeValuesOnSuccess(response);
        }
      },
      (error) => {
        // this.common.ajaxErrorToast();
        this.errorAlert();
        console.log("Error:", error);
      }
    );
  }

  async openIntroGif() {
    this.modal = true;

    const modal = await this.common.modalController.create({
      component: IntroGifPage,
      // componentProps: {
      // },
      backdropDismiss: false,
      // cssClass: 'payment-modal'
    });

    modal.onDidDismiss().then(() => {
      this.modal = false;
      // this.refreshData(this.common.userInfo.id);
    });

    return await modal.present();
  }

  // async getNotifications() {
  //   const category = 'notification';
  //   const loginParams = {
  //     user_id: await this.common.userInfo.id
  //   };
  //   this.common.postData(category, loginParams).then( (res: any) => {
  //     console.log('Notification Response:', res);

  //     if (res.status === true) {

  //       this.notifications = res.notification;
  //       this.common.notificationCount = res.count;

  //     } else {

  //     }

  //     }, error => {

  //       console.log('Error:', error);

  //   });
  // }

  // openNotification() {
  //   // clearInterval(this.notificationInterval);
  //   this.common.notificationCount = 0;
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       data: this.notifications
  //     }
  //   };
  //   this.common.openPage('notification', '', navigationExtras);

  // }

  openTestimonials(t: any, p: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: t,
        page: p,
      },
    };
    this.common.openPage("testimonials-inner", 1, navigationExtras);
  }

  async getNotifications() {
    const category = "notification";
    const loginParams = {
      user_id: await this.common.userInfo.id,
    };
    this.common.postData(category, loginParams).then(
      (res: any) => {
        const response = JSON.parse(res.data);
        console.log("Notification Response:", response);

        if (response.status === true) {
          this.notifications = response.notification;
          this.common.notificationCount = response.count;
        } else {
        }
      },
      (error) => {
        console.log("Error:", error);
      }
    );
  }

  openNotification() {
    // clearInterval(this.notificationInterval);
    this.common.notificationCount = 0;
    const navigationExtras: NavigationExtras = {
      state: {
        data: this.notifications,
      },
    };
    this.common.openPage("notification", 1, navigationExtras);
  }
}
