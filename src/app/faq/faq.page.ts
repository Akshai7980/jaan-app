import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
import { NavigationExtras } from "@angular/router";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.page.html",
  styleUrls: ["./faq.page.scss"],
})
export class FaqPage implements OnInit {
  data: any;
  showAnswers: { [key: number]: boolean } = {};

  constructor(public common: CommonService) {}

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {
    this.showAnswers = {}; // Initialize
  }

  getData() {
    // Get Ajax Data

    this.common.presentLoading();

    this.common.getData("help", "").subscribe(
      (res: any) => {
        console.log("Help Page Response:", res);

        if (res.status === true) {
          this.common.stopLoading();

          this.data = res.data;
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

  expandShrinkDiv(i: number, val: boolean) {
    // If val=true -> expand; Else shrink

    this.showAnswers = {};
    if (val) {
      this.showAnswers[i] = true;
    }
  }

  openContactPage() {
    // Open Contact Page

    const navigationExtras: NavigationExtras = {
      state: {
        page: "Contact Us",
      },
    };

    this.common.openPage("contact-book", 1, navigationExtras);
  }
}
