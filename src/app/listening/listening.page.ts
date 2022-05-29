import { Component, OnInit } from '@angular/core';
import { NavigationExtras  } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-listening',
  templateUrl: './listening.page.html',
  styleUrls: ['./listening.page.scss'],
})
export class ListeningPage implements OnInit {

  sections: any;
  data: any;

  constructor(public common: CommonService) { }

  ngOnInit() {
    this.common.presentLoading();

    const category = 'aspect_levels';
    const params = {
      type: 1
    };

    this.common.postData(category, params).then((res: any) => {
      console.log('Listening Home Page Response:', res);

      if (res.status === true) {

        this.common.stopLoading();
        this.sections = res.user_details;

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

    this.data = [
      {
        grid: '../../assets/icon/listening-grid1.png',
        arrow: '../../assets/icon/arrow-purple.png',
        color: 'color: #6860c7'
      },
      {
        grid: '../../assets/icon/listening-grid2.png',
        arrow: '../../assets/icon/arrow-pink.png',
        color: 'color: #c75f90'
      },
      {
        grid: '../../assets/icon/listening-grid3.png',
        arrow: '../../assets/icon/arrow-green.png',
        color: 'color: #5fc8a7'
      }
    ];

  }

  openSection(id: number, sName: string, dId: number) {
    const navigationExtras: NavigationExtras = {
      state: {
        sectionName: sName,
        sectionId: id,
        designId: dId
      }
    };
    this.common.openPage('listening-inner', 1, navigationExtras);
  }
}
