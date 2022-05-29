import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  data: any;

  constructor(private common: CommonService) {
    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.data = this.common.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() {

    const category = 'update_notification';
    const loginParams = {
      user_id: this.common.userInfo.id
    };
    this.common.postData(category, loginParams).then( (res: any) => {
      console.log('Update Notification Response:', res);

      }, error => {

        console.log('Error:', error);

    });

  }

}
