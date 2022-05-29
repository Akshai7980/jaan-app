import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-games-inner',
  templateUrl: './games-inner.page.html',
  styleUrls: ['./games-inner.page.scss'],
})
export class GamesInnerPage implements OnInit {

  data: any;
  game: string;
  gameName: string;
  color: any;

  constructor(public common: CommonService) {

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {

        this.game = this.common.router.getCurrentNavigation().extras.state.game;
        this.getData();

      }
    });

  }

  ngOnInit() {

    if (this.game === 'game1') {
      this.gameName = 'Save The Fish';
    } else if (this.game === 'game2') {
      this.gameName = 'Rearrange The Set';
    } else {
      this.gameName = 'Sorting Pictures';
    }

    this.color = {
      lightColor: [
        ['#f6d2d2'], ['#e1d6e7'], ['#fad3e8'], ['#d0edd9'], ['#d6dee9'],
        ['#cdeffb'], ['#d7d8da'], ['#e7e2f8'], ['#d3e4cf'], ['#f0e8d5'],
        ['#d3e8ea']
      ],
      darkColor: [],
      arrow: []
    };

    for (let i = 0; i < 11; i++) {
      const color = '../../assets/icon/vocabulary-' + (i + 1) + '.png';
      const arrow = '../../assets/icon/aspects-arr-' + (i + 1) + '.png';
      this.color.darkColor.push(color);
      if (i < 10) {
        this.color.arrow.push(arrow);
      }
    }

    this.color.arrow[10] = '../../assets/icon/aspects-arr-4.png';

  }

  getData() {

    this.common.presentLoading();

    const category = this.game;
    const params = {
      levelid: '',
      sublevelid: '',
      user_id: ''
    };

    this.common.postData(category, params).then((res: any) => {
      console.log('Games Inner Page (Common) Response:', res);

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

  openGame(levelId: number, sublevelId: number) {

    this.common.levelId = levelId;
    this.common.sublevelId = sublevelId;

    const navigationExtras: NavigationExtras = {
      state: {
        from: 'home'
       }
    };

    this.common.openPage(this.game, 1, navigationExtras);

  }

}
