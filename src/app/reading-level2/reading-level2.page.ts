import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-reading-level2',
  templateUrl: './reading-level2.page.html',
  styleUrls: ['./reading-level2.page.scss'],
})
export class ReadingLevel2Page implements OnInit {

  data: any;
  // worksheet: number;
  index = 0;

  constructor(public common: CommonService) {

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.data = this.common.router.getCurrentNavigation().extras.state.data;
        // this.worksheet = this.common.router.getCurrentNavigation().extras.state.worksheet;
        this.data.header = this.data[this.index].sublevel;

        this.common.levelId = 2;
        this.common.sublevelId = this.data[this.index].sublevelid;
        this.common.aspectId = 3;

        // for (const element of this.data) {

        //   this.data.header += ' / ' + element.sublevel;

        // }
        // this.data.header = this.data.header.substring(3);
      }
    });

   }

  ngOnInit() {

    this.data.color = [];

    for (let i = 0; i < 5; i++) {

      // const color = this.getRandomColor();

      // const c = '../../assets/icon/level2-' + color + '.png';
      // const l = '../../assets/icon/level2c-' + color + '.png';

      const c = '../../assets/icon/level2-' + (i + 1) + '.png';
      const l = '../../assets/icon/level2c-' + (i + 1) + '.png';

      this.data.color.push({color: c, lightColor: l});
    }

    console.log(this.data);

  }

  // ionViewWillEnter(){
  //   this.index++;
  //   this.data.header = this.data[this.index].sublevel;
  // }

  // doInfinite(e) {
  //   console.log('e',e);
  //   this.index++;
  //   this.data.header = this.data[this.index].sublevel;
  // }

  // logScrolling(e) {
  // // console.log('e',e);
  // // this.index++;
  // // this.data.header = this.data[this.index].sublevel;
  // }

  onNextCick() {
    this.index++;
    this.data.header = this.data[this.index].sublevel;
  }

  onPreviousClick() {
    this.index--;
    this.data.header = this.data[this.index].sublevel;
  }

  getRandomColor() {
    // const color = ['#00adf0', '#00a651', '#ed1b24', '#f18225', '#2d318e'];
    const color = ['1', '2', '3', '4', '5'];
    const randomColor = color[Math.floor(Math.random() * color.length)];

    // let lightColor: any;
    // if (randomColor === '#00adf0') {
    //   lightColor = '../../assets/icon/level2c-1.png';
    // } else if (randomColor === '#00a651') {
    //   lightColor = '../../assets/icon/level2c-2.png';
    // } else if (randomColor === '#ed1b24') {
    //   lightColor = '../../assets/icon/level2c-3.png';
    // } else if (randomColor === '#f18225') {
    //   lightColor = '../../assets/icon/level2c-4.png';
    // } else if (randomColor === '#2d318e') {
    //   lightColor = '../../assets/icon/level2c-5.png';
    // }
    return randomColor;
  }
}
