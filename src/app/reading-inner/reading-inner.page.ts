import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-reading-inner',
  templateUrl: './reading-inner.page.html',
  styleUrls: ['./reading-inner.page.scss'],
})
export class ReadingInnerPage implements OnInit {

  data: any;

  constructor(public common: CommonService) {
    this.common.presentLoading();

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        const level = this.common.router.getCurrentNavigation().extras.state.level;
        let category = '';

        this.data = {
          l: level,
          image1: '../../assets/icon/level' + level + '.png',
          image2: '../../assets/icon/level-bg' + level + '.png',
          number: '../../assets/icon/num' + level + '.png',
          bullet: '../../assets/icon/tar' + level + '.png',
          arrow: '../../assets/icon/level-ar' + level + '.png'
        };

        if (level === 1){

          category = 'readingone';
          this.data.footerWord = 'Alphabet or the Word';

        } else if (level === 2) {

          category = 'readingtwo';
          this.data.footerWord = 'Alphabet';

        } else if (level === 3) {

          category = 'readingthree';
          this.data.footerWord = 'Alphabet or the Word';

        } else if (level === 4) {

          category = 'readingfour';
          this.data.footerWord = 'Word';

        } else if (level === 5) {

          category = 'readingfive';
          this.data.footerWord = 'Flash Card';

        } else if (level === 6) {

          category = 'readingsix';
          this.data.footerWord = 'Title';

        }

        this.common.getData(category, '').subscribe((res: any) => {
          console.log('Reading Inner Page ( Level', level, ')', 'Response:', res);

          if (res.status === true) {

            this.common.stopLoading();
            this.data.content = res.reading;

          } else {

            this.common.presentToast(res.message);

          }

          }, error => {
            this.common.stopLoading();
            this.common.ajaxErrorToast();
            this.common.navController.pop();
            console.log('Error:', error);
        });
      }
    });

    console.log(this.data);

   }

  ngOnInit() {
  }

  openLevel(level: number, i , type) {

    const route = 'reading-level' + level;
    const navigationExtras: NavigationExtras = {
      state: {
        data: this.data.content
      }
    };

    this.common.openPage(route, 1, navigationExtras);
  }

}
