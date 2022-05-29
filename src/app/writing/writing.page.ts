import { Component, OnInit } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-writing",
  templateUrl: "./writing.page.html",
  styleUrls: ["./writing.page.scss"],
})
export class WritingPage implements OnInit {
  data: any;
  colorsArray = [
    {
      color: "#f58120",
      lightColor: "#faa815",
      image1: "../../assets/icon/writing-orange.png",
      image2: "../../assets/icon/writing-orange-loc.png",
      bullet: "../../assets/icon/writing-orange-bullet.png",
      arrow: "../../assets/icon/writing-orange-arrow.png",
    },
    {
      color: "#0faf27",
      lightColor: "#0dd52c",
      image1: "../../assets/icon/writing-green.png",
      image2: "../../assets/icon/writing-green-loc.png",
      bullet: "../../assets/icon/writing-green-bullet.png",
      arrow: "../../assets/icon/writing-green-arrow.png",
    },
    {
      color: "#01bce5",
      lightColor: "#61d2eb",
      image1: "../../assets/icon/writing-blue.png",
      image2: "../../assets/icon/writing-blue-loc.png",
      bullet: "../../assets/icon/writing-blue-bullet.png",
      arrow: "../../assets/icon/writing-blue-arrow.png",
    },
  ];
  worksheet: number;

  constructor(public common: CommonService) {}

  ngOnInit() {
    this.common.presentLoading();

    const category = "writting";

    this.common.getData(category, "").subscribe(
      (res: any) => {
        console.log("Writing Home Page Response:", res);

        if (res.status === true) {
          this.common.stopLoading();
          this.data = res.writting;
          this.worksheet = res.worksheet;
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

  openSection(subLevel: any, i: number, c: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        sLevel: subLevel,
        index: i,
        color: c,
        worksheet: this.worksheet,
      },
    };
    this.common.router.navigate(["tabs/tab1/writing-inner"], navigationExtras);
  }
}
