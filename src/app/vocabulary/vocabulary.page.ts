import { Component, OnInit } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-vocabulary",
  templateUrl: "./vocabulary.page.html",
  styleUrls: ["./vocabulary.page.scss"],
})
export class VocabularyPage implements OnInit {
  showDetails: { [Key: number]: boolean } = {};
  data: any;
  searchData: any;
  lettersArray = [];
  color: any;
  searchTerm = "";

  constructor(public common: CommonService) {}

  ngOnInit() {
    this.color = {
      lightColor: [
        ["#f6d2d2"],
        ["#e1d6e7"],
        ["#fad3e8"],
        ["#d0edd9"],
        ["#d6dee9"],
        ["#cdeffb"],
        ["#d7d8da"],
        ["#e7e2f8"],
        ["#d3e4cf"],
        ["#f0e8d5"],
        ["#d3e8ea"],
      ],
      darkColor: [],
      arrow: [],
    };

    for (let i = 0; i < 11; i++) {
      const color = "../../assets/icon/vocabulary-" + (i + 1) + ".png";
      const arrow = "../../assets/icon/aspects-arr-" + (i + 1) + ".png";
      this.color.darkColor.push(color);
      if (i < 10) {
        this.color.arrow.push(arrow);
      }
    }

    this.color.arrow[10] = "../../assets/icon/aspects-arr-4.png";

    this.getData();
  }

  async getData() {
    await this.common.presentLoading();
    const category = "aspect_levels";
    const params = {
      type: 7,
    };

    this.common.postData(category, params).then(
      (res: any) => {
        console.log("Vocabulary Home Page Response:", res);

        if (res.status === true) {
          this.common.stopLoading();
          this.searchData = res.user_details;
          this.filterItems();

          for (const e of this.searchData) {
            this.lettersArray.push(e.level_name.charAt(0));
          }
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

  openSection(id: number, sName: string, i: number) {
    this.showDetails = {} = {};

    const navigationExtras: NavigationExtras = {
      state: {
        sectionId: id,
        sectionName: sName,
      },
    };
    this.common.router.navigate(
      ["tabs/tab1/vocabulary-inner"],
      navigationExtras
    );
  }

  flip(i: number) {
    this.showDetails = {} = {};
    this.showDetails[i] = !this.showDetails[i];
  }

  filterItems() {
    console.log(this.searchTerm, this.searchData);

    this.data = this.searchData.filter((item) => {
      return item.level_name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
    });
  }
}
