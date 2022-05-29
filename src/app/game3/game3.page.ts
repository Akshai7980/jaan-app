import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-game3',
  templateUrl: './game3.page.html',
  styleUrls: ['./game3.page.scss'],
})
export class Game3Page implements OnInit {
  data: any;
  // box = [];
  q = [];
  i = 0;
  // optionSelected: {[Key: number]: boolean} = {};
  previousSelectedImage = '';
  previousSelectedImageId = '';
  timer = {
    hr: 0,
    min: 0,
    sec: 0
  };
  fromPage: string;
  marks = 0;
  startGame = false;
  firstTime = false;
  timerInterval: any;

  constructor(public common: CommonService) {

    // for (let i = 0; i < 16; i++) {
    //   this.box.push(i);
    // }

    for (let i = 0; i < 5; i++) {
      this.q.push('');
    }

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {

        this.fromPage = this.common.router.getCurrentNavigation().extras.state.from;
        this.getData();
        this.common.playIdleGif();

      }
    });

  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    clearInterval(this.timerInterval);
    this.common.clearIdleGif();
  }

  getData() {

    // this.common.presentLoading();

    const category = 'game3';
    const params = {
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id
    };

    this.common.postData(category, params).then((res: any) => {
      console.log('Game 3 Page Response:', res);

      if (res.status === true) {

        // this.common.stopLoading();
        this.data = res.word;

      } else {

        this.common.presentToast(res.message);
        this.common.stopLoading();

      }

      }, error => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        this.common.navController.pop();
        console.log('Error:', error);
    });

  }

  startTimer() {

    if (!this.firstTime && !this.startGame) {

      this.startGame = true;
      // this.firstTime = true;

      this.timerInterval = setInterval(() => {

        this.timer.sec++;

        if (this.timer.sec === 60) {
          this.timer.min++;
          this.timer.sec = 0;
        }

        if (this.timer.sec === 30) {

          clearInterval(this.timerInterval);
          this.firstTime = true;
          this.alertMesg('Game Over!', 'Your time ends here.!!!');

        }

      }, 1000);

    }

  }

  async alertMesg(headerMesg: string, mesg: string) {
    const alert = await this.common.alertController.create({
      // cssClass: 'my-custom-class',
      header: headerMesg,
      message: mesg,
      backdropDismiss: false,
      buttons: [
       {
          text: 'Ok',
          handler: () => {
            this.submitAnswers();
          }
        }
      ]
    });

    await alert.present();
  }

  // showImage(i: number) {
  //   // this.startTimer();
  //   this.optionSelected[i] = true;
  //   this.common.presentToast('Click on the image to activate.');
  // }

  selectImage(i: number, image: string) {

    if (this.startGame && !this.firstTime) {

      if (this.data[this.i].block === 0) {

        if (this.previousSelectedImage) {

          document.getElementById(this.previousSelectedImageId).style.border = '';

        }

        document.getElementById('image' + i).style.border = '4px solid orangered';
        this.previousSelectedImage = image;
        this.previousSelectedImageId = 'image' + i;

      }

    } else if (!this.startGame) {
      this.common.presentToast('Click on the START button to start the game.');
    }

  }

  displayImage(i: number) {

    if (this.previousSelectedImage) {

      document.getElementById(this.previousSelectedImageId).style.border = '';
      this.q[i] =  this.previousSelectedImage;
      this.previousSelectedImage = '';
      this.previousSelectedImageId = '';

    }

  }

  stopGame() {

    if (!this.firstTime) {

      this.startGame = false;
      this.firstTime = true;

      if (this.timerInterval) {

        clearInterval(this.timerInterval);
        const timeDiff = 30 - this.timer.sec;
        const msg = 'You have saved ' + timeDiff + ' seconds .!!';
        this.alertMesg('Good Job !', msg);

      }

    }

  }

  submitAnswers() {

    let index = 0;
    for (const element of this.data[0].wordarray) {

      const id = 'box' + index;
      if (element.image === this.q[index]) {

        console.log('Correct');
        this.marks++;
        document.getElementById(id).style.border = '4px solid lightgreen';
        document.getElementById(id).classList.add('background-green');
        document.getElementById(id).classList.add('blink');

      } else {

        console.log('Wrong');
        document.getElementById(id).style.border = '4px solid red';
        document.getElementById(id).classList.add('background-red');
        document.getElementById(id).classList.add('blink');

      }

      index++;

    }

    if (this.fromPage === 'aspectLevels') {

      this.submitAnswersBackend();

    } else {

      this.data[this.i].block = 1;

    }

    console.log((this.marks / 5) * 100 + '%');

    if ((this.marks / 5) * 100 >= 80) {

      this.common.playGif('hurray-complete.mp3', 'hurray');

    } else if ((this.marks / 5) * 100 <= 30) {

      this.common.playGif('try-you-can-do-it.mp3', '');

    }

  }

  submitAnswersBackend() {

    this.common.presentLoading();

    const params = {
      aspect: this.common.aspectId,
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
      score: this.marks,
      type: 'game3',
      typeid: this.data[this.i].gameid
    };

    this.common.postData('score', params).then((res: any) => {
      console.log('Score Response:', res);

      if (res.status === true) {

        this.common.stopLoading();
        this.data[this.i].block = 1;

      }

      }, error => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        console.log('Error:', error);
    });

  }

  nextPrev(val: number) {

    this.i += val;

  }

  async resetAlert() {

    const alert = await this.common.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Warning!',
      message: this.fromPage === 'aspectLevels' ? 'Your entire score of this game will be lost.!!!' : 'Are you sure to reset?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if (this.fromPage === 'aspectLevels') {

              this.reset();

            } else {

              this.getData();

            }

            this.resetValues();

          }
        },
        {
          text: 'Cancel',
        }
      ]
    });

    await alert.present();

  }

  resetValues() {

    this.marks = 0;
    this.firstTime = false;
    this.startGame = false;
    this.timer.sec = 0;

    let index = 0;
    for (const element of this.data[0].wordarray) {

      this.q[index] = '';

      const id = 'box' + index;

      document.getElementById(id).style.border = '0';
      document.getElementById(id).classList.remove('background-green');
      document.getElementById(id).classList.remove('background-red');
      document.getElementById(id).classList.remove('blink');

      index++;

    }

  }

  reset() {

    this.common.presentLoading();

    const params = {
      aspect: this.common.aspectId,
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
      type: 'game3'
    };

    this.common.postData('reset_score', params).then((res: any) => {
      console.log('Reset Response:', res);

      if (res.status === true) {

        this.common.stopLoading();
        this.getData();

      }

      }, error => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        console.log('Error:', error);
    });

  }

}
