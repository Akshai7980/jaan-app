import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
import { NavigationExtras } from "@angular/router";

@Component({
  selector: "app-conversation-inner2",
  templateUrl: "./conversation-inner2.page.html",
  styleUrls: ["./conversation-inner2.page.scss"],
})
export class ConversationInner2Page implements OnInit {
  data = {
    aspectId: 0,
    header: "",
    buttonText: "",
    content: [],
  };
  bbSubscription: any;

  constructor(public common: CommonService) {
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        const data =
          this.common.router.getCurrentNavigation().extras.state.data;
        const image =
          this.common.router.getCurrentNavigation().extras.state.image;
        console.log(data);

        this.data.header = image;
        this.data.buttonText = data.sub_level;
        this.data.aspectId = data.aspect_id;

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

  async getData() {
    await this.common.presentLoading();

    const category = "conversationwords";
    const paramsApi = {
      sublevel_id: this.data.aspectId,
      user_id: this.common.userInfo.id,
    };
    this.common.postData(category, paramsApi).then(
      (res: any) => {
        console.log("Conversation Inner Page 2 Response:", res);

        if (res.status === true) {
          this.data.content = res.conversatiosentence;
          console.log(this.data);
        } else {
          this.common.presentToast(res.message);
        }

        this.common.stopLoading();
      },
      (error) => {
        this.common.stopLoading();
        console.log("Error:", error);
      }
    );
  }

  openTemp() {
    const navigationExtras: NavigationExtras = {
      state: {
        data: this.data,
      },
    };
    this.common.openPage("conversation-inner3", 1, navigationExtras);
  }

  addRemoveFav(i: number, cid: number) {
    this.common.presentLoading();

    const category = "update_lib";
    const params = {
      aspect_level_id: this.common.levelId,
      sub_level_id: this.data.aspectId,
      content_id: cid,
      user_id: this.common.userInfo.id,
    };

    this.common.postData(category, params).then(
      (res: any) => {
        console.log("Listening Save Unsave Response:", res);

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
}
