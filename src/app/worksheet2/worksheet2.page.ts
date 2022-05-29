import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
// import { Quote } from '@angular/compiler';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-worksheet2",
  templateUrl: "./worksheet2.page.html",
  styleUrls: ["./worksheet2.page.scss"],
})
export class Worksheet2Page implements OnInit {
  data: any;
  index = 0;
  selectedQuestionsArray = [];
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

    const category = "worksheet2";
    const params = {
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
    };

    this.common.postData(category, params).then(
      (res: any) => {
        console.log("Worksheet 2 Page Response:", res);

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

  wordSelected(
    i: number,
    id: string,
    isQ: boolean,
    q: string,
    option: string,
    match: string
  ) {
    if (this.data[this.index].block === 0) {
      console.log(i, id, isQ, q, option, match);

      if (isQ) {
        if (this.selectedQuestionsArray.length > 0) {
          document
            .getElementById(this.selectedQuestionsArray[0].id)
            .classList.remove("selected");
          document
            .getElementById("option" + this.selectedQuestionsArray[0].i)
            .classList.remove("selected");
          this.selectedQuestionsArray.pop();
        }

        document.getElementById(id).classList.add("selected");
        this.selectedQuestionsArray.push({ i, id });
      } else {
        if (this.selectedQuestionsArray.length === 0) {
          console.log("Choose a question to answer !");
        } else {
          document
            .getElementById("option" + this.selectedQuestionsArray[0].i)
            .classList.remove("selected");

          setTimeout(() => {
            moveItemInArray(
              this.data[this.index].list.option,
              i,
              this.selectedQuestionsArray[0].i
            );
            document.getElementById(id).classList.add("selected");
            // this.selectedQuestionsArray[0].optionId = this.selectedQuestionsArray[0].i;
            console.log(this.selectedQuestionsArray);
          }, 500);
        }
      }
    }
  }

  checkAnswers() {
    let i = 0;
    for (const element of this.data[this.index].list.option) {
      const questionId = "option0" + i;
      const optionId = "option" + i;

      if (element === this.data[this.index].list.match[i]) {
        console.log("Right");
        document.getElementById(questionId).classList.add("background-green");
        document.getElementById(questionId).classList.add("blink");
        document.getElementById(optionId).classList.add("background-green");
        document.getElementById(optionId).classList.add("blink");

        this.marks++;
      } else {
        console.log("Wrong");
        document.getElementById(questionId).classList.add("background-red");
        document.getElementById(questionId).classList.add("blink");
        document.getElementById(optionId).classList.add("background-red");
        document.getElementById(optionId).classList.add("blink");
      }

      i++;
    }

    this.submitAnswers();
  }

  submitAnswers() {
    if (this.selectedQuestionsArray.length > 0) {
      document
        .getElementById(this.selectedQuestionsArray[0].id)
        .classList.remove("selected");
      document
        .getElementById("option" + this.selectedQuestionsArray[0].i)
        .classList.remove("selected");
    }

    this.common.presentLoading();

    const params = {
      aspect: this.common.aspectId,
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
      score: this.marks,
      type: "worksheet2",
      typeid: this.data[this.index].sheetid,
    };

    this.common.postData("score", params).then(
      (res: any) => {
        console.log("Score Response:", res);

        if (res.status === true) {
          this.common.stopLoading();
          this.data[this.index].block = 1;

          if (
            (this.marks / this.data[this.index].list.question.length) * 100 >=
            80
          ) {
            this.common.playGif("hurray-complete.mp3", "hurray");
          } else if (
            (this.marks / this.data[this.index].list.question.length) * 100 <=
            30
          ) {
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
      type: "worksheet2",
    };

    this.common.postData("reset_score", params).then(
      (res: any) => {
        console.log("Reset Response:", res);

        if (res.status === true) {
          this.common.stopLoading();
          this.resetValues();

          this.getData();
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
    this.marks = 0;
    let i = 0;
    this.data[this.index].list.option.forEach(() => {
      const questionId = "option0" + i;
      const optionId = "option" + i;

      document.getElementById(questionId).classList.remove("background-red");
      document.getElementById(questionId).classList.remove("background-green");
      document.getElementById(questionId).classList.remove("blink");
      document.getElementById(optionId).classList.remove("background-red");
      document.getElementById(optionId).classList.remove("background-green");
      document.getElementById(optionId).classList.remove("blink");
      document.getElementById(questionId).classList.remove("selected");
      document.getElementById(optionId).classList.remove("selected");

      i++;
    });
  }
}
