import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
declare var SMSReceive: any;
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  registerFormValue: any;
  otpInput = '';
  otpResponse: any;

  constructor(public common: CommonService) {

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.registerFormValue = this.common.router.getCurrentNavigation().extras.state.data;
        console.log('OTP Page:', this.registerFormValue);

        // this.getOtp(this.registerFormValue.phone.substring(1));
        this.getOtp(this.registerFormValue.email);
      }
    });

   }

  ngOnInit() {
  }

  async getOtp(email: any) {

    await this.common.presentLoading();

    const params = {
      // email: email,
      phone: email,
    };
    // this.common.postOtp(params).subscribe( (res: any) => {
    this.common.postData('registertest', params).then( (res: any) => {
      console.log('Otp Response:', res);
      const response = JSON.parse(res.data);

      this.otpResponse = response.otp;

      if (response.status === true) {

        this.common.stopLoading();
        this.common.presentToast('OTP Sent.');

      } else {

        this.common.stopLoading();
        // this.common.presentAlert(res.message);

      }

      }, error => {
        this.common.stopLoading();
        // this.common.ajaxErrorToast();
        // alert(JSON.stringify(error));
        console.log('Error:', error);
    });

  }

  register() {

    // this.registerFormValue.otp = this.otpInput;

    const category = 'register';
    // const category = 'registertest';

    this.common.postData(category, this.registerFormValue).then( (res: any) => {
      console.log('Register Response:', res);
      const response = JSON.parse(res.data);
      console.log('response:', response);

      if (response.status === true) {

        this.common.stopLoading();
        this.common.presentToast('Registration successful. You get a free trial version for 3 days from now.');
        this.goLogin();

      } else {

        this.common.stopLoading();
        this.common.presentAlert(response.message);
        // this.errorMessage = res.message;

      }

      }, error => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        // alert(JSON.stringify(error));
        console.log('Error:', error);
      });
  }



  goLogin() {

    this.common.navController.navigateRoot('');

  }

  otpController(event,next,prev){
    console.log(event.key);
    // console.log(event.key, next, prev);
    if (event.key !== 'Backspace') {
      this.otpInput += event.key;
    } else if (event.key === 'Backspace') {
      this.otpInput = this.otpInput.slice(0, -1);
    }
    console.log(this.otpInput);
    // console.log(this.otpInput.length);

    if (event.target.value.length < 1 && prev){
      prev.setFocus();
    }
    else if (next && event.target.value.length > 0){
      next.setFocus();
    }
    else {
     return 0;
    }
  }

   otpController2(){
    // console.log(event.key);
    // console.log(event.key, next, prev);
      // if (event.key !== 'Backspace') {
      //   this.otpInput += event.key;
      // } else if (event.key === 'Backspace') {
      //   this.otpInput = this.otpInput.slice(0, -1);
      // }
    console.log(this.otpInput);
    console.log(this.otpInput.length);

    if (this.otpInput === this.otpResponse) {

      this.register();

    } else {

      this.common.presentToast('The OTP you entered is wrong!');

    }

  }

}
