import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ReadingLevel1InnerPage } from '../reading-level1-inner/reading-level1-inner.page';
import { NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-reading-level1',
  templateUrl: './reading-level1.page.html',
  styleUrls: ['./reading-level1.page.scss'],
})
export class ReadingLevel1Page implements OnInit {

  segmentSelected = 'vowels';
  data: any;
  i = 0;
  segmentData: any;
  bbSubscription: any;
  modal: boolean;
  // worksheet: number;

  constructor(public common: CommonService) {

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.data = this.common.router.getCurrentNavigation().extras.state.data;
        // this.worksheet = this.data[0].sublevelid;
        // this.segmentData = this.data[0].contents;

        this.common.levelId = 1;
        this.common.sublevelId = this.data[this.i].sublevelid;
        this.common.aspectId = 3;

        console.log(this.data);
      }
    });

   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.bbSubscription = this.common.platform.backButton.subscribeWithPriority(9999, () => {

      if (this.modal) {

        this.common.modalController.dismiss();

      } else {

        const navigationExtras: NavigationExtras = {
          state: {
            level: 1,
          }
        };
        this.common.router.navigate(['tabs/tab1/reading-inner'], navigationExtras);

      }

    });
  }

  ionViewWillLeave() {
    this.bbSubscription.unsubscribe();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segmentSelected = ev.detail.value;

    if (this.segmentSelected === 'vowels') {

      // this.segmentData = this.data[0].contents;
      this.i = 0;

    } else if (this.segmentSelected === 'consonants') {

      this.i = 1;
      // this.segmentData = this.data[1].contents;

    } else if (this.segmentSelected === 'specialAlphabets') {

      this.i = 2;

      // this.segmentData = this.data[2].contents;

    }
  }

  async openMore(d: any) {

    this.modal = true;

    const modal = await this.common.modalController.create({
      component: ReadingLevel1InnerPage,
      componentProps: {
        word: d.letter,
        wordEnglish: d.letterenglish,
        audio: d.audio[0],
        data: d.subcontents,
      },
      backdropDismiss: false,
      cssClass: 'reading-level1-inner'
    });

    modal.onDidDismiss()
    .then(() => {
      this.modal = false;
  });
    return await modal.present();

  }


}
