import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-game1',
  templateUrl: './game1.page.html',
  styleUrls: ['./game1.page.scss'],
})
export class Game1Page implements OnInit, OnDestroy {

  data: any;
  i: number;
  mark: number;
  wrongs: number;
  fromPage: string;
  // index = 0;

  constructor(public common: CommonService) {

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {

        this.fromPage = this.common.router.getCurrentNavigation().extras.state.from;
        console.log(this.fromPage);
        this.getData();
        this.common.playIdleGif();

      }
    });

  }

  idleTimer() {
    this.common.userIdle.startWatching();

    this.common.userIdle.onTimerStart().subscribe(count => {
      console.log(count);
    });

    this.common.userIdle.onTimeout().subscribe(() => {
      console.log('Idle time !');
      this.common.gifPath = '../../assets/icon/walking.gif';
      setTimeout(() => {
        this.common.gifPath = '';
      }, 6000);
      this.common.userIdle.resetTimer();
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.common.clearIdleGif();
  }

  getData() {

    this.i = 0;
    this.wrongs = 0;
    this.mark = 0;

    this.common.presentLoading();

    const category = 'game1';
    const params = {
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id
    };

    this.common.postData(category, params).then((res: any) => {
      console.log('Game1 1 Page Response:', res);

      if (res.status === true) {

        this.common.stopLoading();
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

  async selectAnswer(option: string, answer: string) {

    this.common.userIdle.resetTimer(); // Reset idle timer

    if (this.i < this.data.length && this.data[0].block === 0) {

      if (option === answer) {

        console.log('Right Answer');
        this.mark++;

        if (this.mark === this.data.length || this.mark === this.data.length - 1) {
          // Full mark or one short of full mark
          this.common.playGif('hurray-complete.mp3', 'hurray');

        } else {

          this.common.playGif('well-done.mp3', 'right');

        }

      } else {

        console.log('Wrong Answer');
        this.wrongs++;
        this.common.playGif('no-wrong-answer.mp3', 'wrong');

      }

      if (this.fromPage === 'aspectLevels') {
        this.submit();
      }

      console.log(this.i, this.mark, this.wrongs);

      this.i++;

    }

  }

  submit() {

    this.common.presentLoading();

    const params = {
      aspect: this.common.aspectId,
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
      score: this.mark,
      type: 'game1',
      typeid: this.data[this.i].gameid
    };

    this.common.postData('score', params).then((res: any) => {
      console.log('Score Response:', res);

      if (res.status === true) {

        this.common.stopLoading();
        // this.data[0].block = 1;

      }

      }, error => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        console.log('Error:', error);
    });

  }

  async resetAlert() {

    this.common.userIdle.resetTimer(); // Reset idle timer

    let alertMessage: string;

    if (this.fromPage === 'aspectLevels') {

      alertMessage = 'Your entire score of this game will be lost.!!!';

    } else {

      alertMessage = 'Are you sure to reset?';

    }

    const alert = await this.common.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Warning!',
      message: alertMessage,
      backdropDismiss: true,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.reset();
            this.common.userIdle.resetTimer(); // Reset idle timer
          }
        },
        {
          text: 'Cancel',
        }
      ]
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
      type: 'game1'
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

  // nextPrev(val: number) {

  //   this.index += val;

  // }

}

