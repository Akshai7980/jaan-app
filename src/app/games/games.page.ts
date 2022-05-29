import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NavigationExtras  } from '@angular/router';
import {Howl} from 'howler';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  fromPage: string;
  isGames: any;
  playerGif: Howl = null;
  gifPath = '';

  constructor(public common: CommonService) {

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {

        this.fromPage = this.common.router.getCurrentNavigation().extras.state.from;
        this.getData();

      } else {
        this.alert();
      }

    });

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('Enter');

    // this.gifPath = '';
    // this.playerGif = null;
  }

  ionViewWillLeave() {
    console.log('Leave');

    if (this.playerGif) {
      console.log('Leave1');
      this.gifPath = '';
      this.playerGif.stop();

    }

  }

  getData() {

    this.common.presentLoading();

    const category = 'listgames';
    const paramsApi = {
      levelid: this.common.levelId,
      sublevelid: this.common.sublevelId,
      user_id: this.common.userInfo.id
    };
    this.common.postData(category, paramsApi).then((res: any) => {
      console.log('Games Home Page Response:', res);

      if (res.status === true) {

        this.common.stopLoading();
        this.alert();
        this.isGames = res;

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

  openGames(page: string) {

    if (this.fromPage === 'aspectLevels') {

      const availability = this.checkGamesAvailability(page);

      if (availability) {

        const navigationExtras: NavigationExtras = {
          state: {
            from: 'aspectLevels'
           }
        };

        this.common.openPage(page, 1, navigationExtras);

      } else {

        this.common.presentToast('You don\'t have games for this section.!');

      }

    } else {

      const navigationExtras: NavigationExtras = {
        state: {
          game: page
         }
      };

      this.common.openPage('games-inner', 1, navigationExtras);

    }

  }

  checkGamesAvailability(page: string) {

    if (page === 'game1') {

      if (this.isGames.game1 === 1) {

        return true;

      }

    } else if (page === 'game2') {

      if (this.isGames.game2 === 1) {

        return true;

      }

    } else if (page === 'game3') {

      if (this.isGames.game3 === 1) {

        return true;

      }

    }

  }

  async alert() {

    const alert = await this.common.alertController.create({
      // cssClass: 'my-custom-class',
      // header: 'Warning!',
      message: 'All Games and Worksheets are in Malayalam. Kindly go through the Reading Section first.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            this.playGif('games-home.mp3');

          }
        }
      ]
    });

    await alert.present();

  }

  playGif(audioFile: string) {

    this.gifPath = '../../assets/icon/intro.gif';

    const audioPath = '../../assets/audio/' + audioFile;

    this.playerGif = new Howl({
      src: audioPath,
      html5: true,
      onend: () => {
        // console.log('Audio Finished playing!');
        this.gifPath = '';
        // alert(1);
        // this.playGif('games-home.mp3');
      }
    });
    this.playerGif.play();

  }

}
