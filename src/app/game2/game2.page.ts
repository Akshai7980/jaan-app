import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-game2',
  templateUrl: './game2.page.html',
  styleUrls: ['./game2.page.scss'],
})
export class Game2Page implements OnInit {
  data: any;
  i = 0;
  isShowAnswers = false;
  tempArray = [];
  fromPage: string;
  marks = 0;

  constructor(public common: CommonService) {

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
    this.common.clearIdleGif();
  }

  getData() {

    this.common.presentLoading();

    const category = 'game2';
    const params = {
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id
    };

    this.common.postData(category, params).then((res: any) => {
      console.log('Game 2 Page Response:', res);

      if (res.status === true) {

        this.common.stopLoading();
        this.data = res.word;
        this.tempArray = JSON.parse(JSON.stringify(this.data));

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

  drop(event: CdkDragDrop<any>, index: any) {
    console.log(event);

    if (/\d/.test(index)) {
      moveItemInArray(this.data[this.i].shufflearray[index], event.previousIndex, event.currentIndex);
      console.log(this.data[this.i].shufflearray[index]);
    } else {
      moveItemInArray(this.data[this.i].shufflearray, event.item.data, event.container.data);
      console.log(this.data[this.i].shufflearray);

    }

  }

  showAnswers() {
    this.isShowAnswers = !this.isShowAnswers;
  }

  resetData() {

    this.marks = 0;

    if (this.data[this.i].type === 'Sentence') {

      let index = 0;
      for (let {} of this.data[this.i].shufflearray) {

        if (this.fromPage === 'home') {

          this.data[this.i].shufflearray[index] = JSON.parse(JSON.stringify(this.tempArray[this.i].shufflearray[index]));

        }

        const id = 'letters-div' + index;
        document.getElementById(id).style.color = '#914f24';
        document.getElementById(id).classList.remove('background-red');
        document.getElementById(id).classList.remove('background-green');
        document.getElementById(id).classList.remove('blink');

        index++;

      }

    } else {

      if (this.fromPage === 'home') {

        this.data[this.i].shufflearray =  JSON.parse(JSON.stringify(this.tempArray[this.i].shufflearray));

      }

      document.getElementById('letters-div').style.color = '#914f24';
      document.getElementById('letters-div').classList.remove('background-red');
      document.getElementById('letters-div').classList.remove('background-green');
      document.getElementById('letters-div').classList.remove('blink');

    }

    // if (this.fromPage === 'home') {

    //   // this.resetData();

    // } else {

    //   this.resetAlert();

    // }

  }

  // resetData() {

  //   if (this.data[this.i].type === 'Sentence') {

  //     let index = 0;
  //     for (let {} of this.data[this.i].shufflearray) {

  //       this.data[this.i].shufflearray[index] = JSON.parse(JSON.stringify(this.tempArray[this.i].shufflearray[index]));

  //       // const id = 'letters-div' + index;
  //       // document.getElementById(id).style.color = '#914f24';
  //       // document.getElementById(id).classList.remove('background-red');
  //       // document.getElementById(id).classList.remove('background-green');
  //       // document.getElementById(id).classList.remove('blink');

  //       index++;

  //     }

  //   } else {

  //     this.data[this.i].shufflearray =  JSON.parse(JSON.stringify(this.tempArray[this.i].shufflearray));

  //     // document.getElementById('letters-div').style.color = '#914f24';
  //     // document.getElementById('letters-div').classList.remove('background-red');
  //     // document.getElementById('letters-div').classList.remove('background-green');
  //     // document.getElementById('letters-div').classList.remove('blink');

  //   }

  // }

  submitAnswers() {
    if (this.data[this.i].type === 'Sentence') {

      let index = 0;
      for (const element of this.data[this.i].shufflearray) {

        const id = 'letters-div' + index;
        if (element.join() === this.data[this.i].correctarray[index].join()) {

          console.log('Correct');
          this.marks++;
          document.getElementById(id).style.color = 'white';
          document.getElementById(id).classList.add('background-green');
          document.getElementById(id).classList.add('blink');

        } else {

          console.log('Wrong');
          document.getElementById(id).style.color = 'white';
          document.getElementById(id).classList.add('background-red');
          document.getElementById(id).classList.add('blink');

        }

        index++;

      }

      if (this.fromPage === 'aspectLevels') {
        this.submitAnswersBackend();
      }

      if ((this.marks / this.data[this.i].correctarray.length) * 100 >= 80) {

        this.common.playGif('hurray-complete.mp3', 'hurray');

      } else if ((this.marks / this.data[this.i].correctarray.length) * 100 <= 30) {

        this.common.playGif('try-you-can-do-it.mp3', '');

      }


    } else {

      if (this.data[this.i].shufflearray.join() === this.data[this.i].correctarray.join()) {

        console.log('Correct');
        this.marks++;
        document.getElementById('letters-div').style.color = 'white';
        document.getElementById('letters-div').classList.add('background-green');
        document.getElementById('letters-div').classList.add('blink');

      } else {

        console.log('Wrong');
        document.getElementById('letters-div').style.color = 'white';
        document.getElementById('letters-div').classList.add('background-red');
        document.getElementById('letters-div').classList.add('blink');

      }

      if (this.fromPage === 'aspectLevels') {
        this.submitAnswersBackend();
      }

      if (this.marks === 1) {

        this.common.playGif('hurray-complete.mp3', 'hurray');

      } else if (this.marks === 0) {

        this.common.playGif('try-you-can-do-it.mp3', '');

      }

    }

  }

  nextPrevGame(val: number) {
    this.resetData();
    this.i += val;
  }

  submitAnswersBackend() {

    this.common.presentLoading();

    const params = {
      aspect: this.common.aspectId,
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
      score: this.marks,
      type: 'game2',
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

  setSlide() {
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
              this.resetScore();
            }
            this.resetData();
          }
        },
        {
          text: 'Cancel',
        }
      ]
    });

    await alert.present();

  }

  resetScore() {

    this.common.presentLoading();

    const params = {
      aspect: this.common.aspectId,
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id,
      type: 'game2'
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

//   doReorder(ev: any) {

//    console.log('Before complete', this.data[0].shufflearray);

//    this.data[0].shufflearray = ev.detail.complete(this.data[0].shufflearray);

//    console.log('After complete', this.data[0].shufflearray);

//  }

}
