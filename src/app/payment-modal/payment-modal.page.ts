import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../services/common.service';
// import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Plugins } from '@capacitor/core';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';

const { App } = Plugins;
declare var RazorpayCheckout: any;
// const BRAINTREE_TOKEN = 'sandbox_v29yd76x_d5653m95wyhbzvkd';
declare var paypal: any;
const PRODUCT_JAAN_PREMIUM = 'jaan_premium_2020';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {

  @Input() amount: any;
  @Input() view: number;
  @Input() text: string;
  @Input() durationLeft?: string;
  products: IAPProduct[] = [];

  constructor(public common: CommonService,
              private store: InAppPurchase2,
              private ref: ChangeDetectorRef
              // private payPal: PayPal
              ) { }

  ngOnInit() {
    console.log('Amount:', this.amount);
    console.log('Duration Left:', this.durationLeft);

    this.common.platform.ready().then(() => {
      // Only for debugging!
      this.store.verbosity = this.store.DEBUG;

      this.registerProducts();
      this.setupListeners();

      // Get the real product information
      this.store.ready(() => {
        this.products = this.store.products;
        console.log(this.store.products);
        // alert(JSON.stringify(this.products));
        this.ref.detectChanges();
      });
    });

  }

  dismissModal() {

    if (this.common.userType === 'free' || this.common.userType === 'premium') {

      this.common.modalController.dismiss();

    } else if (this.common.userType === 'blocked') {

      App.exitApp();

    }
  }

  pay() {

    // this.view = 2;
    // setTimeout(() => {
    //   this.payWithPaypalCheckout();
    // }, 200);

    this.view = 3;

  }

  registerProducts() {

    this.store.register({
      id: PRODUCT_JAAN_PREMIUM,
      type: this.store.CONSUMABLE,
    });

    this.store.refresh();
  }

  setupListeners() {
    // General query to all products
    this.store.when('product')
      .approved((p: IAPProduct) => {
        // Handle the product deliverable
        console.log('Response:', p);

        if (p.id === PRODUCT_JAAN_PREMIUM) {

          this.common.userType = 'premium';

          const params = {
            // amount: p.price,
            amount: p.currency + ' ' + (p.priceMicros / 1000000),
            id: p.transaction.id,
            create_time: new Date(),
            intent: p.transaction.type,
            state: p.state
          };

          this.submitResponse(params);
          this.common.modalController.dismiss();
          // this.isPro = true;
        }
        this.ref.detectChanges();

        return p.verify();
      })
      .verified((p: IAPProduct) => p.finish());


    // Specific query for one ID
    // this.store.when(PRODUCT_JAAN_PREMIUM).owned((p: IAPProduct) => {
      // console.log('Product:', p);
      // this.isPro = true;
    // });
  }

  purchaseInapp() {
    this.store.order(PRODUCT_JAAN_PREMIUM).then(p => {
      // Purchase in progress!
      // console.log('Res:', p);
    }, e => {
      console.log('Failed', `Failed to purchase: ${e}`);
    });
  }

  async payWithPaypal() {

  //   await this.payPal.init({
  //     PayPalEnvironmentProduction: 'ATwUQRtZfB0Oa5XygD3Vhqlk_OI5NcSVtGss4AnC3BYlno46-7Jpd3BmEHXoeO2YLhLReXSttjj_6BVA',
  //     PayPalEnvironmentSandbox: 'AWJcXbMJnUh4_wcXay7nZtVqppY2zooT72kOfoqO0im-dSgB9P8ioWuiXfLbq7NOa25_Asg4lUTAURvH'
  //   }).then(() => {
  //     // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  //     this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
  //       // Only needed if you get an "Internal Service Error" after PayPal login!
  //       // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  //     })).then(() => {
  //       const payment = new PayPalPayment(this.amount, 'USD', 'Jaan Premium', 'sale');
  //       this.payPal.renderSinglePaymentUI(payment).then((res) => {
  //         // Successfully paid

  //         console.log('PayPal Response', res);
  //         // alert(JSON.stringify(res));
  //         this.submitResponse(res.response);
  //         this.common.modalController.dismiss();

  //       }, (err) => {
  //         // Error or render dialog closed without being successful
  //         console.log('Error or render dialog closed without being successful:', err);
  //       });
  //     }, (err) => {
  //       // Error in configuration
  //       console.log('Error in configuration:', err);
  //     });
  //   }, (err) => {
  //     // Error in initialization, maybe PayPal isn't supported or something else
  //     console.log('Error in initialization:', err);
  //   });

  }

  payWithPaypalCheckout() {
    const payPalConfig = {
      env: 'production', // sandbox || production
      client: {
        // sandbox: 'AWJcXbMJnUh4_wcXay7nZtVqppY2zooT72kOfoqO0im-dSgB9P8ioWuiXfLbq7NOa25_Asg4lUTAURvH',
        production: 'AaWnp6e9FvQURRoUEUVLKh-EvSuoy_Ss_rL5Ia95bDie7JUuOH8xNVU6LMkF1W1nt2mzScynswemOFeV'
      },
      commit: true,
      style: {
        layout: 'horizontal',
        label: 'pay',
        shape: 'pill',
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'INR',
              value: this.amount
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        // console.log(data, actions);
        return actions.order.capture().then((res: any) => {
            console.log('Payment Completed:', res);
            const params = {
              id: res.id,
              create_time: new Date(),
              intent: res.intent,
              state: res.status
            };

            this.submitResponse(params);
            this.common.modalController.dismiss();
            this.common.presentToast('Payment successful.');

        });
      },
      onCancel: (cancel) => {
        // Payment cancelled
        console.log('Payment cancelled:', cancel);
        // this.common.presentToast('Payment cancelled.');
       },
       onError: (err) => {
        // Payment error
        console.log('Payment error', err);
        this.common.presentToast('Payment error.');
       }
    };
    paypal.Buttons(payPalConfig).render('#paypal-button-container');
   }

   payWithRazorpayCheckout() {

    const options = {
      key: 'rzp_test_5AgJcYYTO0VxVT', // Enter the Key ID generated from the Dashboard
      amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Acme Corp',
      description: 'Test Transaction',
      // image: 'https://example.com/your_logo',
      // order_id: 'order_9A33XWu170gUtm', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response){
          alert(response);
          alert(JSON.stringify(response));
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
      },
      // notes: {
      //     address: 'Razorpay Corporate Office'
      // },
      theme: {
          color: '#F37254'
      }
  };

    const rzp1 = new RazorpayCheckout(options);
    rzp1.open();
    // RazorpayCheckout.open(options, successCallback, cancelCallback);

   }

  payWithRazorpay() {

    const options = {
      // description: 'Jaan Premium',
      // image: '../../assets/icon/premium-user-badge.png',
      currency: 'USD', // your 3 letter currency code
      // key: 'rzp_test_5AgJcYYTO0VxVT', // your Key Id from Razorpay dashboard
      key: 'rzp_live_ruwQ4PG7RYrVGR', // your Key Id from Razorpay dashboard
      amount: this.amount * 100, // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Jaan Premium',
      prefill: {
        email: this.common.userInfo.email,
        contact: this.common.userInfo.phone,
        name: this.common.userInfo.name
      },
      wallet: 'paypal',
      theme: {
        // color: '#3e368d'
      },
      modal: {
        ondismiss: () => {
          // alert('dismissed');
        }
      }
    };

    const successCallback = (paymentId: any) => {
      console.log('payment_id: ' + paymentId);

      const params = {
        id: paymentId,
        create_time: new Date(),
        intent: '',
        state: 'approved'
      };

      this.submitResponse(params);
      this.common.modalController.dismiss();
    };

    const cancelCallback = (error: any) => {
      // alert(error.description + ' (Error ' + error.code + ')');
      this.common.presentToast(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);

  }

  submitResponse(paymentRes: any) {

    // Ajax call for Submitting payment response
    // this.common.presentLoading();

    // paymentRes.amount = this.amount;
    paymentRes.userid = this.common.userInfo.id;

    // console.log('Payment Params', paymentRes);

    this.common.postData('payment', paymentRes).then((res: any) => {
      console.log('Payment Submit Response:', res);

      if (res.status === true) {

        // this.common.stopLoading();

      }

      }, error => {
        // this.common.stopLoading();
        this.common.ajaxErrorToast();
        console.log('Error:', error);
    });

  }

}
