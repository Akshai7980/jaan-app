import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import {Howl} from 'howler';

@Component({
  selector: 'app-intro-gif',
  templateUrl: './intro-gif.page.html',
  styleUrls: ['./intro-gif.page.scss'],
})
export class IntroGifPage implements OnInit {

  constructor(public common: CommonService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {

    this.common.gifPath = '../../assets/icon/intro.gif';
    setTimeout(() => {
      this.common.playerGif = new Howl({
        src: '../../assets/audio/intro-hello.mp3',
        html5: true,
        onend: () => {
          console.log('Audio Finished playing!');
          this.common.gifPath = '';
          this.common.modalController.dismiss();
        }
      });
      this.common.playerGif.play();
    }, 4500);

  }

  ionViewWillLeave() {
    this.common.playerGif.stop();
  }

}
