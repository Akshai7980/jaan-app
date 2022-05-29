import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-game4',
  templateUrl: './game4.page.html',
  styleUrls: ['./game4.page.scss'],
})
export class Game4Page implements OnInit {
  data: any;

  constructor(public common: CommonService) {

    this.common.presentLoading();

    const category = 'game4';

    this.common.getData(category, '').subscribe((res: any) => {
      console.log('Game 4 Page Response:', res);

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

  ngOnInit() {
  }

}
