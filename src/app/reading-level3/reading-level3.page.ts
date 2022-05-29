import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-reading-level3',
  templateUrl: './reading-level3.page.html',
  styleUrls: ['./reading-level3.page.scss'],
})
export class ReadingLevel3Page implements OnInit {

  data: any;
  i = 0;
  worksheet: number;
  games: number;
  sublevelId: number;

  constructor(public common: CommonService) {

    this.common.route.queryParams.subscribe(params => {

      if (this.common.router.getCurrentNavigation().extras.state) {
        this.data = this.common.router.getCurrentNavigation().extras.state.data;
        this.data = this.data[0].contents;
        this.worksheet = this.common.router.getCurrentNavigation().extras.state.data[0].worksheet;
        this.games = this.common.router.getCurrentNavigation().extras.state.data[0].games;
        this.sublevelId = this.common.router.getCurrentNavigation().extras.state.data[0].sublevelid;
        console.log(this.data);

        this.common.levelId = 3;
        this.common.sublevelId = this.sublevelId;
        this.common.aspectId = 3;
      }
    });

   }

  ngOnInit() {}

  onNextCick() {
    this.i++;
  }

  onPreviousClick() {
    this.i--;
  }

}
