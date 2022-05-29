import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-comprehension-inner",
  templateUrl: "./comprehension-inner.page.html",
  styleUrls: ["./comprehension-inner.page.scss"],
})
export class ComprehensionInnerPage implements OnInit {
  data: any;
  i = 0;
  // games = 0;
  // worksheet = 0;

  constructor(public common: CommonService) {
    this.common.presentLoading();
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        const level =
          this.common.router.getCurrentNavigation().extras.state.level;
        console.log(level);

        const paramsApi = {
          levelid: 0,
        };

        if (level === "Easy Level") {
          paramsApi.levelid = 1;
          this.data = {
            sectionName: level,
            header: "../../assets/icon/com-easy-level.png",
          };
        } else if (level === "Medium Level") {
          paramsApi.levelid = 2;

          this.data = {
            sectionName: level,
            header: "../../assets/icon/com-medium-level.png",
          };
        } else if (level === "Difficult Level") {
          paramsApi.levelid = 3;

          this.data = {
            sectionName: level,
            header: "../../assets/icon/com-difficult-level.png",
          };
        }

        this.data.content = [];

        const category = "comprehension";

        this.common.postData(category, paramsApi).then(
          (res: any) => {
            console.log("Comprehension Inner Page Response:", res);

            if (res.status === true) {
              this.common.stopLoading();

              this.data.content = res.Comprehension;
              // this.worksheet = res.worksheet;
              // this.games = res.games;
              console.log(this.data);
            } else {
              this.common.stopLoading();
              this.common.presentToast(res.message);
            }
          },
          (error) => {
            this.common.stopLoading();
            this.common.navController.pop();
            console.log("Error:", error);
          }
        );
      }
    });
  }

  ngOnInit() {}

  ionViewWillLeave() {
    this.common.stopAudio();
  }

  onNextPreviousClick(val: number) {
    if (this.common.audioFile) {
      this.common.stopAudio();
    }

    if (val === 1) {
      this.i++;
    } else {
      this.i--;
    }
  }

  goToGames() {
    this.common.openPage("games", 1, "");
  }
}
