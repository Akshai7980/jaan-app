import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins, Capacitor } from '@capacitor/core';
import { NavigationExtras  } from '@angular/router';

const { Device } = Plugins;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  submittedForm = false;
  errorMessage: any;
  platformName: string;
  deviceToken: string;
  countries: any;
  dialCode: any;

  constructor(private common: CommonService, private formBuilder: FormBuilder) { }

  async ngOnInit() {

    this.getCountries();

    const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      lastname: ['', [Validators.pattern('[a-zA-Z ]*')]],
      gender: [''],
      // dob: ['', [Validators.required, Validators.pattern('[0-9]{4}$')]],
      dob: [''],
      profession: [''],
      location: ['', [Validators.required]],
      // country: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      country: [''],
      email: ['', [Validators.required, Validators.email]],
      // phone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      // phone: ['', [Validators.required, Validators.pattern('[0-9]{10}$')]],
      phone: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12), Validators.pattern(/^[0-9]\d*$/)]],
      // phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: ['', Validators.pattern('true')]
  });

    if (Capacitor.platform !== 'web') {

      await Device.getInfo().then((deviceInfo) => {
        console.log('Device Info:', deviceInfo);
        this.deviceToken = deviceInfo.uuid;
        this.platformName = deviceInfo.platform;
      });

    } else {

      this.deviceToken = 'APA911XsM2D7GARWNbQS8jeUiNrX1OxLRWMZ2jzz2PFiXB8Xw9n0';
      this.platformName = 'android';

    }

  }

  getCountries() {

    fetch('../../assets/countryList.json').then(res => res.json()).then(json => {
        // console.log('Countries With Dial Code: ', json);
        this.countries = json;
        // console.log('countries:',this.countries);
    });

  }

  setDialCode() {

    // console.log(this.registerForm.value.location);
    this.dialCode = this.registerForm.value.location.dialCode;
    // console.log('dialCode:',this.dialCode);

  }

  setdob() {
    // console.log(this.registerForm.value.dob);
    // const year = new Date(this.registerForm.value.dob).getFullYear();
    // console.log(year);
  }

  async register() {
    this.submittedForm = true;
    this.registerForm.value.device_type = this.platformName;
    this.registerForm.value.device_token = this.deviceToken;
    this.registerForm.value.location = this.registerForm.value.location.name;
    this.registerForm.value.phone = this.dialCode + this.registerForm.value.phone;
    const year = new Date(this.registerForm.value.dob).getFullYear();
    this.registerForm.value.dob = year;

    console.log(this.registerForm.value);
    console.log(this.registerForm);

    // Cut This
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     data: this.registerForm.value
    //   }
    // };
    // this.common.openPage('otp', 0, navigationExtras);
    // Cut This

    if (this.registerForm.valid) {

      const navigationExtras: NavigationExtras = {
        state: {
          data: this.registerForm.value
        }
      };
      this.common.openPage('otp', 0, navigationExtras);

      // await this.common.presentLoading();

      // const category = 'register';

      // this.common.postData(category, this.registerForm.value).subscribe( (res: any) => {
      //   console.log('Otp Response:', res);

      //   if (res.status === true) {

      //     this.common.stopLoading();
      //     // this.common.presentToast('Registration successful. You get a free trial version for 3 days from now.');
      //     this.goLogin();

      //   } else {

      //     this.common.stopLoading();
      //     this.common.presentAlert(res.message);
      //     // this.errorMessage = res.message;

      //   }

      //   }, error => {
      //     this.common.stopLoading();
      //     this.common.ajaxErrorToast();
      //     // alert(JSON.stringify(error));
      //     console.log('Error:', error);
      // });
    }

  }

  goLogin() {

    this.common.navController.navigateRoot('');

  }

}
