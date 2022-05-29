import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-grammar-inner',
  templateUrl: './grammar-inner.page.html',
  styleUrls: ['./grammar-inner.page.scss'],
})
export class GrammarInnerPage implements OnInit {

  data: any;
  i = 0;
  exerciseArray = [];
  // tempArray = []; // Store the value of shuffleArray for reset in excersise
  excercisAlert: string;
  worksheet: number;
  games: number;
  levelId: number;

  constructor(public common: CommonService) {

    this.i = 0;
    this.common.aspectId = 5;
    this.getData();

  }

  ngOnInit() {
  }

  getData() {

    this.common.presentLoading();

    const category = 'grammer';
    const params = {
      levelid: this.common.levelId
    };

    this.common.postData(category, params).then((res: any) => {
      console.log('Grammar Inner Page Response:', res);

      if (res.status === true) {

        this.common.stopLoading();
        this.data = res.grammer;
        this.worksheet = res.worksheet;
        this.games = res.games;
        // this.tempArray =  Object.assign([], this.data.exercise[this.i].shufflearray);

      } else {

        this.common.stopLoading();
        this.common.presentToast(res.message);

      }

      }, error => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        this.common.navController.pop();
        console.log('Error:', error);
    });

  }

  nextExercise() {
    this.i++;
    this.exerciseArray = [];
    // this.tempArray =  Object.assign([], this.data.exercise[this.i].shufflearray);
  }

  selectWord(index: number, word: string) {
    this.excercisAlert = '';
    this.exerciseArray.push(word);
    // this.data.exercise[this.i].shufflearray.splice(index, 1);
  }

  resetExcercise() {
    this.exerciseArray = [];
    // this.data.exercise[this.i].shufflearray =  Object.assign([], this.tempArray);
  }

  checkExcercise() {

    if (this.exerciseArray.join() === this.data.exercise[this.i].correctarray.join()) {

      this.exerciseArray = [];
      this.excercisAlert = 'Right answer !!';

    } else{

      this.exerciseArray = [];
      this.excercisAlert = 'Wrong answer !!';

    }

  }

  async logScrolling($event) {

    const currentScrollDepth = $event.detail.scrollTop;
    // console.log({currentScrollDepth});

    if (currentScrollDepth > 50) {
      document.getElementById('video').style.height = '112px';
      document.getElementById('video').style.width = '200px';
      document.getElementById('video').style.borderBottomRightRadius = '0px';
      document.getElementById('video').style.background = 'black';
      document.getElementById('myHeader').classList.add('header-sticky');
    } else {
      document.getElementById('video').style.height = '180px';
      document.getElementById('video').style.width = '100%';
      document.getElementById('video').style.borderBottomRightRadius = '20px';
      document.getElementById('video').style.background = '#ffffff';
      document.getElementById('myHeader').classList.remove('header-sticky');

    }

  }

}
