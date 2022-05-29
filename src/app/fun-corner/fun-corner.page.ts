import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-fun-corner",
  templateUrl: "./fun-corner.page.html",
  styleUrls: ["./fun-corner.page.scss"],
})
export class FunCornerPage implements OnInit {
  constructor(private common: CommonService) {}

  ngOnInit() {}

  openFun() {
    this.common.openPage("fun-corner-inner", 1, "");
  }
}
