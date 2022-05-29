import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
// import { MediaObject } from '@ionic-native/media/ngx';

@Component({
  selector: "app-speaking-inner",
  templateUrl: "./speaking-inner.page.html",
  styleUrls: ["./speaking-inner.page.scss"],
})
export class SpeakingInnerPage implements OnInit {
  data = {
    sectionName: "",
    header: "",
    content: [],
    worksheet: 0,
    games: 0,
  };
  levelId: number;
  bbSubscription: any;
  // starSelected: {[Key: number]: boolean} = {};
  // audioFile: MediaObject;

  constructor(public common: CommonService) {
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        const sName =
          this.common.router.getCurrentNavigation().extras.state.sectionName;
        console.log(sName);

        if (sName === "Single Sentence / Phrase") {
          this.levelId = 20;
          this.common.levelId = 20;
          this.common.aspectId = 2;
          this.data.sectionName = sName;
          this.data.header = "../../assets/icon/speaking-header2.png";
        } else if (sName === "Conversational Words") {
          this.levelId = 19;
          this.common.levelId = 19;
          this.common.aspectId = 2;
          this.data.sectionName = sName;
          this.data.header = "../../assets/icon/speaking-header1.png";
        }

        this.getData();
      }
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.bbSubscription = this.common.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        if (this.common.favourites) {
          this.common.favourites = false;
        } else {
          this.common.navController.pop();
        }
      }
    );
  }

  ionViewWillLeave() {
    this.common.favourites = false;
    this.bbSubscription.unsubscribe();
  }

  getData() {
    this.common.presentLoading();

    const category = "speaking";
    const paramsApi = {
      levelid: this.levelId,
      user_id: this.common.userInfo.id,
    };

    this.common.postData(category, paramsApi).then(
      (res: any) => {
        console.log("Speaking Inner Page Response:", res);

        if (res.status === true) {
          this.common.stopLoading();
          this.data.content = res.speaking;
          this.data.worksheet = res.worksheet;
          this.data.games = res.games;
        } else {
          this.common.presentToast(res.message);
        }
      },
      (error) => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        this.common.navController.pop();
        console.log("Error:", error);
      }
    );
  }

  addRemoveFav(i: number, cid: number) {
    this.common.presentLoading();

    const category = "update_lib";
    const params = {
      aspect_level_id: this.levelId,
      sub_level_id: "",
      content_id: cid,
      user_id: this.common.userInfo.id,
    };

    this.common.postData(category, params).then(
      (res: any) => {
        console.log("Speaking Save Unsave Response:", res);

        if (res.status === true) {
          // this.starSelected[i] = !this.starSelected[i];
          this.common.stopLoading();
          this.getData();
        } else {
          this.common.stopLoading();
          this.common.presentToast(res.message);
        }
      },
      (error) => {
        this.common.stopLoading();
        console.log("Error:", error);
      }
    );
  }

  // playAudio(url: string) {
  //   this.audioFile = this.common.media.create(url);
  //   this.audioFile.play();
  // }

  // getRandomColor() {
  //   const color = ['#e0e2f7', '#eadcdb', '#e9ecff', '#e4efde'];
  //   const randomColor = color[Math.floor(Math.random() * color.length)];

  //   console.log('random color =>', randomColor);

  //   return 'color:' + randomColor;
  // }
}
