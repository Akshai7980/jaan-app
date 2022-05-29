import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras  } from '@angular/router';
import { CommonService } from '../services/common.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.page.html',
  styleUrls: ['./grammar.page.scss'],
})
export class GrammarPage implements OnInit {

  // @ViewChild('slides', {static: true}) slides: IonSlides;
  data: any;
  color: any;
  jigsaw: any;

  constructor(private common: CommonService) {

    this.getData();
    // this.data = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
    this.color = [
      ['#5f69e4'], ['#f09343'], ['#0fa7bf'], ['#31e06b'], ['#ef7a45'],
      ['#b55fe9'], ['#f344a7'], ['#f6d535'], ['#dce13f'], ['#69b1da'],
    ];

    this.jigsaw = [
      [3], [5], [1], [6], [10], [11], [12], [14], [3], [4], [2], [5], [9], [8],
      [12], [13]
    ];

   }

  ngOnInit() {
  }

  async getData() {

    await this.common.presentLoading();

    const category = 'aspect_levels';
    const params = {
      type: 8
    };

    this.common.postData(category, params).then((res: any) => {
      console.log('Grammar Home Page Response:', res);

      if (res.status === true) {

        this.common.stopLoading();
        this.data = res.user_details;

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

  openSection(id: number) {

    this.common.levelId = id;
    this.common.openPage('grammar-inner', 1, '');

  }

  // setSlide() {

    // this.slides.getActiveIndex().then(index => {



    // });
//
  // }

}
