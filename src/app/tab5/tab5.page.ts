import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Plugins } from "@capacitor/core";
const { Share } = Plugins;

@Component({
  selector: "app-tab5",
  templateUrl: "./tab5.page.html",
  styleUrls: ["./tab5.page.scss"],
})
export class Tab5Page implements OnInit {
  constructor(
    public common: CommonService
  ) // private socialSharing: SocialSharing
  {}

  ngOnInit() {
    // setTimeout(() => {
    //   this.payButtonHandler();
    // }, 5000);
  }

  async share() {
    // const msg = 'Share Jaan with your friends:';

    // this.socialSharing.share(msg).then(() => {
    //   // Success!
    // }).catch(() => {
    //   // Error!
    // });

    const shareRet = await Share.share({
      // title: 'See cool stuff',
      text: "Download Jaan by clicking on the link below:\niOS: https://apps.apple.com/in/app/jaan-lingo-for-life/id1544035227 \nAndroid: https://play.google.com/store/apps/details?id=com.srishti.jaan",
      // url: 'https://play.google.com/apps/internaltest/4699877649103290807',
      dialogTitle: "Share Jaan",
    });
  }
}
