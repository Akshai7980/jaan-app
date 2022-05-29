import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.page.html',
  styleUrls: ['./payment-history.page.scss'],
})
export class PaymentHistoryPage implements OnInit {

  data: any;

  constructor(public common: CommonService) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {

    // Ajax call for Payment History page
    await this.common.presentLoading();

    const params = {
      userid: this.common.userInfo.id
    };
    this.common.postData('paymenthistory', params).then(async (res: any) => {
      console.log('Payment History Page Response:', res);

      this.common.stopLoading();
      this.data = res.data;

    }, error => {
      this.common.stopLoading();
      this.common.ajaxErrorToast();
      console.log('Error:', error);
    });

  }

}
