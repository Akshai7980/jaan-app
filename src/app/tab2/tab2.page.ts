import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
import {
  Plugins,
  LocalNotificationEnabledResult,
  LocalNotificationActionPerformed,
  LocalNotification,
  Device,
} from "@capacitor/core";
const { LocalNotifications } = Plugins;
// const { App } = Plugins;
import { AlarmInnerPage } from "../alarm-inner/alarm-inner.page";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  alarm = [];
  bbSubscription: any;
  modal = false;
  // alarmToggle: {[key: number]: boolean} = {};

  constructor(public common: CommonService) {}

  async ngOnInit() {
    await LocalNotifications.requestPermission();
    // this.common.storage.remove('alarm'); // Clear Alarm from storage
    // await LocalNotifications.listChannels().then((res) => {
    //   console.log('Scheduled Alarms:', res);
    // });
  }

  ionViewWillEnter() {
    this.getAlarm();
  }

  getAlarm() {
    this.common.storage.get("alarm").then(async (val) => {
      this.alarm = val;
      console.log("Alarm from Storage:", val);
    });
  }

  ionViewDidEnter() {
    this.bbSubscription = this.common.platform.backButton.subscribe(() => {
      if (this.modal) {
        this.common.modalController.dismiss();
      } else {
        this.common.router.navigate(["tabs"]);
      }
    });
  }

  ionViewWillLeave() {
    this.bbSubscription.unsubscribe();
  }

  async addEditAlarm(res: any) {
    this.modal = true;

    const modal = await this.common.modalController.create({
      component: AlarmInnerPage,
      componentProps: {
        alarm: res,
      },
      backdropDismiss: false,
      // cssClass: 'payment-modal'
    });

    modal.onDidDismiss().then(() => {
      this.modal = false;
      this.getAlarm();
    });

    return await modal.present();
  }

  toggleChanged(res: any) {
    // console.log(this.alarm);

    let alarmStorage = [];

    this.common.storage.get("alarm").then(async (val) => {
      console.log("Storage Value of Alarm Before:", val);

      alarmStorage = val;

      console.log("Edit Alarm");

      let i = 0;
      for (const element of alarmStorage) {
        if (element.id === res.id) {
          alarmStorage[i] = {
            id: res.id,
            time: res.time,
            label: res.label,
            desc: res.desc,
            period: res.period,
            toggle: res.toggle,
          };

          break;
        }
        i++;
      }

      this.common.setStorage("alarm", alarmStorage);

      console.log("Storage Value of Alarm After:", alarmStorage);
    });
  }

  async scheduleAlarm() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Friendly Reminder",
          body: "Get into Jaan",
          id: 1,
          extra: {},
          iconColor: "#3e368d",
          schedule: { every: "day" },
        },
      ],
    });
  }
}
