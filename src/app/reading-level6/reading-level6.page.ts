import { Component, OnInit } from '@angular/core';
import { NavigationExtras  } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-reading-level6',
  templateUrl: './reading-level6.page.html',
  styleUrls: ['./reading-level6.page.scss'],
})
export class ReadingLevel6Page implements OnInit {

  data: any;
  index = 0;

  constructor(private common: CommonService) {

    this.common.route.queryParams.subscribe(params => {

      if (this.common.router.getCurrentNavigation().extras.state) {
        this.data = this.common.router.getCurrentNavigation().extras.state.data;
        console.log(this.data);

        this.common.levelId = 6;
        this.common.sublevelId = this.data.sublevelid;
        this.common.aspectId = 3;

      }
    });

   }

  ngOnInit() {
  }

  open(i: number) {
    const navigationExtras: NavigationExtras = {
      state: {
        index: i,
        songs: this.data[this.index]
      }
    };
    this.common.openPage('reading-level6-inner', 1, navigationExtras);
    // this.common.router.navigate(['tabs/tab1/reading-level6-inner'], navigationExtras);
  }

  onNextCick() {
    this.index++;
    this.data.header = this.data[this.index].sublevel;
  }

  onPreviousClick() {
    this.index--;
    this.data.header = this.data[this.index].sublevel;
  }

}
