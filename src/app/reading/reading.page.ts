import { Component, OnInit } from '@angular/core';
import { NavigationExtras  } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.page.html',
  styleUrls: ['./reading.page.scss'],
})
export class ReadingPage implements OnInit {

  data: any;

  constructor(private common: CommonService) { }

  ngOnInit() {

    this.data = [
      {
        style: '',
        name: 'Alphabet Section',
        number: '',
        arrow: ''
      },
      {
        style: '',
        name: 'More Letters',
        number: '',
        arrow: ''
      },
      {
        style: '',
        name: 'Introduction to Words',
        number: '',
        arrow: ''
      },
      {
        style: '',
        name: 'Words Array',
        number: '',
        arrow: ''
      },
      {
        style: '',
        name: 'Flash Card',
        number: '',
        arrow: ''
      },
      {
        style: '',
        name: 'Stories / Songs',
        number: '',
        arrow: ''
      }
    ];

    const background = 'background-image: url(../../../../assets/icon/reading-bg';
    const animationOrder = '--animation-order: ';

    for (let i = 0; i < 6; i++ ) {

      if (i === 3) {

        this.data[i].style = background + (i + 1) + '.png); ' + animationOrder + i + '; margin-left: 18px; margin-right: 18px;';

      } else {

      this.data[i].style = background + (i + 1) + '.png); ' + animationOrder + i;

    }

      this.data[i].number = '../../assets/icon/num' + (i + 1) + '.png';
      this.data[i].arrow = '../../assets/icon/ar' + (i + 1) + '.png';
    }

    console.log(this.data);

  }

  openLevels(l: number) {
    const navigationExtras: NavigationExtras = {
      state: {
        level: l
      }
    };

    this.common.openPage('reading-inner', 1, navigationExtras);
  }

}
