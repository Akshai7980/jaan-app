import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-worksheet3",
  templateUrl: "./worksheet3.page.html",
  styleUrls: ["./worksheet3.page.scss"],
})
export class Worksheet3Page implements OnInit {
  data: any;
  answersArray: string[] = [];
  index = 0;
  marks = 0;

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

    this.common.postData("worksheet4", params).then(
      (res: any) => {
        console.log("Worksheet 3 Page Response:", res);

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

  wordSelected(word: string) {
    if (this.data[this.index].block === 0) {
      let temp = 0;

      if (this.answersArray.length === 0) {
        this.answersArray.push(word);
      } else {
        for (const element of this.answersArray) {
          if (element === word) {
            this.common.presentToast(
              "You have already chosen this word, choose another one.!"
            );
            temp = 1;
            break;
          }
        }

        if (temp === 0) {
          this.answersArray.push(word);
        }
      }
    }
  }

  CheckAnswers() {
    if (this.answersArray.join() === this.data[this.index].answer.join()) {
      console.log("Right");
      this.marks++;
      document.getElementById("answer-box").classList.add("background-green");
      document.getElementById("answer-box").classList.add("blink");
    } else {
      console.log("Wrong");
      document.getElementById("answer-box").classList.add("background-red");
      document.getElementById("answer-box").classList.add("blink");
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
      type: "worksheet4",
      typeid: this.data[this.index].sheetid,
    };

    this.common.postData("score", params).then(
      (res: any) => {
        console.log("Score Response:", res);

        if (res.status === true) {
          this.common.stopLoading();
          this.data[this.index].block = 1;

          if (this.marks === 0) {
            this.common.playGif("try-you-can-do-it.mp3", "");
          } else if (this.marks === 1) {
            this.common.playGif("hurray-complete.mp3", "hurray");
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

  removeAnswer(pos: number) {
    this.answersArray.splice(pos, 1);
  }

  nextPrev(val: number) {
    this.resetValues();
    this.index += val;
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
      type: "worksheet4",
    };

    this.common.postData("reset_score", params).then(
      (res: any) => {
        console.log("Reset Response:", res);

        if (res.status === true) {
          this.common.stopLoading();
          this.getData();
          this.resetValues();
        }
      },
      (error) => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        console.log("Error:", error);
      }
    );
  }

  resetValues() {
    this.answersArray = [];
    this.marks = 0;
    document.getElementById("answer-box").classList.remove("background-green");
    document.getElementById("answer-box").classList.remove("blink");
    document.getElementById("answer-box").classList.remove("background-red");
  }
}
