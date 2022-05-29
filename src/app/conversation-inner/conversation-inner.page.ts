import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-conversation-inner',
  templateUrl: './conversation-inner.page.html',
  styleUrls: ['./conversation-inner.page.scss'],
})
export class ConversationInnerPage implements OnInit {

  data: any;
  imageUrl = 'https://dashboard.jayonweb.com/public/alphabeticphotos/';

  constructor(private common: CommonService) {

    this.common.presentLoading();

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        const section = this.common.router.getCurrentNavigation().extras.state.sectionName;
        console.log(section);

        let levelId: number;

        this.data = {
          heading: section,
          contents: [],
          // image: '../../assets/icon/conversation-image.png',
          // content: 'Lorem Ipsm Dollar',
          // loop: [
          //   {}, {} , {}
          // ]
        };

        if (section === 'General'){

          levelId = 22;
          this.data.header = {
              image: '../../assets/icon/conversation-header2.png'
          };

        } else if (section === 'Grown-Ups') {

          levelId = 99;
          this.data.header = {
            image: '../../assets/icon/conversation-header3.png'
          };

        } else if (section === 'Kids') {

          levelId = 101;
          this.data.header = {
              image: '../../assets/icon/conversation-header4.png'
          };

        }

        this.common.levelId = levelId;

        const category = 'aspect_sublevels';
        const paramsApi = {
          levelid: levelId
        };

        this.common.postData(category, paramsApi).then((res: any) => {
          console.log('Conversation Inner Page Response:', res);

          if (res.status === true) {

           this.data.contents = res.user_details;
           console.log(this.data);

          } else {

            this.common.presentToast(res.message);

          }

          this.common.stopLoading();


          }, error => {
            this.common.stopLoading();
            console.log('Error:', error);
        });
      }
    });

  }

  ngOnInit() {
  }

  openSection(d: any) {

    const navigationExtras: NavigationExtras = {
      state: {
        data: d,
        image: this.imageUrl + d.image
      }
    };
    this.common.openPage('conversation-inner2', 1, navigationExtras);

  }

}
