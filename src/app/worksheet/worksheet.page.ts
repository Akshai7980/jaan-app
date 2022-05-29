import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-worksheet",
  templateUrl: "./worksheet.page.html",
  styleUrls: ["./worksheet.page.scss"],
})
export class WorksheetPage implements OnInit {
  worksheet: any;

  constructor(public common: CommonService) {
    this.common.presentLoading();

    const category = "listworksheet";
    const paramsApi = {
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
    };
    this.common.postData(category, paramsApi).then(
      (res: any) => {
        console.log("Worksheet Home Page Response:", res);

        if (res.status === true) {
          this.common.stopLoading();
          this.common.presentAlert(
            "All Games and Worksheets are in Malayalam. Kindly go through the Reading Section first."
          );
          this.worksheet = res;
        } else {
          this.common.presentToast(res.message);
          this.common.stopLoading();
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

  ngOnInit() {}

  presentToast() {
    this.common.presentToast("You don't have worksheet for this section.!");
  }
}
