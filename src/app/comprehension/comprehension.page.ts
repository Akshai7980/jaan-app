import { Component, OnInit } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-comprehension",
  templateUrl: "./comprehension.page.html",
  styleUrls: ["./comprehension.page.scss"],
})
export class ComprehensionPage implements OnInit {
  constructor(private common: CommonService) {}

  ngOnInit() {}

  openSection(l: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        level: l,
      },
    };
    this.common.openPage("comprehension-inner", 1, navigationExtras);
  }
}
