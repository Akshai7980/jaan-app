import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-worksheet4",
  templateUrl: "./worksheet4.page.html",
  styleUrls: ["./worksheet4.page.scss"],
})
export class Worksheet4Page implements OnInit {
  data: any;
  selectedAnswersArray = [
    {
      id: "",
      val: "",
    },
  ];
  marks = 0;
  //  index = 0;

  constructor(public common: CommonService) {
    this.getData();
    this.common.playIdleGif();
  }

  ngOnInit() {}

  ionViewWillLeave() {
    this.common.clearIdleGif();
  }

  getData() {
    this.common.presentLoading();

    const params = {
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
    };

    this.common.postData("worksheet3", params).then(
      (res: any) => {
        console.log("Worksheet 4 Page Response:", res);

        if (res.status === true) {
          this.common.stopLoading();
          this.data = res.word;
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

  wordSelected(i: number, j: number, optionSelected: string) {
    if (this.data[0].block === 0) {
      console.log(i, j, optionSelected);

      const id = "options" + i + j;

      if (this.selectedAnswersArray[i]?.val) {
        document
          .getElementById(this.selectedAnswersArray[i].id)
          .classList.remove("selected");
      }

      document.getElementById(id).classList.add("selected");

      this.selectedAnswersArray[i] = {
        id: "options" + i + j,
        val: optionSelected,
      };

      console.log(this.selectedAnswersArray);
    }
  }

  checkAnswers() {
    let i = 0;
    for (const element of this.selectedAnswersArray) {
      if (element.val) {
        if (element.val === this.data[i].correctans) {
          console.log("Right");
          this.marks++;
          document
            .getElementById(this.selectedAnswersArray[i].id)
            .classList.remove("selected");
          document
            .getElementById(this.selectedAnswersArray[i].id)
            .classList.add("background-green");
          document
            .getElementById(this.selectedAnswersArray[i].id)
            .classList.add("blink");
        } else {
          console.log("Wrong");
          document
            .getElementById(this.selectedAnswersArray[i].id)
            .classList.remove("selected");
          document
            .getElementById(this.selectedAnswersArray[i].id)
            .classList.add("background-red");
          document
            .getElementById(this.selectedAnswersArray[i].id)
            .classList.add("blink");
        }
      }

      i++;
    }

    this.submitAnswers();
  }

  submitAnswers() {
    this.common.presentLoading();

    const params = {
      aspect: this.common.aspectId,
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
      score: this.marks,
      type: "worksheet3",
      typeid: "",
    };

    this.common.postData("score", params).then(
      (res: any) => {
        console.log("Score Response:", res);

        if (res.status === true) {
          this.common.stopLoading();

          this.data[0].block = 1;

          if ((this.marks / this.data.length) * 100 >= 80) {
            this.common.playGif("hurray-complete.mp3", "hurray");
          } else if ((this.marks / this.data.length) * 100 <= 30) {
            this.common.playGif("try-you-can-do-it.mp3", "");
          }
        }
      },
      (error) => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        console.log("Error:", error);
      }
    );
  }

  async resetAlert() {
    const alert = await this.common.alertController.create({
      // cssClass: 'my-custom-class',
      header: "Warning!",
      message: "Your entire score of this worksheet will be lost.!!!",
      backdropDismiss: true,
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.reset();
          },
        },
        {
          text: "Cancel",
        },
      ],
    });

    await alert.present();
  }

  reset() {
    this.common.presentLoading();

    const params = {
      aspect: this.common.aspectId,
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
      type: "worksheet3",
    };

    this.common.postData("reset_score", params).then(
      (res: any) => {
        console.log("Reset Response:", res);

        if (res.status === true) {
          this.common.stopLoading();
          this.getData();
          this.marks = 0;
        }
      },
      (error) => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        console.log("Error:", error);
      }
    );
  }

  // nextPrev(val: number) {

  //   this.index += val;

  // }
}
