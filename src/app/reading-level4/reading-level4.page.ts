import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-reading-level4',
  templateUrl: './reading-level4.page.html',
  styleUrls: ['./reading-level4.page.scss'],
})
export class ReadingLevel4Page implements OnInit {

  data: any;
  header: string;
  i = 0;

  constructor(public common: CommonService) {

    this.common.route.queryParams.subscribe(params => {

      if (this.common.router.getCurrentNavigation().extras.state) {
        this.data = this.common.router.getCurrentNavigation().extras.state.data;
        console.log(this.data);

        this.header = this.data[0].sublevel;

        this.common.levelId = 4;
        this.common.sublevelId = this.data[this.i].sublevelid;
        this.common.aspectId = 3;
        // this.data = this.data[0].contents;

      }
    });

   }

  ngOnInit() {}

  onNextCick() {
    this.i++;
    this.header = this.data[this.i].sublevel;
  }

  onPreviousClick() {
    this.i--;
    this.header = this.data[this.i].sublevel;
  }

}
