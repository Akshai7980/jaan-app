import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-reading-level6-inner',
  templateUrl: './reading-level6-inner.page.html',
  styleUrls: ['./reading-level6-inner.page.scss'],
})
export class ReadingLevel6InnerPage implements OnInit {
  // slideOpts = {
  //   initialSlide: 0,
  //   speed: 400,
  //   slidesPerView: 1.5,
  //   spaceBetween: 50
  // };

  slideOpts = {
    initialSlide: 0,
  };
  songs: any;
  song: string;
  i: number;
  playAudio = false;
  status: any;

  @ViewChild('slides', {static: true}) slides: IonSlides;

  constructor(public common: CommonService) {

    this.common.route.queryParams.subscribe(params => {

      if (this.common.router.getCurrentNavigation().extras.state) {
        this.songs = this.common.router.getCurrentNavigation().extras.state.songs;
        this.i = this.common.router.getCurrentNavigation().extras.state.index;
        this.slideOpts.initialSlide = this.i;
        // this.songs = this.songs.contents[this.i];
        console.log(this.songs);

        this.song = this.songs.contents[0].pronouncefiles[0];
      }
    });

   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  ionViewWillLeave() {
    // this.common.stopAudio();
    // this.status.unsubscribe();
  }

  playPauseAudio(operation: string) {

    this.playAudio = !this.playAudio;

    if (operation === 'play') {

      this.status = this.common.audioFile.onStatusUpdate.subscribe((status) => {

        if (status.toString() === '4') {

          this.playAudio = false;
          this.common.stopAudio();

        }

      });

      if (this.common.audioFile) {

        this.common.audioFile.play();

      } else {

        this.common.playAudio(this.song);

      }

    } else {

      this.common.pauseAudio();

    }

  }

  changeSlide(val: string) {

    this.common.stopAudio();

    if (val === 'next') {

      this.slides.slideNext();

    } else  {

      this.slides.slidePrev();

    }

  }

  slideChanged() {

    this.slides.getActiveIndex().then(index => {
      this.song = this.songs.contents[index].pronouncefiles[0];
      console.log(1);
    });

  }

}
