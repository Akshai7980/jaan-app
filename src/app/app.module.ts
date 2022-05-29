import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Media } from '@ionic-native/media/ngx';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Printer } from '@ionic-native/printer/ngx';
// import { Camera } from '@ionic-native/camera/ngx';
// import { PayPal } from '@ionic-native/paypal/ngx';
import { File } from '@ionic-native/file/ngx';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { UserIdleModule } from 'angular-user-idle';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule, IonicStorageModule.forRoot(),
    UserIdleModule.forRoot({idle: 60, timeout: 10, ping: 10})
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    Printer,
    HTTP,
    // Camera,
    // PayPal,
    File,
    // SocialSharing,
    InAppPurchase2,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
