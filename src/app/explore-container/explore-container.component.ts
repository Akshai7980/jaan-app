import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NavigationExtras  } from '@angular/router';
import { HeaderMorePage } from '../header-more/header-more.page';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
//  For Worksheet / Games
  @Input() aspectId: number;
  @Input() aspectSubId: number;
  @Input() worksheet: number;
  @Input() games: number;

  // For Header
  @Input() headerColor: string;
  @Input() page: string;
  headerMoreArray = [];

  worksheetOpen = false;
  notifications: any;
  // notificationInterval: any;

  constructor(public common: CommonService) { }

  ngOnInit() {

    // console.log('Page:', this.page);

    if (this.page === 'listeningInner' || this.page === 'speakingInner' ||
        this.page === 'vocabularyInner' || this.page === 'conversation2') {

      this.headerMoreArray = ['Favourites'];

    } else {

      this.headerMoreArray = ['Help'];
      if (this.common.bookClass === 1) {
        this.headerMoreArray.push('Book a class');
      }

    }

  }

  ionViewWillEnter() {
    // if (this.page === 'home') {
    //   this.notificationInterval = setInterval(() => {
    //     this.getNotifications();
    //   }, 2000);
    // }
  }

  ionViewWillLeave() {
    // clearInterval(this.notificationInterval);
  }

  openWorksheet() {
    this.worksheetOpen = !this.worksheetOpen;
  }

  openWorksheetGame(page: string) {

    this.common.levelId = this.aspectId;
    this.common.sublevelId = this.aspectSubId;

    if (page === 'worksheet') {

      // this.common.router.navigate(['/' + page]);
      this.common.openPage(page, 1, '');

    } else {

      const navigationExtras: NavigationExtras = {
        state: {
          from: 'aspectLevels'
         }
      };

      this.common.openPage('games', 1, navigationExtras);

    }

  }

  async getNotifications() {
    const category = 'notification';
    const loginParams = {
      user_id: await this.common.userInfo.id
    };
    this.common.postData(category, loginParams).then( (res: any) => {
      console.log('Notification Response:', res);

      if (res.status === true) {

        this.notifications = res.notification;
        this.common.notificationCount = res.count;

      } else {

      }

      }, error => {

        console.log('Error:', error);

    });
  }

  openNotification() {
    // clearInterval(this.notificationInterval);
    this.common.notificationCount = 0;
    const navigationExtras: NavigationExtras = {
      state: {
        data: this.notifications
      }
    };
    this.common.openPage('notification', 1, navigationExtras);
    // this.common.navController.navigateForward(['/notification'], {
    //   state: {
    //     data: this.notifications
    //   }
    // });
  }

  openContact() {

    const navigationExtras: NavigationExtras = {
      state: {
        page: 'Contact Us'
      }
    };
    this.common.openPage('contact-book', 1, navigationExtras);

  }

  async presentPopover() {
    const popover = await this.common.popoverController.create({
      component: HeaderMorePage,
      cssClass: 'header-more',
      componentProps: {
        data: this.headerMoreArray
      },
      // event: ev,
      translucent: true
    });
    popover.onDidDismiss()
      .then((data) => {

        if (data.data === 'Favourites') {
          this.common.favourites = true;
        } else if (data.data === 'Book a class') {
          const navigationExtras: NavigationExtras = {
            state: {
              page: 'Book a class'
            }
          };
          this.common.openPage('contact-book', 1, navigationExtras);
        } else if (data.data === 'Help') {
          this.common.openPage('faq', 1, '');
        }

    });
    return await popover.present();
  }

}
