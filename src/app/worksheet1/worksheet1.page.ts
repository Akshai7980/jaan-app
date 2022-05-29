import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-worksheet1",
  templateUrl: "./worksheet1.page.html",
  styleUrls: ["./worksheet1.page.scss"],
})
export class Worksheet1Page implements OnInit {
  data: any;
  i = 0;
  marks = 0;
  selectedWord: string;
  combinedAnswer: string;
  rightAnswersArray = [];
  chance = 5;
  previousSelectedId = "";

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

    const category = "worksheet1";
    const params = {
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
    };

    this.common.postData(category, params).then(
      (res: any) => {
        console.log("Worksheet 1 Page Response:", res);

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

  wordSelected(index: number, word: string) {
    if (this.chance > 0) {
      const id = "options" + index;

      if (this.previousSelectedId !== "") {
        document
          .getElementById(this.previousSelectedId)
          .classList.remove("selected");
        document.getElementById(id).classList.add("selected");
      } else {
        this.previousSelectedId = id;
        document
          .getElementById(this.previousSelectedId)
          .classList.add("selected");
      }

      console.log("Before word select:", this.rightAnswersArray);
      let temp = 0;

      if (this.rightAnswersArray.length === 0) {
        this.selectedWord = word;
        this.combinedAnswer = word + this.data[this.i].word;
        this.previousSelectedId = id;
        document.getElementById(id).classList.add("selected");
      } else {
        for (const element of this.rightAnswersArray) {
          if (element === word) {
            document
              .getElementById(this.previousSelectedId)
              .classList.remove("selected");
            this.common.presentToast(
              "You have already selected this word, choose another one.!"
            );
            temp = 1;
            break;
          }
        }

        if (temp === 0) {
          this.selectedWord = word;
          this.combinedAnswer = word + this.data[this.i].word;
          this.previousSelectedId = id;
          document.getElementById(id).classList.add("selected");
        }
      }

      console.log("After word select:", this.rightAnswersArray);
    }
  }

  checkAnswer() {
    if (this.selectedWord) {
      this.chance--;

      let temp = 0;

      let i = 0;
      for (const element of this.data[this.i].question) {
        if (element === this.combinedAnswer) {
          temp = 1;
          break;
        }

        i++;
      }

      if (temp === 0) {
        document
          .getElementById(this.previousSelectedId)
          .classList.remove("selected");
        document
          .getElementById(this.previousSelectedId)
          .classList.add("background-red");
        document.getElementById(this.previousSelectedId).classList.add("blink");

        this.common.playGif("no-wrong-answer.mp3", "wrong");

        setTimeout(() => {
          document
            .getElementById(this.previousSelectedId)
            .classList.remove("background-red");
          document
            .getElementById(this.previousSelectedId)
            .classList.remove("blink");
        }, 2000);
      } else {
        const qid = "question" + i;

        this.marks++;
        this.rightAnswersArray.push(this.selectedWord);
        document
          .getElementById(this.previousSelectedId)
          .classList.remove("selected");
        document.getElementById(qid).classList.add("background-green");
        document.getElementById(qid).classList.add("blink");

        this.common.playGif("well-done.mp3", "right");
      }

      this.selectedWord = "";
      this.combinedAnswer = "";

      this.submit();
    } else {
      this.common.presentToast("Select a word before submitting.!");
    }
  }

  submit() {
    this.common.presentLoading();

    const params = {
      aspect: this.common.aspectId,
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
      score: this.marks,
      type: "worksheet1",
      typeid: this.data[this.i].sheetid,
    };

    this.common.postData("score", params).then(
      (res: any) => {
        console.log("Score Response:", res);

        if (res.status === true) {
          this.common.stopLoading();
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
    this.i += val;
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
      type: "worksheet1",
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
    this.marks = 0;
    let i = 0;
    this.data[this.i].question.forEach(() => {
      const qid = "question" + i;

      document.getElementById(qid).classList.remove("background-green");
      document.getElementById(qid).classList.remove("blink");

      i++;
    });
  }
}
